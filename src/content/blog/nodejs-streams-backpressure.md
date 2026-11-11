---
title: "Node.js'da stream va backpressure: xotirani to‘ldirmasdan katta fayllarni uzatish"
description: "readFile nima uchun katta fayllarda xotirani to‘ldirib qo‘yadi, stream.pipeline qanday ishlaydi va backpressure buferni qanday himoya qiladi."
pubDate: 2026-10-06
tags: ["nodejs", "performance", "backend"]
---

Mijozga katta hajmdagi eksport faylini yuborish kerak bo‘lganda ko‘p uchraydigan dastlabki kod quyidagicha yoziladi:

```js
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";

createServer(async (req, res) => {
  const data = await readFile("./export.csv"); // butun fayl xotiraga olinadi
  res.end(data);
}).listen(3000);
```

Kichik fayllarda bu sezilmaydi. Lekin fayl 2 GB bo‘lsa va bir vaqtda 20 ta so‘rov kelsa, Node.js jarayoni butun faylni RAM’ga yuklashga urinadi va `JavaScript heap out of memory` yoki OOM killer bilan to‘xtaydi. Buning oldini olish uchun faylni bo‘laklab (chunk) o‘qish va uzatish kerak.

## Stream orqali bo‘laklab uzatish

```js
import { createReadStream } from "node:fs";
import { createServer } from "node:http";
import { pipeline } from "node:stream/promises";

createServer(async (req, res) => {
  res.setHeader("Content-Type", "text/csv");
  try {
    await pipeline(createReadStream("./export.csv"), res);
  } catch (err) {
    // mijoz ulanishni uzsa ham pipeline fayl deskriptorini to‘g‘ri yopadi
    if (!res.headersSent) res.statusCode = 500;
    res.end();
  }
}).listen(3000);
```

Bu holatda fayl hajmi 10 MB bo‘ladimi yoki 10 GB, xotirada bir vaqtda faqat bitta bo‘lak (fayl oqimi uchun odatda 64 KB) saqlanadi.

## Backpressure qanday ishlaydi

Diskdan o‘qish tezligi sekundiga yuzlab megabayt bo‘lishi, mijozning mobil interneti esa sekundiga 500 KB bo‘lishi mumkin. Agar diskdan o‘qilgan bo‘laklar tarmoqqa ulgurmasdan uzatilaversa, jo‘natilmagan ma’lumot Node.js ichki buferida yig‘ilib boradi va xotira baribir to‘lib qoladi.

Yozuvchi oqim (masalan, HTTP `res` soketi) ichki buferi to‘lganda o‘quvchi oqimga o‘qishni vaqtincha to‘xtatib turish haqida signal beradi. Bu mexanizm backpressure deyiladi. Qo‘lda yozilganda u shunday ishlaydi:

```js
const readable = createReadStream("./export.csv");

readable.on("data", (chunk) => {
  const canContinue = res.write(chunk);
  if (!canContinue) {
    readable.pause(); // bufer to‘ldi, diskdan o‘qishni to‘xtatamiz
    res.once("drain", () => readable.resume());
  }
});
readable.on("end", () => res.end());
```

`res.write(chunk)` metodining `false` qaytarishi ichki bufer `highWaterMark` chegarasiga yetganini bildiradi. Soket buferidagi ma’lumot tarmoqqa chiqib bo‘shagach, `drain` hodisasi ishga tushadi va o‘qish davom ettiriladi.

Amaliy kodda buni qo‘lda yozish shart emas: `node:stream/promises` ichidagi `pipeline()` aynan shu `pause()` / `drain` / `resume()` zanjirini hamda xatolik yuz berganda oqimlarni yopishni o‘zi boshqaradi.

## Oqim ichida ma’lumotni o‘zgartirish (Transform)

Oqimlarni zanjir qilib ulash orqali faylni diskdan o‘qish, qayta ishlash, Gzip bilan siqish va yangi faylga yozishni xotirani to‘ldirmasdan bajarish mumkin:

```js
import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const upperCase = new Transform({
  transform(chunk, _encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

await pipeline(
  createReadStream("./input.txt"),
  upperCase,
  createGzip(),
  createWriteStream("./output.txt.gz"),
);
```

Matnli oqimlarda e’tibor bering: UTF-8 belgilari 1 baytdan 4 baytgacha joy oladi va `chunk` chegarasi bitta harfning o‘rtasiga to‘g‘ri kelib qolishi mumkin. Shu sababli ko‘p baytli matn (masalan, kirill yoki emoji) ustida ishlaganda `StringDecoder` yoki oqimda `setEncoding("utf8")` ishlating.

## Amaliy eslatmalar

- Hajmi katta yoki oldindan noma’lum fayllar va eksportlar uchun `readFile` o‘rniga `createReadStream` ishlating.
- Eski `.pipe()` metodida bitta oqim uzilsa, qolgan oqimlar yopilmay xotirada osilib qolishi (memory leak) mumkin. Uning o‘rniga `stream/promises` ichidagi `pipeline()` ni ishlating.
- Maxsus `Transform` yoki `Writable` yozayotganda `write()` qaytargan qiymatni va `callback` chaqirilish vaqtini nazorat qiling.
- Yuklama ostida servisning xotira sarfini `process.memoryUsage().rss` va `heapUsed` orqali tekshirib ko‘ring.

## Xulosa

`pipeline()` va stream’lar yordamida bir necha gigabaytlik CSV, log yoki media fayllarni Node.js jarayonining xotira sarfini deyarli o‘zgartirmasdan uzatish va qayta ishlash mumkin.
