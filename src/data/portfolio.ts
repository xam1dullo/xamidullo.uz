import type { LocaleContent } from "../types/portfolio";

export const uzContent: LocaleContent = {
  nav: {
    about: "Tamoyillar",
    work: "Loyihalar",
    experience: "Tajriba",
    blog: "Blog",
    contact: "Aloqa",
    availability: "Yangi loyiha va hamkorlik uchun ochiq",
  },
  hero: {
    eyebrow: "// SENIOR SOFTWARE ENGINEER · UCELL · TOSHKENT",
    fullName: "Xamidullo Xudoyberdiyev Ulug‘bek o‘g‘li",
    title: "Yuqori yuklamali backend va full-stack tizimlar quraman.",
    titleHtml: "Yuqori yuklamali <em>backend va full-stack</em> tizimlar quraman.",
    summary:
      "Ucell’da Senior Software Engineer. Telekom darajasidagi mikroservislar, ma’lumotlar bazasi optimizatsiyasi, CI/CD infratuzilmasi va full-stack web mahsulotlarni loyihalab, production’ga chiqaraman.",
    roleLabel: "Hozirgi lavozim",
    roleValue: "Senior Software Engineer · Ucell",
    mottoBadge: "build · learn · serve",
    telegramCta: "Telegram’da yozish",
    worksCta: "Production loyihalar (6)",
    cliCta: "CLI Terminal",
  },
  metricsHeading: {
    eyebrow: "// MUHANDISLIK · RAQAMLARDA",
    title: "Production’da o‘lchangan ko‘rsatkichlar.",
    summary:
      "Texnik qarorlarni javob vaqti (latency), xotira sarfi va servis barqarorligi orqali o‘lchayman.",
  },
  principlesHeading: {
    eyebrow: "// YONDASHUV VA TAMOYILLAR",
    title: "Sodda arxitektura va o‘lchanadigan natija.",
    summary:
      "Muammoni kod yozishdan oldin tahlil qilaman, cheklovlarni aniqlayman va jamoa uzoq muddat bemalol qo‘llab-quvvatlay oladigan tizim quraman.",
    quote:
      "“Halol niyat, aniq mas’uliyat va puxta muhandislik uzoq umr ko‘radigan dasturiy mahsulotning asosidir.”",
    quoteAuthor: "Xamidullo Xudoyberdiyev · Ish tamoyili",
  },
  principles: [
    {
      number: "01",
      title: "Halollik",
      detail:
        "Arxitektura qarorlari, muddat va texnik risklarni ochiq aytaman. Vaqtinchalik yamoq o‘rniga uzoq muddat ishlaydigan yechim tanlayman.",
    },
    {
      number: "02",
      title: "Mas’uliyat",
      detail:
        "Loyiha talablarini tahlil qilishdan tortib serverdagi barqaror ishlashigacha bo‘lgan barcha bosqichlarga javob beraman.",
    },
    {
      number: "03",
      title: "Amaliy qiymat",
      detail:
        "Har bir relizda foydalanuvchi ishini tezlashtiradigan va biznes jarayonini soddalashtiradigan o‘zgarishlarga e’tibor qarataman.",
    },
    {
      number: "04",
      title: "Intizom va o‘rganish",
      detail:
        "Avtomatlashtirilgan testlar, monitoring, tushunarli dokumentatsiya va kod tahlilini (code review) kundalik ish tartibim deb bilaman.",
    },
  ],
  rangeHeading: {
    eyebrow: "// MUHANDISLIK QAMROVI",
    title: "Koddan production servergacha yagona zanjir.",
    summary:
      "Texnologiyalarni loyiha yuklamasi, ma’lumotlar hajmi va jamoaning uzoq muddatli qo‘llab-quvvatlash imkoniyatiga qarab tanlayman.",
  },
  workHeading: {
    eyebrow: "// PRODUCTION LOYIHALAR",
    title: "Loyihalashdan deploy’gacha to‘liq bajarilgan ishlar.",
    summary:
      "Frontend, backend API, ma’lumotlar bazasi sxemasi, kesh qatlami va Docker infratuzilmasi yagona tizim sifatida qurilgan.",
    caseStudyBtn: "Arxitektura tahlili",
    archiveTitle: "Qo‘shimcha production loyihalar",
    archiveSubtitle: "Mustaqil va jamoa bilan ishga tushirilgan web platformalar",
  },
  archiveProjects: [
    {
      mark: "AD",
      name: "AutoDriver",
      meta: "Full-stack · DevOps · Mobile-first",
      description:
        "Haydovchilar va transport xizmatlari uchun mobile-first interfeysda qurilgan full-stack web platforma.",
      url: "https://autodriver.uz",
    },
    {
      mark: "TL",
      name: "Tilchi",
      meta: "Education · Content · Platform",
      description:
        "Til kurslari, lug‘at mashqlari va o‘quv materiallarini tizimli boshqarishga mo‘ljallangan ta’lim platformasi.",
      url: "https://tilchi.uz",
    },
    {
      mark: "CH",
      name: "Chortoqliklar",
      meta: "Community · Full-stack · Ownership",
      description:
        "Hududiy yangiliklar, mahalliy xizmatlar va e’lonlarni bir joyga jamlagan hamjamiyat portali.",
      url: "https://chortoqliklar.uz",
    },
  ],
  experienceHeading: {
    eyebrow: "// MEHNAT FAOLIYATI",
    title: "Telekom, mahsulot muhandisligi va mentorlik.",
    summary:
      "Ucell, Teclar Dev, Namangan International School va Najot Ta’lim’dagi amaliy muhandislik hamda o‘qituvchilik faoliyatim.",
  },
  blogHeading: {
    eyebrow: "// TEXNIK MAQOLALAR",
    title: "Amaliy muhandislik yozuvlari.",
    summary:
      "PostgreSQL so‘rovlarini optimallashtirish, Node.js oqimlari (streams) va production Docker konteynerlari bo‘yicha tajribalar.",
    allPosts: "Barcha maqolalarni o‘qish",
  },
  knowledge: {
    eyebrow: "// MENTORLIK VA TA’LIM",
    title: "Najot Ta’lim’da amaliy backend mentorligi.",
    summary:
      "2024-yildan beri Najot Ta’lim’da Node.js, ma’lumotlar bazasi, Docker va serverga deploy qilish bo‘yicha dars beraman. O‘quvchilar kurs davomida mustaqil backend servislar yozib, production’ga chiqarishadi.",
    mentorOrg: "Najot Ta’lim",
    mentorRole: "Node.js Teacher · 2024-yildan",
    blogLink: "The Lazy Programmer (Telegram blog)",
    blogDesc:
      "Backend arxitekturasi, tizim dizayni va kundalik ishda uchraydigan texnik muammolar yechimi haqida mualliflik kanali.",
    linkedinTitle: "Professional tarmoq va muloqot",
    linkedinDesc:
      "Muhandislik tajribasi, texnik yetakchilik va yangi loyihalar bo‘yicha LinkedIn sahifam.",
    eduLabel: "// OLIY TA’LIM",
    eduYears: "2019 → 2023",
    eduTitle: "Farg‘ona Politexnika Instituti",
    eduDegree: "Mechanical Engineering · Bakalavr (B.S.)",
    eduSummary:
      "Muhandislik hisob-kitoblari, tizimli tahlil va real fizik hamda texnik cheklovlar ostida ishlash poydevori.",
  },
  contact: {
    eyebrow: "// BOG‘LANISH",
    title: "Loyiha yoki texnik vazifa bo‘yicha yozing.",
    summary:
      "Full-time pozitsiya, murakkab backend loyiha, arxitektura tahlili yoki mentorlik bo‘yicha Telegram va pochta orqali bog‘lanishingiz mumkin.",
    telegramBtn: "Telegram’da yozish",
    linkedinBtn: "LinkedIn profilni ochish",
    location: "Toshkent, O‘zbekiston",
    footerNote: "Halol mehnat, puxta muhandislik.",
  },
  drawer: {
    caseStudy: "// CASE STUDY",
    problem: "Muammo va vazifa",
    solution: "Arxitektura yechimi",
    highlights: "Texnik yechimlar",
    metrics: "O‘lchangan natijalar",
    topology: "Tizim oqimi (Architecture Topology)",
    liveBtn: "Saytni ochish",
  },
  telemetry: {
    status: "TIZIM HOLATI · FAOL",
    uptime: "TOSHKENT · UTC+5",
    latency: "NODE · GO · POSTGRES",
    build: "ASTRO 6 · STATIC SSG",
    version: "v2.6.0 · SYSTEMS",
  },
  metrics: [
    {
      value: "4+",
      suffix: "yil",
      label: "Production tajribasi",
      detail: "Backend · full-stack · DevOps",
      numericTarget: 4,
    },
    {
      value: "3×",
      suffix: "",
      label: "Tezroq servis javobi",
      detail: "Bottleneck audit · query tuning",
      numericTarget: 3,
    },
    {
      value: "90%",
      suffix: "",
      label: "Kamroq xotira sarfi",
      detail: "Streaming · runtime optimizatsiya",
      numericTarget: 90,
    },
    {
      value: "50%",
      suffix: "",
      label: "Latency & Availability o‘sishi",
      detail: "AWS migratsiya · CI/CD avtomatizatsiya",
      numericTarget: 50,
    },
  ],
  capabilities: [
    {
      number: "01",
      title: "Ilova va servislar",
      detail:
        "TypeScript, Node.js, NestJS, Deno va Go yordamida yuqori yuklamada ishlaydigan mikroservislar hamda REST/WebSocket API tizimlari.",
      tags: ["TypeScript", "Node.js", "NestJS", "Deno", "Go"],
    },
    {
      number: "02",
      title: "Ma’lumot va tezlik",
      detail:
        "PostgreSQL, Oracle SQL, MongoDB va Redis bilan kompozit indekslar, kesh qatlami hamda so‘rovlar rejasini optimallashtirish.",
      tags: ["PostgreSQL", "Oracle SQL", "MongoDB", "Redis", "Query Tuning"],
    },
    {
      number: "03",
      title: "Production tizimlari",
      detail:
        "Docker konteynerizatsiyasi, Nginx reverse proxy, Linux serverlar, CI/CD oqimlari va AWS bulutli infratuzilmasi.",
      tags: ["Docker", "Nginx", "Linux", "CI/CD", "AWS"],
    },
    {
      number: "04",
      title: "Sifat va mentorlik",
      detail:
        "Playwright va unit testlar, tizim monitoringi, arxitektura tahlili hamda dasturchilar jamoasiga mentorlik qilish.",
      tags: ["Testing", "Monitoring", "Clean Code", "Architecture", "Mentoring"],
    },
  ],
  projects: [
    {
      id: "sag-flooring",
      type: "01 · Commerce platform",
      name: "SAG Flooring",
      description:
        "Katta hajmdagi gilam va pol qoplamalari katalogi, ko‘p parametrli filtrlash, hududiy filiallar hamda savdo so‘rovlarini birlashtirgan savdo platformasi.",
      stack: ["End-to-end", "Next.js", "NestJS", "PostgreSQL", "Docker", "Redis"],
      url: "https://sagflooring.uz",
      featured: true,
      architecture: {
        problem:
          "Katta hajmdagi mahsulot katalogini bir necha atributlar bo‘yicha tez filtrlash, hududiy filiallar qoldig‘ini ko‘rsatish va yuqori trafikda barqaror ishlash.",
        solution:
          "NestJS servislari, Redis kesh qatlami, PostgreSQL kompozit indekslari va Next.js SSR/ISR yordamida o‘rtacha javob vaqti p95 < 60ms darajasiga tushirildi.",
        highlights: [
          "Ko‘p parametrli katalog filtrlari uchun PostgreSQL kompozit indekslari",
          "Redis kesh qatlami orqali asosiy ma’lumotlar bazasi yuklamasini 65% ga kamaytirish",
          "Docker konteynerlari va uzluksiz CI/CD deploy oqimi",
        ],
        metrics: [
          { label: "O‘rtacha javob vaqti", value: "< 60ms" },
          { label: "Katalog yuklanishi", value: "3.2× tezroq" },
          { label: "Uptime ko‘rsatkichi", value: "99.9%" },
        ],
        diagramNodes: [
          { id: "client", label: "Web Client (Next.js)", role: "Edge Rendering" },
          { id: "gateway", label: "API Gateway (Nginx)", role: "Reverse Proxy & SSL" },
          { id: "api", label: "Backend Service (NestJS)", role: "Business Logic" },
          { id: "cache", label: "Cache Layer (Redis)", role: "Session & Catalog Cache" },
          { id: "db", label: "Primary Database (PostgreSQL)", role: "Persistent Storage" },
        ],
      },
    },
    {
      id: "automaktab",
      type: "02 · Education product",
      name: "Automaktab",
      description:
        "Avtomaktablarda o‘quv jarayoni, imtihon biletlari, dars jadvali va o‘quvchilar davomatini raqamlashtirgan boshqaruv tizimi.",
      stack: ["Full-stack", "Node.js", "PostgreSQL", "Architecture", "Deploy"],
      url: "https://automaktab.uz",
      featured: true,
      architecture: {
        problem:
          "O‘quv jarayoni, test sinovlari, dars jadvali va to‘lov hisobini qog‘oz jurnallardan yagona web platformaga o‘tkazish.",
        solution:
          "Rollarga asoslangan ruxsatlar tizimi (RBAC), real vaqtda ishlovchi test dvigateli va instruktorlar dars jadvalini boshqarish backend servisi qurildi.",
        highlights: [
          "Imtihon javoblarini darhol tekshiruvchi va natijani hisoblovchi test dvigateli",
          "Filiallar kesimida o‘quvchilar davomati va to‘lovlar monitoringi",
          "WebSocket orqali dars va imtihon vaqtlari haqida bildirishnomalar",
        ],
        metrics: [
          { label: "Jarayon avtomatlashuvi", value: "85%" },
          { label: "Qog‘oz ishlar qisqarishi", value: "90%" },
          { label: "Tizim barqarorligi", value: "Zero Downtime" },
        ],
        diagramNodes: [
          { id: "admin", label: "School Admin Panel", role: "Management Interface" },
          { id: "student", label: "Student Mobile/Web", role: "Exam & Lessons" },
          { id: "core", label: "Exam Engine (Node.js)", role: "Real-time Evaluation" },
          { id: "db", label: "State Database (PostgreSQL)", role: "Student Records" },
        ],
      },
    },
    {
      id: "burro-arab",
      type: "03 · Learning platform",
      name: "Burro Arab",
      description:
        "Arab tilini o‘rganuvchilar uchun fonetik audio mashqlar, interaktiv testlar va bosqichma-bosqich darslardan iborat ta’lim platformasi.",
      stack: ["Product", "Backend", "UX", "Media Streaming", "PostgreSQL"],
      url: "https://burroarab.uz",
      featured: true,
      architecture: {
        problem:
          "Fonetik audio yozuvlar va arab grammatikasi mashqlarini mobil internetda ham kechikishsiz yetkazib berish.",
        solution:
          "Audio fayllarni bo‘laklab keshlash, CDN orqali uzatish va o‘quvchining xatolariga qarab mashqlarni qayta taklif qiluvchi backend mantiqi yozildi.",
        highlights: [
          "Audio va media fayllarni past kechikish bilan uzatuvchi streaming oqimi",
          "Javoblarni tekshirish va xato qilingan mavzularni takrorlash algoritmi",
          "Mobil va desktop brauzerlar uchun yengil frontend paketi",
        ],
        metrics: [
          { label: "Media yuklanishi", value: "4× tezroq" },
          { label: "Tizim barqarorligi", value: "99.8%" },
          { label: "Darsni yakunlash", value: "+40%" },
        ],
        diagramNodes: [
          { id: "learner", label: "Learner App", role: "Interactive Drills" },
          { id: "stream", label: "Audio CDN / Storage", role: "Optimized Media Delivery" },
          { id: "api", label: "Course API (Node.js)", role: "Progress & Logic" },
          { id: "db", label: "Database", role: "Progress Storage" },
        ],
      },
    },
  ],
  experience: [
    {
      period: "2025.05 → hozir",
      title: "Senior Software Engineer",
      company: "Ucell",
      detail:
        "Telekom miqyosidagi backend servislar, mikroservis arxitekturasi, korporativ integratsiyalar, Oracle SQL so‘rovlarini optimallashtirish, DevOps va texnik yetakchilik.",
      skills: ["Microservices", "Oracle SQL", "Integrations", "High-load", "DevOps", "Leadership"],
      outcomes: ["ENTERPRISE TELECOM", "ORACLE SQL TUNING", "HIGH-LOAD ARCHITECTURE"],
    },
    {
      period: "2024.03 → hozir",
      title: "Node.js Teacher",
      company: "Najot Ta’lim · Part-time",
      detail:
        "Node.js, NestJS, PostgreSQL, MongoDB va Docker bo‘yicha amaliy o‘quv dasturi asosida backend dasturchilarni tayyorlash hamda loyiha arxitekturasi bo‘yicha mentorlik qilish.",
      skills: ["Node.js", "NestJS", "PostgreSQL", "MongoDB", "Docker", "Mentoring", "Curriculum"],
      outcomes: ["PRODUCTION CURRICULUM", "MENTORING"],
    },
    {
      period: "2023.04 → hozir",
      title: "Software Engineer",
      company: "Namangan International School · Part-time",
      detail:
        "Node.js, Deno, grammY va Prisma yordamida maktabning o‘quv hamda ichki boshqaruv jarayonlari uchun Telegram botlar va avtomatlashtirish servislarini ishlab chiqish.",
      skills: ["Node.js", "Deno", "grammY", "Prisma", "Automation"],
      outcomes: ["TELEGRAM ECOSYSTEM", "PROCESS AUTOMATION"],
    },
    {
      period: "2022.02 → 2023.04",
      title: "Software Engineer",
      company: "Teclar Dev / Premium IT Solution · Remote",
      detail:
        "CI/CD oqimlarini avtomatlashtirish, infratuzilmani DigitalOcean’dan AWS’ga ko‘chirish, mikroservis va WebSocket servislarini yozish hamda xotira va navbat (queue) sarfini optimallashtirish.",
      skills: ["AWS", "CI/CD", "Microservices", "WebSockets", "Queue Optimization"],
      outcomes: ["50% LATENCY / AVAILABILITY", "3× RESPONSE", "90% MEMORY SAVED", "DO → AWS"],
    },
    {
      period: "2021.10 → 2022.02",
      title: "Software Engineer Intern",
      company: "Teclar Dev / Premium IT Solution",
      detail:
        "Ajv yordamida JSON schema tekshiruvlari, Playwright orqali avtorizatsiya oqimlari va vakansiyalarni yig‘ish (scraping) pipeline’larini avtomatlashtirish.",
      skills: ["Playwright", "Ajv Validation", "Automation"],
      outcomes: ["SCRAPING PIPELINE", "SCHEMA VALIDATION"],
    },
  ],
};

export const enContent: LocaleContent = {
  nav: {
    about: "Principles",
    work: "Projects",
    experience: "Experience",
    blog: "Blog",
    contact: "Contact",
    availability: "Open to new projects and engineering roles",
  },
  hero: {
    eyebrow: "// SENIOR SOFTWARE ENGINEER · UCELL · TASHKENT",
    fullName: "Xamidullo Xudoyberdiyev Ulug‘bek o‘g‘li",
    title: "Building high-load backend systems and full-stack products.",
    titleHtml: "Building high-load <em>backend systems</em> and full-stack products.",
    summary:
      "Senior Software Engineer at Ucell. I design and ship telecom-scale microservices, database optimizations, CI/CD infrastructure, and full-stack web products.",
    roleLabel: "Current Role",
    roleValue: "Senior Software Engineer · Ucell",
    mottoBadge: "build · learn · serve",
    telegramCta: "Message on Telegram",
    worksCta: "Production Projects (6)",
    cliCta: "CLI Terminal",
  },
  metricsHeading: {
    eyebrow: "// ENGINEERING · IN NUMBERS",
    title: "Measured in production.",
    summary:
      "I evaluate technical decisions by response time, memory footprint, and production uptime.",
  },
  principlesHeading: {
    eyebrow: "// APPROACH & PRINCIPLES",
    title: "Clear architecture and measurable production outcomes.",
    summary:
      "I analyze operational constraints before writing code, then build maintainable systems that solve the underlying business problem.",
    quote:
      "“Honest intent, clear ownership, and rigorous engineering are the foundation of software that endures.”",
    quoteAuthor: "Xamidullo Xudoyberdiyev · Engineering Principle",
  },
  principles: [
    {
      number: "01",
      title: "Integrity (Halollik)",
      detail:
        "Direct about trade-offs, timelines, and technical risks. I build durable architectural foundations instead of fragile workarounds.",
    },
    {
      number: "02",
      title: "Ownership (Mas’uliyat)",
      detail:
        "Accountable from initial schema design and API contracts through deployment, monitoring, and production stability.",
    },
    {
      number: "03",
      title: "Practical Value",
      detail:
        "Every release focuses on reducing user friction, improving response times, and solving concrete operational bottlenecks.",
    },
    {
      number: "04",
      title: "Discipline & Mentorship",
      detail:
        "Automated testing, query profiling, clear documentation, and code reviews practiced as daily engineering habits.",
    },
  ],
  rangeHeading: {
    eyebrow: "// OPERATING RANGE",
    title: "End-to-end ownership from code to production servers.",
    summary:
      "I select tools based on workload constraints, data volume, and long-term operational simplicity.",
  },
  workHeading: {
    eyebrow: "// PRODUCTION DEPLOYMENTS",
    title: "Shipped from initial architecture to live traffic.",
    summary:
      "Frontend interfaces, backend APIs, database indexing, caching layers, and Docker deployment pipelines built as one cohesive system.",
    caseStudyBtn: "Architecture Study",
    archiveTitle: "Additional Production Deployments",
    archiveSubtitle: "Full-stack web platforms built independently and with partner teams",
  },
  archiveProjects: [
    {
      mark: "AD",
      name: "AutoDriver",
      meta: "Full-stack · DevOps · Mobile-first",
      description:
        "Mobile-first full-stack web platform built for driver services and automotive operations.",
      url: "https://autodriver.uz",
    },
    {
      mark: "TL",
      name: "Tilchi",
      meta: "Education · Content · Platform",
      description:
        "Digital platform for structured language courses, vocabulary exercises, and lesson management.",
      url: "https://tilchi.uz",
    },
    {
      mark: "CH",
      name: "Chortoqliklar",
      meta: "Community · Full-stack · Ownership",
      description:
        "Regional community portal combining local news, directory listings, and public service announcements.",
      url: "https://chortoqliklar.uz",
    },
  ],
  experienceHeading: {
    eyebrow: "// WORKING LOG",
    title: "Telecom systems, product engineering, and mentorship.",
    summary:
      "Engineering and teaching roles across Ucell, Teclar Dev, Namangan International School, and Najot Ta’lim.",
  },
  blogHeading: {
    eyebrow: "// TECHNICAL WRITING",
    title: "Practical engineering notes.",
    summary:
      "Guides on PostgreSQL query plans, Node.js stream backpressure, and production Docker images based on real service workloads.",
    allPosts: "Read all articles",
  },
  knowledge: {
    eyebrow: "// MENTORSHIP & EDUCATION",
    title: "Practical backend engineering mentorship at Najot Ta’lim.",
    summary:
      "Since 2024, I have taught Node.js, relational and NoSQL databases, Docker, and Linux deployment at Najot Ta’lim. Students design, test, and deploy complete backend services from scratch.",
    mentorOrg: "Najot Ta’lim",
    mentorRole: "Node.js Teacher · Since 2024",
    blogLink: "The Lazy Programmer (Telegram Blog)",
    blogDesc:
      "Notes on backend architecture, database internals, and lessons from operating production services.",
    linkedinTitle: "Engineering updates on LinkedIn",
    linkedinDesc:
      "Connect for architecture discussions, backend engineering roles, and technical collaboration.",
    eduLabel: "// ACADEMIC FOUNDATION",
    eduYears: "2019 → 2023",
    eduTitle: "Fergana Polytechnic Institute",
    eduDegree: "B.S. in Mechanical Engineering",
    eduSummary:
      "Analytical modeling, structural calculation, and engineering problem-solving under physical and operational constraints.",
  },
  contact: {
    eyebrow: "// DIRECT CONTACT",
    title: "Get in touch about a role or engineering project.",
    summary:
      "Reach out via Telegram or email for full-time senior engineering roles, backend architecture consulting, or mentorship.",
    telegramBtn: "Message on Telegram",
    linkedinBtn: "Open LinkedIn Profile",
    location: "Tashkent, Uzbekistan",
    footerNote: "Honest work, rigorous engineering.",
  },
  drawer: {
    caseStudy: "// CASE STUDY",
    problem: "Problem & Context",
    solution: "Architectural Solution",
    highlights: "Engineering Highlights",
    metrics: "Measured Results",
    topology: "System Topology & Flow",
    liveBtn: "Open Live Site",
  },
  telemetry: {
    status: "SYSTEM STATUS · ACTIVE",
    uptime: "TASHKENT · UTC+5",
    latency: "NODE · GO · POSTGRES",
    build: "ASTRO 6 · STATIC SSG",
    version: "v2.6.0 · SYSTEMS",
  },
  metrics: [
    {
      value: "4+",
      suffix: "yrs",
      label: "Production Experience",
      detail: "Backend · full-stack · DevOps",
      numericTarget: 4,
    },
    {
      value: "3×",
      suffix: "",
      label: "Faster Service Response",
      detail: "Bottleneck audit · query tuning",
      numericTarget: 3,
    },
    {
      value: "90%",
      suffix: "",
      label: "Lower Memory Footprint",
      detail: "Streaming · runtime optimization",
      numericTarget: 90,
    },
    {
      value: "50%",
      suffix: "",
      label: "Latency & Availability Gain",
      detail: "AWS migration · CI/CD automation",
      numericTarget: 50,
    },
  ],
  capabilities: [
    {
      number: "01",
      title: "Applications & Services",
      detail:
        "High-throughput microservices and REST/WebSocket APIs built with TypeScript, Node.js, NestJS, Deno, and Go.",
      tags: ["TypeScript", "Node.js", "NestJS", "Deno", "Go"],
    },
    {
      number: "02",
      title: "Data & Query Speed",
      detail:
        "Composite indexing, execution plan tuning, and Redis caching layers across PostgreSQL, Oracle SQL, and MongoDB.",
      tags: ["PostgreSQL", "Oracle SQL", "MongoDB", "Redis", "Query Tuning"],
    },
    {
      number: "03",
      title: "Production Infrastructure",
      detail:
        "Multi-stage Docker builds, Nginx reverse proxies, Linux server administration, CI/CD pipelines, and AWS deployments.",
      tags: ["Docker", "Nginx", "Linux", "CI/CD", "AWS"],
    },
    {
      number: "04",
      title: "Quality & Mentorship",
      detail:
        "End-to-end Playwright and unit testing, runtime monitoring, architecture reviews, and mentoring backend engineers.",
      tags: ["Testing", "Monitoring", "Clean Code", "Architecture", "Mentoring"],
    },
  ],
  projects: [
    {
      id: "sag-flooring",
      type: "01 · Commerce platform",
      name: "SAG Flooring",
      description:
        "Digital commerce platform for large flooring catalogs, multi-attribute filtering, regional showrooms, and sales leads.",
      stack: ["End-to-end", "Next.js", "NestJS", "PostgreSQL", "Docker", "Redis"],
      url: "https://sagflooring.uz",
      featured: true,
      architecture: {
        problem:
          "Sub-second filtering across large carpet and flooring catalogs, multi-branch inventory sync, and stability under concurrent traffic.",
        solution:
          "Built NestJS services with Redis catalog caching, PostgreSQL composite indexes, and Next.js SSR/ISR keeping p95 latency under 60ms.",
        highlights: [
          "Composite indexes and SQL execution plan tuning for multi-attribute faceted search",
          "Multi-tier Redis caching reducing primary database read load by 65%",
          "Dockerized deployment with automated zero-downtime CI/CD pipelines",
        ],
        metrics: [
          { label: "Average Response Time", value: "< 60ms" },
          { label: "Catalog Rendering", value: "3.2× faster" },
          { label: "Production Uptime", value: "99.9%" },
        ],
        diagramNodes: [
          { id: "client", label: "Web Client (Next.js)", role: "Edge Rendering" },
          { id: "gateway", label: "API Gateway (Nginx)", role: "Reverse Proxy & SSL" },
          { id: "api", label: "Backend Service (NestJS)", role: "Business Logic" },
          { id: "cache", label: "Cache Layer (Redis)", role: "Session & Catalog Cache" },
          { id: "db", label: "Primary Database (PostgreSQL)", role: "Persistent Storage" },
        ],
      },
    },
    {
      id: "automaktab",
      type: "02 · Education product",
      name: "Automaktab",
      description:
        "Driving school management platform digitizing student attendance, exam tickets, class schedules, and branch administration.",
      stack: ["Full-stack", "Node.js", "PostgreSQL", "Architecture", "Deploy"],
      url: "https://automaktab.uz",
      featured: true,
      architecture: {
        problem:
          "Replacing paper attendance logs, manual exam grading, and fragmented class schedules across driving school branches.",
        solution:
          "Built role-based access control (RBAC), a real-time exam scoring engine, and an automated instructor scheduling backend.",
        highlights: [
          "Automated exam engine with instant score calculation and error breakdown",
          "Multi-branch student ledger and payment tracking",
          "WebSocket notifications for class schedule changes and exam results",
        ],
        metrics: [
          { label: "Process Automation", value: "85%" },
          { label: "Paperwork Reduction", value: "90%" },
          { label: "System Availability", value: "Zero Downtime" },
        ],
        diagramNodes: [
          { id: "admin", label: "School Admin Panel", role: "Management Interface" },
          { id: "student", label: "Student Mobile/Web", role: "Exam & Lessons" },
          { id: "core", label: "Exam Engine (Node.js)", role: "Real-time Evaluation" },
          { id: "db", label: "State Database (PostgreSQL)", role: "Student Records" },
        ],
      },
    },
    {
      id: "burro-arab",
      type: "03 · Learning platform",
      name: "Burro Arab",
      description:
        "Arabic language learning platform combining phonetic audio drills, interactive grammar exercises, and structured lessons.",
      stack: ["Product", "Backend", "UX", "Media Streaming", "PostgreSQL"],
      url: "https://burroarab.uz",
      featured: true,
      architecture: {
        problem:
          "Delivering phonetic audio streams, pronunciation drills, and Arabic grammar exercises across web and mobile without playback lag.",
        solution:
          "Implemented audio chunk caching, CDN media delivery, and an exercise evaluation engine that tracks learner progress in PostgreSQL.",
        highlights: [
          "Low-latency audio streaming pipeline backed by CDN caching",
          "Answer validation and spaced-repetition review scheduling",
          "Lightweight client bundle optimized for mobile networks",
        ],
        metrics: [
          { label: "Media Load Speed", value: "4× faster" },
          { label: "Platform Stability", value: "99.8%" },
          { label: "Course Completion", value: "+40%" },
        ],
        diagramNodes: [
          { id: "learner", label: "Learner App", role: "Interactive Drills" },
          { id: "stream", label: "Audio CDN / Storage", role: "Optimized Media Delivery" },
          { id: "api", label: "Course API (Node.js)", role: "Progress & Logic" },
          { id: "db", label: "Database", role: "Progress Storage" },
        ],
      },
    },
  ],
  experience: [
    {
      period: "2025.05 → Present",
      title: "Senior Software Engineer",
      company: "Ucell",
      detail:
        "Telecom-scale backend services, microservices architecture, enterprise integrations, Oracle SQL query tuning, DevOps pipelines, and technical leadership.",
      skills: ["Microservices", "Oracle SQL", "Integrations", "High-load", "DevOps", "Leadership"],
      outcomes: ["ENTERPRISE TELECOM", "ORACLE SQL TUNING", "HIGH-LOAD ARCHITECTURE"],
    },
    {
      period: "2024.03 → Present",
      title: "Node.js Teacher",
      company: "Najot Ta’lim · Part-time",
      detail:
        "Training backend developers through a project-driven curriculum covering Node.js, NestJS, PostgreSQL, MongoDB, Docker, and Linux deployment.",
      skills: ["Node.js", "NestJS", "PostgreSQL", "MongoDB", "Docker", "Mentoring", "Curriculum"],
      outcomes: ["PRODUCTION CURRICULUM", "MENTORING"],
    },
    {
      period: "2023.04 → Present",
      title: "Software Engineer",
      company: "Namangan International School · Part-time",
      detail:
        "Building and maintaining Telegram automation bots and internal school workflow tools using Node.js, Deno, grammY, and Prisma.",
      skills: ["Node.js", "Deno", "grammY", "Prisma", "Automation"],
      outcomes: ["TELEGRAM ECOSYSTEM", "PROCESS AUTOMATION"],
    },
    {
      period: "2022.02 → 2023.04",
      title: "Software Engineer",
      company: "Teclar Dev / Premium IT Solution · Remote",
      detail:
        "Automated CI/CD pipelines, migrated cloud infrastructure from DigitalOcean to AWS, built microservice and WebSocket services, and reduced memory and queue overhead.",
      skills: ["AWS", "CI/CD", "Microservices", "WebSockets", "Queue Optimization"],
      outcomes: ["50% LATENCY / AVAILABILITY", "3× RESPONSE", "90% MEMORY SAVED", "DO → AWS"],
    },
    {
      period: "2021.10 → 2022.02",
      title: "Software Engineer Intern",
      company: "Teclar Dev / Premium IT Solution",
      detail:
        "Built JSON schema validation with Ajv, automated authentication flows, and maintained headless job-posting collection pipelines with Playwright.",
      skills: ["Playwright", "Ajv Validation", "Automation"],
      outcomes: ["SCRAPING PIPELINE", "SCHEMA VALIDATION"],
    },
  ],
};

export const defaultContent = uzContent;
export const projects = defaultContent.projects;
export const archiveProjects = defaultContent.archiveProjects;
export const principles = defaultContent.principles;
export const capabilities = defaultContent.capabilities;
export const experience = defaultContent.experience;
export const metrics = defaultContent.metrics;

export const allContent = {
  uz: uzContent,
  en: enContent,
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Xamidullo Xudoyberdiyev",
  alternateName: "Xamidullo Xudoyberdiyev Ulug‘bek o‘g‘li",
  jobTitle: "Senior Software Engineer",
  image: "https://avatars.githubusercontent.com/u/74096482?v=4",
  worksFor: {
    "@type": "Organization",
    name: "Ucell",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Fergana Polytechnic Institute",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tashkent",
    addressCountry: "UZ",
  },
  url: "https://xamidullo.uz/",
  email: "khkhamidullo@gmail.com",
  telephone: "+998946110066",
  sameAs: [
    "https://t.me/Xamidullo_Xudoyberdiyev",
    "https://t.me/thelazy_programmer",
    "https://www.linkedin.com/in/xam1dullo/",
    "https://github.com/xam1dullo",
  ],
  knowsAbout: [
    "Backend Architecture",
    "Microservices",
    "Node.js",
    "NestJS",
    "TypeScript",
    "Deno",
    "Go",
    "PostgreSQL",
    "Oracle SQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Nginx",
    "Linux",
    "AWS",
    "CI/CD",
  ],
};
