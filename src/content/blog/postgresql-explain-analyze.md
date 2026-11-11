---
title: "PostgreSQL'da sekin so‘rovni topish: EXPLAIN ANALYZE amaliyoti"
description: "pg_stat_statements va EXPLAIN (ANALYZE, BUFFERS) yordamida sekin so‘rovlarni aniqlash, bajarilish rejasini o‘qish hamda kompozit indeks tanlash."
pubDate: 2026-10-20
tags: ["postgresql", "performance", "backend"]
---

Database sekinlashganda ustunlarga birma-bir indeks qo‘yib chiqish muammoni yashiradi yoki yozish tezligini tushiradi. PostgreSQL har bir so‘rovni qanday bajarayotganini, qancha blok o‘qiganini va vaqt qayerda ketayotganini `EXPLAIN ANALYZE` orqali ko‘rsatadi.

## Avval sekin so‘rovni toping

Indeks qo‘shishdan oldin server vaqtini eng ko‘p yeyayotgan so‘rovni topish kerak. `pg_stat_statements` kengaytmasi (`shared_preload_libraries` orqali yoqiladi va `CREATE EXTENSION pg_stat_statements;` bilan o‘rnatiladi) barcha so‘rovlar statistikasini yig‘ib boradi:

```sql
SELECT query,
       calls,
       round(total_exec_time::numeric, 1) AS total_ms,
       round(mean_exec_time::numeric, 1)  AS mean_ms
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
```

`total_exec_time` bo‘yicha saralash muhim: 5 ms davom etadigan, lekin sekundiga yuzlab marta chaqiriladigan so‘rov ko‘pincha 2 soniyalik bitta hisobotdan ko‘ra ko‘proq CPU va I/O sarflaydi.

## Rejani o‘qish

Misol sifatida buyurtmalar jadvalidan bitta mijozning oxirgi buyurtmalarini oladigan so‘rovni ko‘ramiz:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total, created_at
FROM orders
WHERE customer_id = 4217
ORDER BY created_at DESC
LIMIT 20;
```

Indeks bo‘lmaganda bajarilish rejasi taxminan shunday chiqadi:

```text
Limit
  ->  Sort
        Sort Key: created_at DESC
        ->  Seq Scan on orders
              Filter: (customer_id = 4217)
              Rows Removed by Filter: 1998123
Execution Time: 412.6 ms
```

Rejani ichkaridan tashqariga qarab o‘qiymiz. Avval `Seq Scan on orders` butun jadvalni boshidan oxirigacha o‘qib chiqdi va `Rows Removed by Filter: 1998123` qatorni shartga mos kelmagani uchun tashlab yubordi. Shundan keyin `Sort` tuguni qolgan qatorlarni xotirada `created_at DESC` bo‘yicha saralab, oxirida `Limit` faqat 20 tasini qaytardi.

## To‘g‘ri indeksni tanlash

Filtr (`customer_id`) va saralash (`created_at`) bitta kompozit indeksga sig‘adi. Ustunlar tartibi hal qiluvchi ahamiyatga ega: avval tenglik (`=`) shartidagi ustun, keyin saralash (`ORDER BY`) ustuni yoziladi.

```sql
CREATE INDEX CONCURRENTLY idx_orders_customer_created
  ON orders (customer_id, created_at DESC);
```

`CONCURRENTLY` kalit so‘zi indeks qurilayotgan vaqtda jadvalga `INSERT` va `UPDATE` yozishni bloklamaydi. Production bazada indeksni doim shu rejimda yarating (u `BEGIN ... COMMIT` tranzaksiyasi ichida ishlamaydi).

Indeks qurilgach, reja quyidagicha o‘zgaradi:

```text
Limit
  ->  Index Scan using idx_orders_customer_created on orders
        Index Cond: (customer_id = 4217)
Execution Time: 0.3 ms
```

Alohida `Sort` bosqichi yo‘qoldi, chunki B-tree indeks yozuvlarni `customer_id = 4217` ichida allaqachon `created_at DESC` tartibida saqlaydi.

## Rejalashtiruvchi taxmini va haqiqatni solishtiring

Har bir tugunda ikkita ko‘rsatkich chiqadi: `rows=` (planner taxmini) va `actual ... rows=` (amalda qaytarilgan qatorlar). Ular o‘rtasida o‘nlab baravar farq bo‘lsa, PostgreSQL eski statistikaga tayanib noto‘g‘ri join yoki scan turini tanlayotgan bo‘ladi. Statistikani yangilash uchun:

```sql
ANALYZE orders;
```

Agar ikki ustun o‘zaro bog‘liq bo‘lsa (masalan, viloyat va tuman), oddiy statistika yetarli bo‘lmaydi va `CREATE STATISTICS` orqali kengaytirilgan statistika yaratiladi.

## Production’da e’tibor beriladigan jihatlar

`EXPLAIN ANALYZE` so‘rovni amalda bajaradi. Uni `UPDATE`, `DELETE` yoki `INSERT` bilan tekshirayotganda o‘zgarishlar saqlanib qolmasligi uchun tranzaksiya ichida `BEGIN; EXPLAIN ANALYZE ...; ROLLBACK;` ko‘rinishida ishga tushiring.

Kichik local bazada olingan reja production’dagidan farq qiladi: jadvalda bir necha yuz qator bo‘lsa, PostgreSQL bitta sahifani ketma-ket o‘qish (`Seq Scan`) indeksga murojaat qilishdan arzonroq deb topadi. Shu sababli indeks foydasini haqiqiy hajmga yaqin ma’lumotda tekshiring.

Har bir qo‘shimcha indeks `INSERT` va `UPDATE` operatsiyalarini sekinlashtiradi hamda diskda joy egallaydi. Amalda ishlatilmayotgan indekslarni `pg_stat_user_indexes` jadvalidagi `idx_scan = 0` ko‘rsatkichi orqali topib, olib tashlang.

## Xulosa

Amaliy tartib oddiy: `pg_stat_statements` orqali eng og‘ir so‘rovni ajratib oling, `EXPLAIN (ANALYZE, BUFFERS)` bilan qaysi tugunda ko‘p qator filtrlanayotganini yoki diskdan o‘qilayotganini aniqlang, indeks qo‘shgach rejani qayta o‘lchab solishtiring.
