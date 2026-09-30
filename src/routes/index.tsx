import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { media } from "@/lib/media";
import { Btn, Container, Figure, NeedCard, Section, SectionHead } from "@/components/site/ui";
import { FinalCta } from "@/components/site/FinalCta";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AirProPix — Photo & Video · Mapping · 3D" },
      {
        name: "description",
        content:
          "Capture reality. Turn it into something more. AirProPix delivers professional photo and video, drone mapping and spatial data, and custom 3D printing.",
      },
      { property: "og:title", content: "AirProPix — Photo & Video · Mapping · 3D" },
      {
        property: "og:description",
        content:
          "Visual content that gets attention, spatial data that supports decisions, and 3D products that become real objects.",
      },
    ],
  }),
  component: Home,
});

const heroRotation = [media.brandContent, media.aerialVilla, media.videoFrame];

function Hero() {
  const t = useT();
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroRotation.length), 4800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink pt-32 pb-16 md:pt-40 md:pb-24">
      <Container>
        <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="rise">
            <p className="eyebrow mb-6">Photo &amp; Video · Mapping · 3D</p>
            <h1 className="font-display text-[2.6rem] leading-[0.98] font-semibold text-balance md:text-7xl">
              {t("Capture reality.", "Заснемаме реалността.")}
              <span className="block text-primary">{t("Turn it into something more.", "Превръщаме я в нещо повече.")}</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t(
                "From professional visuals to spatial data and 3D solutions — we turn real-world projects into something you can see, understand and use.",
                "От професионално визуално съдържание до пространствени данни и 3D решения — превръщаме реалните проекти в нещо, което можете да видите, разберете и използвате.",
              )}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn to="/contact">{t("Start a project", "Започнете проект")}</Btn>
              <Btn to="/" hash="capabilities" variant="outline">
                {t("Explore our services", "Разгледайте услугите")}
              </Btn>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              <span>Capture</span>
              <span className="text-primary">→</span>
              <span>Map</span>
              <span className="text-primary">→</span>
              <span>Model</span>
              <span className="text-primary">→</span>
              <span>Make</span>
            </div>
          </div>

          <div className="grid grid-cols-6 grid-rows-6 gap-3 md:h-[560px]">
            <div className="relative col-span-4 row-span-4 overflow-hidden border border-border">
              {heroRotation.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt="AirProPix visual work"
                  loading={idx === 0 ? "eager" : "lazy"}
                  className="img-cover absolute inset-0 transition-opacity duration-1000"
                  style={{ opacity: i === idx ? 1 : 0 }}
                />
              ))}
              <span className="absolute bottom-3 left-3 bg-ink/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] uppercase">
                {t("Photo · Drone · Video", "Фото · Дрон · Видео")}
              </span>
            </div>
            <Figure
              src={media.orthophoto}
              alt="Orthophoto output"
              ratio="col-span-2 row-span-2"
              caption="Ortho"
              imgClassName="h-full"
              className="[&_img]:h-full"
            />
            <Figure
              src={media.pointcloud}
              alt="Point cloud reconstruction"
              ratio="col-span-2 row-span-2"
              caption="Point cloud"
              className="[&_img]:h-full"
            />
            <Figure
              src={media.printPart}
              alt="3D printed part"
              ratio="col-span-2 row-span-2"
              caption="3D"
              className="[&_img]:h-full"
            />
            <Figure
              src={media.eventBatch}
              alt="Personalized 3D printed event products"
              ratio="col-span-4 row-span-2"
              className="[&_img]:h-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

type B = [string, string];

const whyBlocks: { title: B; body: B; image: string; to: string }[] = [
  { title: ["01 — Experience", "01 — Опит"], body: ["Professional know-how across visual production, aerial technology, mapping and 3D.", "Професионални знания във визуалната продукция, въздушните технологии, картографирането и 3D."], image: media.brandContent, to: "/photo-video" },
  { title: ["02 — Technology with purpose", "02 — Технология с цел"], body: ["Technology is used to solve a real project need.", "Технологията се използва, за да реши реална нужда на проекта."], image: media.orthophoto, to: "/mapping" },
  { title: ["03 — One team", "03 — Един екип"], body: ["Photo, video, drone, mapping and 3D capabilities under one company.", "Фото, видео, дрон, картографиране и 3D възможности в една компания."], image: media.aerialVilla, to: "/work" },
  { title: ["04 — Result focused", "04 — Фокус върху резултата"], body: ["The goal is not simply to produce files or images, but something useful for the client.", "Целта не е просто да създадем файлове или снимки, а нещо полезно за клиента."], image: media.printPart, to: "/3d" },
];

const needs: { quote: B; answer: B; image: string; to: string }[] = [
  { quote: ["I need professional visuals for my business or brand.", "Нужно ми е професионално визуално съдържание за бизнеса или бранда."], answer: ["Photo & Video", "Фото и видео"], image: media.brandContent, to: "/photo-video" },
  { quote: ["I need to show a project from above.", "Искам да покажа проект от въздуха."], answer: ["Drone Photo & Video", "Дрон фото и видео"], image: media.aerialVilla, to: "/photo-video" },
  { quote: ["I need accurate information about a site.", "Нужна ми е точна информация за терен."], answer: ["Mapping", "Картографиране"], image: media.orthophoto, to: "/mapping" },
  { quote: ["I need to measure, compare or document an area.", "Трябва да измеря, сравня или документирам площ."], answer: ["Mapping", "Картографиране"], image: media.terrainModel, to: "/mapping" },
  { quote: ["I need a 3D model of a real place.", "Нужен ми е 3D модел на реално място."], answer: ["Photogrammetry / 3D Mapping", "Фотограметрия / 3D картографиране"], image: media.pointcloud, to: "/mapping" },
  { quote: ["I need a physical object made from a digital idea.", "Искам физически обект от дигитална идея."], answer: ["3D for Business", "3D за бизнеса"], image: media.cadToObject, to: "/3d" },
  { quote: ["I need personalized products for an event.", "Нужни са ми персонализирани продукти за събитие."], answer: ["3D Events & Personalization", "3D за събития и персонализация"], image: media.eventBatch, to: "/3d" },
  { quote: ["I need my property to stand out.", "Искам имотът ми да се открои."], answer: ["Real Estate Photo & Video", "Фото и видео за имоти"], image: media.interior2, to: "/photo-video" },
];

const capabilities: { kicker: B; title: B; headline: B; body: B; cta: B; images: readonly [string, string, string]; to: string }[] = [
  {
    kicker: ["Capture it.", "Заснемаме."], title: ["Photo & Video", "Фото и видео"],
    headline: ["Professional images. Whatever the subject.", "Професионално визуално съдържание. Независимо от обекта."],
    body: ["Photography and video for spaces, people, products, brands, businesses and events — from the ground and from the air.", "Фотография и видео за пространства, хора, продукти, брандове, бизнеси и събития — от земята и от въздуха."],
    cta: ["Explore Photo & Video", "Разгледайте Фото и видео"],
    images: [media.brandContent, media.videoFrame, media.interior1] as const, to: "/photo-video",
  },
  {
    kicker: ["Understand it.", "Разбираме."], title: ["Mapping", "Картографиране"],
    headline: ["From the air to usable data.", "От въздуха до използваеми данни."],
    body: ["Drone mapping and spatial data for sites, terrain, construction, documentation, measurement and analysis.", "Дрон картографиране и пространствени данни за терени, строителство, документация, измервания и анализ."],
    cta: ["Explore Mapping", "Разгледайте Картографиране"],
    images: [media.orthophoto, media.pointcloud, media.terrainModel] as const, to: "/mapping",
  },
  {
    kicker: ["Create it.", "Създаваме."], title: ["3D", "3D"],
    headline: ["From digital ideas to physical objects.", "От дигитална идея до физически обект."],
    body: ["3D solutions for businesses, prototypes, functional parts, custom production, events and personalized products.", "3D решения за бизнеси, прототипи, функционални детайли, индивидуално производство, събития и персонализирани продукти."],
    cta: ["Explore 3D", "Разгледайте 3D"],
    images: [media.printPart, media.cadToObject, media.eventVariety] as const, to: "/3d",
  },
];

const combos: { label: B; parts: B[]; image: string }[] = [
  { label: ["Real Estate", "Недвижими имоти"], parts: [["Photo", "Фото"], ["Video", "Видео"], ["Drone", "Дрон"]], image: media.interior2 },
  { label: ["Construction", "Строителство"], parts: [["Drone", "Дрон"], ["Mapping", "Картографиране"], ["Documentation", "Документация"]], image: media.constructionAerial },
  { label: ["Property Development", "Инвестиционни проекти"], parts: [["Photo", "Фото"], ["Drone", "Дрон"], ["Mapping", "Картографиране"]], image: media.terrainModel },
  { label: ["Event", "Събитие"], parts: [["Photo", "Фото"], ["Video", "Видео"], ["Drone", "Дрон"], ["3D Personalization", "3D персонализация"]], image: media.eventBatch },
  { label: ["Business", "Бизнес"], parts: [["Photo", "Фото"], ["Video", "Видео"], ["3D Products", "3D продукти"]], image: media.printBatch },
];

const benefits: B[] = [
  ["Stronger first impression", "По-силно първо впечатление"],
  ["Clearer presentation", "По-ясно представяне"],
  ["Better communication", "По-добра комуникация"],
  ["Stronger brand presence", "По-силно присъствие на бранда"],
  ["More engaging content", "По-ангажиращо съдържание"],
  ["Better understanding of space and scale", "По-добро разбиране на пространство и мащаб"],
];

const process: { n: string; title: B; body: B }[] = [
  { n: "01", title: ["Tell us what you need", "Кажете ни от какво имате нужда"], body: ["A property, a site, an idea or a problem — a short brief is enough to start.", "Имот, терен, идея или проблем — кратко описание е достатъчно за начало."] },
  { n: "02", title: ["We understand the project", "Разбираме проекта"], body: ["We look at the location, requirements, constraints and desired result.", "Разглеждаме локацията, изискванията, ограниченията и желания резултат."] },
  { n: "03", title: ["We choose the right approach", "Избираме правилния подход"], body: ["Camera, drone, mapping, photogrammetry, 3D design, production or a combination.", "Камера, дрон, картографиране, фотограметрия, 3D дизайн, производство или комбинация."] },
  { n: "04", title: ["We create the result", "Създаваме резултата"], body: ["Capture, processing, editing, modelling and production.", "Заснемане, обработка, монтаж, моделиране и производство."] },
  { n: "05", title: ["You receive something useful", "Получавате нещо полезно"], body: ["Files, data, visual content or physical objects you can actually use.", "Файлове, данни, визуално съдържание или физически обекти, които реално можете да използвате."] },
];

function Home() {
  const t = useT();
  const tt = (b: B) => t(b[0], b[1]);
  return (
    <>
      <Hero />

      {/* THREE DIVISIONS */}
      <Section id="capabilities" tone="base">
        <Container>
          <SectionHead
            eyebrow={t("Three capabilities. One company.", "Три възможности. Една компания.")}
            title={t("Photo & Video · Mapping · 3D", "Фото и видео · Картографиране · 3D")}
            lead={t(
              "Each capability works on its own. Together they cover the whole path from a real place to a finished, usable result.",
              "Всяка възможност работи самостоятелно. Заедно покриват целия път от реалното място до завършен, полезен резултат.",
            )}
          />
          <div className="mt-16 space-y-20">
            {capabilities.map((c, idx) => (
              <div key={c.to} className={`grid items-center gap-8 lg:grid-cols-[1fr_1.35fr] ${idx % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <p className="eyebrow mb-4">0{idx + 1} · {tt(c.kicker)} {tt(c.title)}</p>
                  <h3 className="font-display text-3xl leading-[1.05] font-semibold text-balance md:text-5xl">{tt(c.headline)}</h3>
                  <p className="mt-5 max-w-md text-muted-foreground">{tt(c.body)}</p>
                  <Btn to={c.to} variant="ghost" className="mt-6 px-0">{tt(c.cta)} →</Btn>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <Figure src={c.images[0]} alt={tt(c.title)} ratio="col-span-2 aspect-3/4" />
                  <div className="col-span-2 grid gap-3">
                    <Figure src={c.images[1]} alt={tt(c.title)} ratio="aspect-4/3" />
                    <Figure src={c.images[2]} alt={tt(c.title)} ratio="aspect-4/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-20 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
            {[["Capture", "Заснемане"], ["Map", "Картографиране"], ["Model", "Моделиране"], ["Make", "Създаване"]].map((s, idx) => (
              <div key={s[0]} className="bg-background p-8">
                <span className="font-mono text-xs text-primary">0{idx + 1}</span>
                <p className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide">{t(s[0], s[1])}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHY AIRPROPIX */}
      <Section tone="surface">
        <Container>
          <SectionHead
            eyebrow={t("Why AirProPix", "Защо AirProPix")}
            title={t("Not just equipment. A complete result.", "Не просто техника. Цялостен резултат.")}
            lead={t(
              "Anyone can show you a camera, a drone or a 3D printer. The difference is what you can do with the result.",
              "Всеки може да покаже камера, дрон или 3D принтер. Разликата е в това какво можете да направите с крайния резултат.",
            )}
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {whyBlocks.map((b) => (
              <Link key={b.title[0]} to={b.to} className="group relative block h-[420px] overflow-hidden border border-border transition-colors duration-500 hover:border-primary/60">
                <img src={b.image} alt={tt(b.title)} loading="lazy" className="img-cover absolute inset-0 scale-105 opacity-60 transition-all duration-700 group-hover:scale-100 group-hover:opacity-90" />
                <div className="scrim" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{tt(b.title)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">{tt(b.body)}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* NEEDS */}
      <Section tone="base">
        <Container>
          <SectionHead
            eyebrow={t("Start from the problem", "Започнете от задачата")}
            title={t("What are you trying to achieve?", "Какво искате да постигнете?")}
            lead={t(
              "Skip the terminology. Pick the sentence that sounds like your project and we will point you to the right capability.",
              "Без термини. Изберете изречението, което звучи като Вашия проект, и ще Ви насочим към правилната услуга.",
            )}
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {needs.map((n) => (
              <NeedCard key={n.quote[0]} quote={tt(n.quote)} answer={tt(n.answer)} image={n.image} to={n.to} />
            ))}
          </div>
        </Container>
      </Section>

      {/* VISUAL VALUE */}
      <Section tone="ink">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div className="grid grid-cols-5 gap-3">
              <Figure src={media.videoFrame} alt={t("Video production frame", "Кадър от видео продукция")} ratio="col-span-3 aspect-4/5" />
              <div className="col-span-2 grid gap-3">
                <Figure src={media.interior1} alt={t("Interior photography", "Интериорна фотография")} ratio="aspect-3/4" />
                <Figure src={media.tour3d} alt={t("3D tour", "3D тур")} ratio="aspect-square" />
              </div>
            </div>
            <div>
              <SectionHead
                eyebrow="Photo & Video"
                title={t("Good visuals change how people see the project.", "Доброто визуално съдържание променя начина, по който хората виждат проекта.")}
              />
              <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">
                {benefits.map((b, i) => (
                  <li key={b[0]} className="bg-ink p-5">
                    <span className="font-mono text-xs text-primary">0{i + 1}</span>
                    <p className="mt-2 font-display text-base font-semibold">{tt(b)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* COMBINATIONS */}
      <Section tone="base">
        <Container>
          <SectionHead
            eyebrow={t("Combined capabilities", "Комбинирани възможности")}
            title={t("One project. Multiple capabilities.", "Един проект. Няколко възможности.")}
            lead={t(
              "Each service works independently — the advantage is having them under one professional team.",
              "Всяка услуга работи самостоятелно — предимството е, че са в един професионален екип.",
            )}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {combos.map((c) => (
              <div key={c.label[0]} className="group relative overflow-hidden border border-border">
                <div className="relative aspect-4/5 overflow-hidden">
                  <img src={c.image} alt={tt(c.label)} loading="lazy" className="img-cover opacity-55 transition-all duration-700 group-hover:scale-105 group-hover:opacity-85" />
                  <div className="scrim" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide">{tt(c.label)}</h3>
                    <ul className="mt-3 space-y-1">
                      {c.parts.map((p) => (
                        <li key={p[0]} className="font-mono text-[11px] tracking-[0.12em] text-primary uppercase">+ {tt(p)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* WORK PREVIEW */}
      <Section tone="surface">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow={t("Selected work", "Избрани проекти")} title={t("See the difference.", "Вижте разликата.")} className="max-w-xl" />
            <Btn to="/work" variant="outline">{t("See more work", "Още проекти")}</Btn>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Figure src={media.brandContent} alt={t("Brand content", "Бранд съдържание")} ratio="aspect-3/4 md:row-span-2 md:aspect-auto md:h-full" caption={t("Photo · Brand content", "Фото · Бранд съдържание")} />
            <Figure src={media.aerialVilla} alt={t("Aerial photography", "Въздушна фотография")} ratio="aspect-4/3 md:col-span-2" caption={t("Drone · Aerial", "Дрон · От въздуха")} />
            <Figure src={media.printBatch} alt={t("3D printed batch", "3D отпечатана серия")} ratio="aspect-4/3" caption={t("3D · Small series", "3D · Малка серия")} />
            <Figure src={media.orthophoto} alt={t("Orthophoto", "Ортофото")} ratio="aspect-4/3" caption={t("Mapping · Orthophoto", "Картографиране · Ортофото")} />
            <Figure src={media.interior1} alt={t("Interior photography", "Интериорна фотография")} ratio="aspect-4/3" caption={t("Photo · Interiors", "Фото · Интериори")} />
            <Figure src={media.constructionAerial} alt={t("Construction progress", "Строителен напредък")} ratio="aspect-4/3" caption={t("Mapping · Progress", "Картографиране · Напредък")} />
          </div>
        </Container>
      </Section>

      {/* PROCESS */}
      <Section tone="base">
        <Container>
          <SectionHead eyebrow={t("Process", "Процес")} title={t("How a project runs.", "Как протича един проект.")} />
          <div className="no-scrollbar mt-12 flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible">
            {process.map((s) => (
              <div key={s.n} className="w-[75vw] shrink-0 snap-start border border-border bg-surface p-7 transition-colors hover:border-primary/50 sm:w-[46vw] md:w-auto">
                <span className="font-mono text-sm text-primary">{s.n}</span>
                <h3 className="mt-4 font-display text-lg font-semibold">{tt(s.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tt(s.body)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
