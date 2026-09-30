import { Link } from "@tanstack/react-router";
import logo from "@/assets/airpropix-logo.png.asset.json";
import { LangSwitch, socials, useT } from "@/lib/i18n";

export function SiteFooter() {
  const t = useT();
  const columns = [
    {
      title: "Photo & Video",
      links: [
        { label: t("Photography", "Фотография"), to: "/photo-video" },
        { label: t("Drone Photo & Video", "Дрон фото и видео"), to: "/photo-video" },
        { label: t("Video Production", "Видео продукция"), to: "/photo-video" },
        { label: t("Business & Branding", "Бизнес и брандинг"), to: "/photo-video" },
      ],
    },
    {
      title: t("Mapping", "Картографиране"),
      links: [
        { label: t("Drone Mapping", "Дрон картографиране"), to: "/mapping" },
        { label: t("Photogrammetry", "Фотограметрия"), to: "/mapping" },
        { label: t("Orthophoto", "Ортофото"), to: "/mapping" },
        { label: t("Progress Monitoring", "Мониторинг на напредъка"), to: "/mapping" },
      ],
    },
    {
      title: "3D",
      links: [
        { label: t("3D for Business", "3D за бизнеса"), to: "/3d" },
        { label: t("Events & Personalization", "Събития и персонализация"), to: "/3d" },
        { label: t("Prototyping", "Прототипиране"), to: "/3d" },
        { label: t("Custom Production", "Индивидуално производство"), to: "/3d" },
      ],
    },
    {
      title: t("Company", "Компания"),
      links: [
        { label: t("Our Work", "Нашата работа"), to: "/work" },
        { label: t("About", "За нас"), to: "/about" },
        { label: t("Contact", "Контакт"), to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          <div>
            <img src={logo.url} alt="AirProPix" className="h-7 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("Capture reality. Turn it into something more.", "Заснемаме реалността. Превръщаме я в нещо повече.")}{" "}
              Photo &amp; Video · Mapping · 3D.
            </p>
            <div className="mt-6 space-y-1 font-mono text-sm">
              <a href="tel:+359892061977" className="block text-foreground/85 hover:text-primary">
                +359 892 061 977
              </a>
              <a href="mailto:contact@airpropix.com" className="block text-foreground/85 hover:text-primary">
                contact@airpropix.com
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.18em] uppercase">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  {s.label}
                </a>
              ))}
            </div>
            <LangSwitch className="mt-6" />
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="eyebrow mb-4">{col.title}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} AirProPix. {t("All rights reserved.", "Всички права запазени.")}</span>
          <span>Capture → Map → Model → Make</span>
        </div>
      </div>
    </footer>
  );
}
