import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { media } from "@/lib/media";
import { Btn, Container, Figure, NeedCard, Section, SectionHead, ValueItem } from "@/components/site/ui";
import { FinalCta } from "@/components/site/FinalCta";

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

const heroRotation = [media.interior1, media.aerialVilla, media.videoFrame];

function Hero() {
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
              Capture reality.
              <span className="block text-primary">Turn it into something more.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              From visual content that gets attention, to spatial data that helps you make decisions,
              to 3D products that become real objects — AirProPix turns real-world ideas into useful
              results.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn to="/contact">Start a project</Btn>
              <Btn to="/" hash="capabilities" variant="outline">
                Explore what we do
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
                Photo · Drone · Video
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

const whyBlocks = [
  {
    title: "Show it better",
    body: "Professional visual content designed to make places, products and projects stand out.",
    image: media.interior1,
    to: "/photo-video",
  },
  {
    title: "Understand it better",
    body: "Mapping and spatial data that turn real environments into information you can work with.",
    image: media.orthophoto,
    to: "/mapping",
  },
  {
    title: "Create it",
    body: "3D printing that turns ideas, models and custom designs into physical objects.",
    image: media.printPart,
    to: "/3d",
  },
  {
    title: "One team",
    body: "Photography, video, drone, mapping and 3D capabilities under one brand.",
    image: media.aerialVilla,
    to: "/work",
  },
];

const needs = [
  { quote: "I need my property to look better.", answer: "Photo & Video", image: media.interior2, to: "/photo-video" },
  { quote: "I need to show a project from above.", answer: "Drone Photography / Video", image: media.aerialVilla, to: "/photo-video" },
  { quote: "I need accurate information about a site.", answer: "Mapping", image: media.orthophoto, to: "/mapping" },
  { quote: "I need to measure, compare or document an area.", answer: "Mapping", image: media.terrainModel, to: "/mapping" },
  { quote: "I need a 3D model of a real place.", answer: "Photogrammetry / 3D Mapping", image: media.pointcloud, to: "/mapping" },
  { quote: "I need a physical object made from a digital idea.", answer: "3D Printing", image: media.cadToObject, to: "/3d" },
  { quote: "I need personalized products for an event.", answer: "3D Events & Personalization", image: media.eventBatch, to: "/3d" },
];

const capabilities = [
  {
    kicker: "Capture it.",
    title: "Photo & Video",
    body: "Property, drone, cinematic video, brand content and 3D tours — a complete visual package rather than a set of files.",
    images: [media.interior1, media.videoFrame, media.brandContent] as const,
    to: "/photo-video",
  },
  {
    kicker: "Understand it.",
    title: "Mapping",
    body: "Orthophotos, point clouds, terrain models, 3D reconstructions and measurements from a single drone capture.",
    images: [media.orthophoto, media.pointcloud, media.terrainModel] as const,
    to: "/mapping",
  },
  {
    kicker: "Create it.",
    title: "3D",
    body: "Prototypes, functional parts and personalized event products — from one piece to a production batch.",
    images: [media.printPart, media.printBatch, media.eventVariety] as const,
    to: "/3d",
  },
];

const combos = [
  { label: "Property", parts: ["Photo", "Drone", "Video", "Mapping"], image: media.interior2 },
  { label: "Construction", parts: ["Drone", "Mapping", "Progress documentation"], image: media.constructionAerial },
  { label: "Development", parts: ["Mapping", "3D model", "Documentation"], image: media.pointcloud },
  { label: "Event", parts: ["Photo", "Video", "Drone", "Personalized 3D"], image: media.eventBatch },
  { label: "Business", parts: ["Brand photography", "Video", "3D products"], image: media.brandContent },
];

const whyUs = [
  { title: "We think about the result", body: "Not just the process. The deliverable has to be useful once we leave the site." },
  { title: "We show you what is possible", body: "Through real visual examples, outputs and comparisons instead of claims." },
  { title: "We combine creative and technical skills", body: "Visual content, drone technology, mapping and 3D production in one team." },
  { title: "We build a solution around the project", body: "Not every project needs the same approach, capture plan or output." },
  { title: "We deliver something you can use", body: "Images, videos, maps, models, measurements or physical products." },
  { title: "We can scale with the project", body: "From one photo shoot to a larger technical or production requirement." },
];

const process = [
  { n: "01", title: "Tell us what you need", body: "A property, a site, an idea or a problem — a short brief is enough to start." },
  { n: "02", title: "We understand the project", body: "We look at the location, the constraints and what the result has to do." },
  { n: "03", title: "We choose the right approach", body: "Camera, drone, mapping flight, photogrammetry, 3D design or a combination." },
  { n: "04", title: "We create the result", body: "Capture, processing, editing, modelling and production." },
  { n: "05", title: "You receive something useful", body: "Files, data or physical objects you can put to work immediately." },
];

function Home() {
  return (
    <>
      <Hero />

      {/* WHY AIRPROPIX */}
      <Section tone="base">
        <Container>
          <SectionHead
            eyebrow="Why AirProPix"
            title="Not just equipment. A complete result."
            lead="Anyone can show you a drone, a camera or a 3D printer. The difference is what you can do with the result."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {whyBlocks.map((b) => (
              <Link
                key={b.title}
                to={b.to}
                className="group relative block h-[420px] overflow-hidden border border-border transition-colors duration-500 hover:border-primary/60"
              >
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  className="img-cover absolute inset-0 scale-105 opacity-60 transition-all duration-700 group-hover:scale-100 group-hover:opacity-90"
                />
                <div className="scrim" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">{b.body}</p>
                  <span className="eyebrow mt-4 inline-flex items-center gap-2">
                    <span className="h-px w-6 bg-primary transition-all duration-300 group-hover:w-10" /> View
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* NEEDS */}
      <Section tone="surface">
        <Container>
          <SectionHead
            eyebrow="Start from the problem"
            title="What are you trying to achieve?"
            lead="Skip the terminology. Pick the sentence that sounds like your project and we will point you to the right capability."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {needs.map((n) => (
              <NeedCard key={n.quote} {...n} />
            ))}
          </div>
        </Container>
      </Section>

      {/* CAPABILITIES */}
      <Section id="capabilities" tone="base">
        <Container>
          <SectionHead
            eyebrow="One company"
            title={
              <>
                One company. Multiple ways to turn
                <br className="hidden md:block" /> reality into results.
              </>
            }
            lead="Each capability works on its own. Together they cover the whole path from a real place to a finished, usable output."
          />

          <div className="mt-16 space-y-20">
            {capabilities.map((c, idx) => (
              <div
                key={c.title}
                className={`grid items-center gap-8 lg:grid-cols-[1fr_1.35fr] ${idx % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <p className="eyebrow mb-4">{c.kicker}</p>
                  <h3 className="font-display text-3xl font-semibold md:text-5xl">{c.title}</h3>
                  <p className="mt-5 max-w-md text-muted-foreground">{c.body}</p>
                  <Btn to={c.to} variant="ghost" className="mt-6 px-0">
                    Explore {c.title} →
                  </Btn>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <Figure src={c.images[0]} alt={c.title} ratio="col-span-2 aspect-3/4" />
                  <div className="col-span-2 grid gap-3">
                    <Figure src={c.images[1]} alt={c.title} ratio="aspect-4/3" />
                    <Figure src={c.images[2]} alt={c.title} ratio="aspect-4/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
            {["Capture", "Understand", "Model", "Make"].map((step, idx) => (
              <div key={step} className="bg-background p-8">
                <span className="font-mono text-xs text-primary">0{idx + 1}</span>
                <p className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide">{step}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* COMBINATIONS */}
      <Section tone="ink">
        <Container>
          <SectionHead
            eyebrow="Combination use cases"
            title="Most projects need more than one capability."
            lead="These services work independently — but they were built to be combined."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {combos.map((c) => (
              <div key={c.label} className="group relative overflow-hidden border border-border">
                <div className="relative aspect-4/5 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.label}
                    loading="lazy"
                    className="img-cover opacity-55 transition-all duration-700 group-hover:scale-105 group-hover:opacity-85"
                  />
                  <div className="scrim" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide">{c.label}</h3>
                    <ul className="mt-3 space-y-1">
                      {c.parts.map((p) => (
                        <li key={p} className="font-mono text-[11px] tracking-[0.12em] text-primary uppercase">
                          + {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHY US */}
      <Section tone="base">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <SectionHead
                eyebrow="Why us"
                title="Because the result matters more than the equipment."
                lead="We would rather show you outputs than adjectives. Here is how we actually work."
              />
              <div className="mt-10 grid grid-cols-2 gap-3">
                <Figure src={media.videoFrame} alt="Cinematic property frame" ratio="aspect-4/3" />
                <Figure src={media.terrainModel} alt="Terrain model" ratio="aspect-4/3" />
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {whyUs.map((w, idx) => (
                <ValueItem key={w.title} index={`0${idx + 1}`} title={w.title} body={w.body} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* WORK PREVIEW */}
      <Section tone="surface">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Selected work" title="See the difference." className="max-w-xl" />
            <Btn to="/work" variant="outline">
              See more work
            </Btn>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Figure src={media.interior1} alt="Interior photography" ratio="aspect-3/4 md:row-span-2 md:aspect-auto md:h-full" caption="Interior · Sofia" />
            <Figure src={media.aerialVilla} alt="Aerial property" ratio="aspect-4/3 md:col-span-2" caption="Aerial · Coastal villa" />
            <Figure src={media.printBatch} alt="3D printed batch" ratio="aspect-4/3" caption="3D · Event batch" />
            <Figure src={media.orthophoto} alt="Orthophoto" ratio="aspect-4/3" caption="Mapping · Orthophoto" />
            <Figure src={media.tour3d} alt="3D tour" ratio="aspect-4/3" caption="3D tour · Floor plan" />
            <Figure src={media.constructionAerial} alt="Construction progress" ratio="aspect-4/3" caption="Mapping · Progress" />
          </div>
        </Container>
      </Section>

      {/* PROCESS */}
      <Section tone="base">
        <Container>
          <SectionHead eyebrow="Process" title="How a project runs." />
          <div className="no-scrollbar mt-12 flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible">
            {process.map((s) => (
              <div
                key={s.n}
                className="w-[75vw] shrink-0 snap-start border border-border bg-surface p-7 transition-colors hover:border-primary/50 sm:w-[46vw] md:w-auto"
              >
                <span className="font-mono text-sm text-primary">{s.n}</span>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
