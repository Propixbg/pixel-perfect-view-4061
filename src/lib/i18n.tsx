import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "bg" | "en";
const KEY = "airpropix-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "bg", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("bg");

  useEffect(() => {
    const url = new URL(window.location.href).searchParams.get("lang");
    const stored = window.localStorage.getItem(KEY);
    const next = url === "en" || url === "bg" ? url : stored === "en" ? "en" : "bg";
    setLangState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(KEY, l);
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Returns a translator: t("English", "Български") */
export function useT() {
  const { lang } = useLang();
  return useCallback((en: string, bg: string) => (lang === "bg" ? bg : en), [lang]);
}

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex items-center font-mono text-[11px] tracking-[0.16em] ${className}`} role="group" aria-label="Language">
      {(["bg", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center">
          {i === 1 ? <span className="px-1.5 text-muted-foreground/50">|</span> : null}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`min-h-8 px-1 uppercase transition-colors ${lang === l ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/airpropix" },
  { label: "Facebook", href: "https://www.facebook.com/airpropix" },
  { label: "YouTube", href: "https://www.youtube.com/@airpropix" },
  { label: "TikTok", href: "https://www.tiktok.com/@airpropix" },
];
