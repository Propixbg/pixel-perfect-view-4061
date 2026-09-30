import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LangSwitch, useT } from "@/lib/i18n";
import logo from "@/assets/airpropix-logo.png.asset.json";

type NavItem = {
  label: [string, string];
  to: string;
  children?: { label: [string, string]; to: string; hash: string }[];
};

const nav: NavItem[] = [
  { label: ["Home", "Начало"], to: "/" },
  {
    label: ["Photo & Video", "Фото и видео"],
    to: "/photo-video",
    children: [
      { label: ["Photography", "Фотография"], to: "/photo-video", hash: "gallery" },
      { label: ["Video", "Видео"], to: "/photo-video", hash: "gallery" },
      { label: ["Drone Photo & Video", "Дрон фото и видео"], to: "/photo-video", hash: "gallery" },
      { label: ["Architecture & Interiors", "Архитектура и интериори"], to: "/photo-video", hash: "gallery" },
      { label: ["Real Estate", "Недвижими имоти"], to: "/photo-video", hash: "gallery" },
      { label: ["Events", "Събития"], to: "/photo-video", hash: "gallery" },
      { label: ["Business & Branding", "Бизнес и брандинг"], to: "/photo-video", hash: "gallery" },
      { label: ["Products", "Продукти"], to: "/photo-video", hash: "gallery" },
    ],
  },
  {
    label: ["Mapping", "Картографиране"],
    to: "/mapping",
    children: [
      { label: ["Drone Mapping", "Дрон картографиране"], to: "/mapping", hash: "pipeline" },
      { label: ["Photogrammetry", "Фотограметрия"], to: "/mapping", hash: "pipeline" },
      { label: ["Orthophoto", "Ортофото"], to: "/mapping", hash: "pipeline" },
      { label: ["Point Cloud", "Облак от точки"], to: "/mapping", hash: "pipeline" },
      { label: ["3D Mapping", "3D картографиране"], to: "/mapping", hash: "pipeline" },
      { label: ["Site Documentation", "Документиране на обекти"], to: "/mapping", hash: "problems" },
      { label: ["Progress Monitoring", "Мониторинг на напредъка"], to: "/mapping", hash: "cases" },
    ],
  },
  {
    label: ["3D", "3D"],
    to: "/3d",
    children: [
      { label: ["3D for Business", "3D за бизнеса"], to: "/3d", hash: "business" },
      { label: ["Prototyping", "Прототипиране"], to: "/3d", hash: "business" },
      { label: ["Functional Parts", "Функционални детайли"], to: "/3d", hash: "business" },
      { label: ["Custom Production", "Индивидуално производство"], to: "/3d", hash: "business" },
      { label: ["Events & Personalization", "Събития и персонализация"], to: "/3d", hash: "events" },
      { label: ["Corporate Gifts", "Корпоративни подаръци"], to: "/3d", hash: "events" },
    ],
  },
  { label: ["Our Work", "Нашата работа"], to: "/work" },
  { label: ["About", "За нас"], to: "/about" },
  { label: ["Contact", "Контакт"], to: "/contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useT();
  const L = (l: [string, string]) => t(l[0], l[1]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-border bg-ink/92 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="AirProPix" className="h-6 w-auto md:h-7" />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => (
            <div key={item.to + item.label[0]} className="group relative">
              <Link
                to={item.to}
                className="flex items-center gap-1.5 px-3 py-2 font-display text-[13px] tracking-wide uppercase text-foreground/75 transition-colors hover:text-primary [&.active]:text-primary"
              >
                {L(item.label)}
                {item.children ? (
                  <span className="text-[8px] text-primary/70 transition-transform group-hover:translate-y-0.5">
                    ▼
                  </span>
                ) : null}
              </Link>
              {item.children ? (
                <div className="invisible absolute left-0 top-full w-64 translate-y-2 border border-border bg-ink/97 p-2 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.label[0]}
                      to={child.to}
                      hash={child.hash}
                      className="block px-3 py-2.5 text-sm text-foreground/70 transition-colors hover:bg-surface hover:text-primary"
                    >
                      {L(child.label)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch />
          <Link
            to="/contact"
            className="hidden rounded-sm bg-primary px-5 py-2.5 font-display text-[12px] font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/85 md:inline-flex"
          >
            {t("Start a project", "Започнете проект")}
          </Link>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-border xl:hidden"
          >
            <div className="space-y-1.5">
              <span
                className={cn("block h-px w-5 bg-foreground transition-transform", open && "translate-y-[6px] rotate-45")}
              />
              <span className={cn("block h-px w-5 bg-foreground transition-opacity", open && "opacity-0")} />
              <span
                className={cn("block h-px w-5 bg-foreground transition-transform", open && "-translate-y-[6px] -rotate-45")}
              />
            </div>
          </button>
        </div>
      </div>

      {open ? (
        <div className="max-h-[75vh] overflow-y-auto border-t border-border bg-ink/97 px-5 pb-8 backdrop-blur-md xl:hidden">
          {nav.map((item) => (
            <div key={item.to + item.label[0]} className="border-b border-border/60 py-3">
              <Link
                to={item.to}
                onClick={() => setOpen(false)}
                className="block font-display text-base uppercase tracking-wide"
              >
                {L(item.label)}
              </Link>
              {item.children ? (
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.label[0]}
                      to={child.to}
                      hash={child.hash}
                      onClick={() => setOpen(false)}
                      className="text-xs text-muted-foreground"
                    >
                      {L(child.label)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 block bg-primary px-5 py-3.5 text-center font-display text-sm uppercase tracking-wide text-primary-foreground"
          >
            {t("Start a project", "Започнете проект")}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
