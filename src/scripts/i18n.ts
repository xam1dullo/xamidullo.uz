import { allContent } from "../data/portfolio";
import type { LocaleContent } from "../types/portfolio";

export type Language = "uz" | "en";

export function initI18n() {
  const langToggleBtn = document.getElementById("lang-toggle-btn");
  const langLabel = document.getElementById("lang-current-label");

  let currentLang: Language = (localStorage.getItem("xamidullo-lang") as Language) || "uz";
  if (currentLang !== "uz" && currentLang !== "en") {
    currentLang = "uz";
  }

  function applyLanguage(lang: Language) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem("xamidullo-lang", lang);

    const content: LocaleContent = allContent[lang];

    if (langLabel) {
      langLabel.textContent = lang === "uz" ? "EN" : "UZ";
      langToggleBtn?.setAttribute(
        "aria-label",
        lang === "uz" ? "Switch to English" : "O‘zbek tiliga o‘tish"
      );
    }

    // Update static elements with data-i18n
    document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (!key) return;

      const keys = key.split(".");
      let val: any = content;
      for (const k of keys) {
        if (val && typeof val === "object" && k in val) {
          val = val[k];
        } else {
          val = null;
          break;
        }
      }

      if (typeof val === "string") {
        if (el.dataset.i18nHtml === "true") {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // Update dynamic projects data element for ProjectDrawer
    const projectsDataEl = document.getElementById("projects-data");
    if (projectsDataEl) {
      projectsDataEl.textContent = JSON.stringify(content.projects);
    }

    // Update individual project elements on the page
    content.projects.forEach((proj) => {
      const projRow = document.querySelector<HTMLElement>(`[data-project-id="${proj.id}"]`);
      if (projRow) {
        const typeEl = projRow.querySelector<HTMLElement>(".project-type-text");
        const descEl = projRow.querySelector<HTMLElement>(".project-description");
        if (typeEl) typeEl.textContent = proj.type.replace(/^\d+\s*·\s*/, "");
        if (descEl) descEl.textContent = proj.description;
      }
    });

    // Update capabilities
    content.capabilities.forEach((cap, idx) => {
      const capEl = document.querySelectorAll<HTMLElement>(".capability")[idx];
      if (capEl) {
        const titleEl = capEl.querySelector<HTMLElement>("h3");
        const descEl = capEl.querySelector<HTMLElement>("p");
        if (titleEl) titleEl.textContent = cap.title;
        if (descEl) descEl.textContent = cap.detail;
      }
    });

    // Update principles
    content.principles.forEach((p, idx) => {
      const valEl = document.querySelectorAll<HTMLElement>(".value-item")[idx];
      if (valEl) {
        const titleEl = valEl.querySelector<HTMLElement>("h3");
        const descEl = valEl.querySelector<HTMLElement>("p");
        if (titleEl) titleEl.textContent = p.title;
        if (descEl) descEl.textContent = p.detail;
      }
    });

    // Update archive projects
    content.archiveProjects.forEach((ap, idx) => {
      const archEl = document.querySelectorAll<HTMLElement>(".archive-card")[idx];
      if (archEl) {
        const metaEl = archEl.querySelector<HTMLElement>(".archive-meta");
        const descEl = archEl.querySelector<HTMLElement>(".archive-desc");
        if (metaEl) metaEl.textContent = ap.meta;
        if (descEl) descEl.textContent = ap.description;
      }
    });

    // Update experience
    content.experience.forEach((exp, idx) => {
      const expEl = document.querySelectorAll<HTMLElement>(".timeline-item")[idx];
      if (expEl) {
        const timeEl = expEl.querySelector<HTMLElement>("time");
        const titleEl = expEl.querySelector<HTMLElement>("h3");
        const companyEl = expEl.querySelector<HTMLElement>(".company");
        const detailEl = expEl.querySelector<HTMLElement>(".timeline-detail");
        if (timeEl) timeEl.textContent = exp.period;
        if (titleEl) titleEl.textContent = exp.title;
        if (companyEl) companyEl.textContent = exp.company;
        if (detailEl) detailEl.textContent = exp.detail;
      }
    });

    // Update metrics details
    content.metrics.forEach((m, idx) => {
      const mEl = document.querySelectorAll<HTMLElement>(".metric")[idx];
      if (mEl) {
        const dtEl = mEl.querySelector<HTMLElement>("dt");
        const pEl = mEl.querySelector<HTMLElement>("p");
        const suffixEl = mEl.querySelector<HTMLElement>(".metric-suffix");
        if (dtEl) dtEl.textContent = m.label;
        if (pEl) pEl.textContent = m.detail;
        if (suffixEl) suffixEl.textContent = m.suffix;
      }
    });

    // Dispatch global language event
    window.dispatchEvent(new CustomEvent("languagechange", { detail: { lang, content } }));
  }

  langToggleBtn?.addEventListener("click", () => {
    const nextLang: Language = currentLang === "uz" ? "en" : "uz";
    applyLanguage(nextLang);
  });

  // Apply on init if saved language is English
  if (currentLang === "en") {
    applyLanguage("en");
  }

  return {
    getLanguage: () => currentLang,
    setLanguage: (lang: Language) => applyLanguage(lang),
  };
}
