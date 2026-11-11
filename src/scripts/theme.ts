type Theme = "light" | "dark";

const STORAGE_KEY = "xh-theme";
const THEME_COLORS: Record<Theme, string> = { dark: "#07080c", light: "#f8f9fc" };

export function initTheme() {
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle-btn");
  const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

  function current(): Theme {
    return root.dataset.theme === "light" ? "light" : "dark";
  }

  function apply(theme: Theme) {
    root.dataset.theme = theme;
    themeMeta?.setAttribute("content", THEME_COLORS[theme]);
    button?.setAttribute("aria-pressed", String(theme === "dark"));
    button?.setAttribute(
      "aria-label",
      theme === "dark" ? "Yorug‘ rejimga o‘tish" : "Qorong‘i rejimga o‘tish"
    );
    window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  }

  apply(current());

  button?.addEventListener("click", () => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this visit only.
    }
  });
}
