---
title: "Production uchun Docker image: kichik, tez va xavfsiz"
description: "Node.js servisi misolida multi-stage build, qatlamlar keshi, root bo‘lmagan foydalanuvchi va .dockerignore sozlamalari."
pubDate: 2026-09-22
tags: ["docker", "devops", "nodejs"]
---

Loyihani konteynerga solish oson, lekin oddiy yozilgan `Dockerfile` ko‘pincha 1 GB dan katta image, har safar qaytadan o‘rnatiladigan paketlar va `root` huquqi bilan ishlaydigan jarayonga olib keladi. Quyida Node.js servisini production uchun tayyorlash bosqichlarini ko‘rib chiqamiz.

## Boshlang‘ich holat

```dockerfile
FROM node:22
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "dist/main.js"]
```

Bu faylda to‘rtta amaliy muammo bor:

1. `COPY . .` qatori `npm install` dan oldin turgani uchun bitta `.ts` yoki `.js` fayl o‘zgarsa ham paketlar keshi bekor bo‘ladi.
2. `npm install` production’da kerak bo‘lmagan `devDependencies` paketlarini ham o‘rnatadi.
3. Yakuniy image ichida TypeScript manba kodi, testlar va build vositalari qolib ketadi.
4. Servis konteyner ichida `root` foydalanuvchisi ostida ishga tushadi.

## Multi-stage build

Build bosqichini va ishga tushirish (runtime) bosqichini bir-biridan ajratamiz:

```dockerfile
# 1-bosqich: build
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2-bosqich: production runtime
FROM node:22-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

Bu strukturada avval faqat `package.json` va `package-lock.json` nusxalanadi. Natijada manba kod o‘zgarganda Docker `npm ci` qatlamini keshdan oladi va build vaqti bir necha daqiqadan bir necha soniyaga tushadi.

`npm install` o‘rniga `npm ci` ishlatilgani sababli paketlar aynan `package-lock.json` dagi versiyalar bo‘yicha o‘rnatiladi. Ikkinchi bosqichda esa `--omit=dev` orqali faqat runtime paketlar qoldirilib, birinchi bosqichdan tayyor `./dist` katalogigina ko‘chirib olinadi. Yakunda `USER node` ko‘rsatmasi jarayonni cheklangan huquqli foydalanuvchi ostida ishga tushiradi.

## .dockerignore fayli

`COPY . .` buyrug‘i kontekstdagi keraksiz va maxfiy fayllarni konteynerga qo‘shib yubormasligi uchun loyiha ildizida `.dockerignore` bo‘lishi shart:

```text
node_modules
dist
.git
.env
*.log
Dockerfile
docker-compose*.yml
```

`.env` va `.git` kataloglarini image ichiga tushishdan saqlang: qatlamlar tarixida (`docker history`) qolib ketgan parol yoki kalitlarni keyingi `RUN rm` qatlami bilan ham butunlay o‘chirib bo‘lmaydi. Konfiguratsiya va maxfiy kalitlarni konteyner ishga tushayotgan vaqtda environment variable yoki secret manager orqali ulang.

## Asosiy image versiyasini aniq belgilang

`FROM node:latest` tegi vaqt o‘tishi bilan boshqa major versiyaga o‘zgarib ketadi va kutilmagan vaqtda CI/CD build’ni sindiradi. Uning o‘rniga aniq versiya (`node:22-slim` yoki `node:22.11.0-bookworm-slim`) yozing. Yuqori xavfsizlik talab qilinadigan muhitlarda image’ni SHA-256 digest (`node:22-slim@sha256:...`) bilan mahkamlash mumkin.

## Konteyner holatini tekshirish (HEALTHCHECK)

Konteyner jarayoni (`PID 1`) tirik turgani servis HTTP so‘rovlarga javob bera olayotganini anglatmaydi. Orchestrator (Docker Swarm, ECS yoki Compose) osilib qolgan konteynerni aniqlashi uchun `HEALTHCHECK` qo‘shamiz:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
```

Node 18+ ichida tayyor `fetch` borligi sababli `node:22-slim` image’iga alohida `curl` yoki `wget` paketini o‘rnatishga hojat qolmaydi.

## Deploy oldidan tekshirish ro‘yxati

- `docker image ls` orqali image hajmini o‘lchang (`node:22` dagi ~1.1 GB o‘rniga `node:22-slim` multi-stage odatda 150–220 MB atrofida chiqadi).
- `docker history <image>` buyrug‘i bilan qaysi qatlam eng ko‘p joy olayotganini ko‘ring.
- `docker run --rm <image> whoami` buyrug‘i `node` qaytarishini (`root` emasligini) tekshiring.
- Bitta `.ts` faylni o‘zgartirib qayta `docker build` qiling va `npm ci` qatlami `CACHED` bo‘lib o‘tishini tasdiqlang.

## Xulosa

Multi-stage build, `package-lock.json` keshi, `.dockerignore` va `USER node` qoidalari qo‘shimcha tashqi vositalarsiz Docker image hajmini bir necha barobar qisqartiradi, CI/CD vaqtini tezlashtiradi va konteyner xavfsizligini oshiradi.
