import { createFileRoute } from "@tanstack/react-router";
import { media } from "@/lib/media";
import { Btn, Container, Figure, NeedCard, Section, SectionHead, ValueItem } from "@/components/site/ui";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { FinalCta } from "@/components/site/FinalCta";

export const Route = createFileRoute("/mapping")({
  head: () => ({
    meta: [
      { title: "Drone Mapping, Photogrammetry & Orthophoto | AirProPix" },
      {
        name: "description",
        content:
          "Drone mapping turns real environments into measurable digital information: orthophotos, point clouds, terrain models, 3D reconstructions and measurements.",
      },
      { property: "og:title", content: "Mapping | AirProPix" },
      {
        property: "og:description",
        content: "Don't just look at the site. Understand it — with orthophotos, point clouds and 3D reconstructions.",
      },
    ],
  }),
  component: Mapping,
});

const pipeline = [
  { label: "Drone imagery", image: media.aerialVilla, note: "Planned overlapping capture" },
  { label: "Orthophoto", image: media.orthophoto, note: "Georeferenced, measurable mosaic" },
  { label: "Point cloud", image: media.pointcloud, note: "Dense spatial reconstruction" },
  { label: "3D model", image: media.terrainModel, note: "Terrain and surface models" },
];

const problems = [
  { quote: "I need an accurate overview of a large site.", answer: "Drone mapping", image: media.constructionAerial, to: "/contact" },
  { quote: "I need to document the current condition.", answer: "Orthophoto / aerial documentation", image: media.orthophoto, to: "/contact" },
  { quote: "I need to compare progress over time.", answer: "Construction progress monitoring", image: media.aerialVilla, to: "/contact" },
  { quote: "I need measurements without manually surveying everything.", answer: "Photogrammetry / measurements", image: media.terrainModel, to: "/contact" },
  { quote: "I need a 3D representation of a real environment.", answer: "3D reconstruction", image: media.pointcloud, to: "/contact" },
  { quote: "I need usable spatial data for planning.", answer: "Mapping outputs", image: media.tour3d, to: "/contact" },
];

const values = [
  { title: "From flight to data", body: "We don't stop at aerial images. The goal is a usable result." },
  { title: "Real-world outputs", body: "Orthophotos, point clouds, terrain models, 3D reconstructions and measurements." },
  { title: "Visual + technical", body: "We combine visual expertise with spatial data." },
  { title: "Documentation", body: "Useful for construction, property, terrain and project documentation." },
  { title: "One project, multiple outputs", body: "One capture can produce multiple useful datasets." },
];

const steps = [
  { n: "01", title: "Plan", body: "Flight planning", image: media.terrainModel },
  { n: "02", title: "Capture", body: "Drone imagery", image: media.aerialVilla },
  { n: "03", title: "Process", body: "Photogrammetry", image: media.pointcloud },
  { n: "04", title: "Model", body: "Orthophoto / point cloud / 3D model", image: media.orthophoto },
  { n: "05", title: "Deliver", body: "Usable project data", image: media.constructionAerial },
];

const cases = [
  { title: "Construction progress", capture: media.constructionAerial, result: media.orthophoto, output: "Monthly orthophoto set + comparison" },
  { title: "Land & terrain", capture: media.aerialVilla, result: media.terrainModel, output: "Terrain model + contours" },
  { title: "Large property", capture: media.aerialVilla, result: media.orthophoto, output: "Site plan + boundaries" },
  { title: "Infrastructure", capture: media.constructionAerial, result: media.pointcloud, output: "Point cloud + sections" },
  { title: "Site documentation", capture: media.orthophoto, result: media.constructionAerial, output: "Dated condition record" },
  { title: "3D reconstruction", capture: media.aerialVilla, result: media.pointcloud, output: "Textured 3D model" },
];

function Mapping() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 pb-16 md:pt-44">
        <img src={media.pointcloud} alt="" className="img-cover absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/88 to-transparent" />
        <Container className="relative">
          <p className="eyebrow mb-6">Mapping</p>
          <h1 className="max-w-4xl font-display text-[2.4rem] leading-[1] font-semibold text-balance md:text-7xl">
            Don’t just look at the site. Understand it.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground md:text-lg">
            Drone mapping turns real environments into measurable digital information.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn to="/contact">Discuss a site</Btn>
            <Btn to="/mapping" hash="pipeline" variant="outline">
              See the outputs
            </Btn>
          </div>
        </Container>
      </section>

      {/* PIPELINE */}
      <Section id="pipeline" tone="base">
        <Container>
          <SectionHead
            eyebrow="From capture to data"
            title="One flight. Several usable outputs."
            lead="The same capture becomes an orthophoto, a point cloud, a terrain model and a set of measurements."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {pipeline.map((p, idx) => (
              <div key={p.label} className="relative">
                <Figure src={p.image} alt={p.label} ratio="aspect-4/3" />
                <div className="mt-4">
                  <span className="font-mono text-xs text-primary">0{idx + 1}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold uppercase tracking-wide">{p.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
                </div>
                {idx < pipeline.length - 1 ? (
                  <span className="absolute top-1/3 -right-3 hidden text-primary md:block">→</span>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <BeforeAfter
              before={media.aerialVilla}
              after={media.orthophoto}
              beforeLabel="Aerial capture"
              afterLabel="Processed orthophoto"
            />
            <div>
              <h3 className="font-display text-2xl font-semibold md:text-3xl">
                An aerial photo shows the site. An orthophoto lets you measure it.
              </h3>
              <p className="mt-4 text-muted-foreground">
                Processed imagery is georeferenced and distortion-corrected, so distances, areas and
                positions can be read directly from it.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* PROBLEMS */}
      <Section id="problems" tone="surface">
        <Container>
          <SectionHead
            eyebrow="Problem → output"
            title="What can mapping actually help you solve?"
            lead="The value is in the decision it supports, not in the technology behind it."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {problems.map((p) => (
              <NeedCard key={p.quote} {...p} />
            ))}
          </div>
        </Container>
      </Section>

      {/* WHY */}
      <Section tone="base">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <SectionHead eyebrow="Why AirProPix" title="Why use AirProPix for mapping?" />
              <div className="mt-10">
                <Figure src={media.terrainModel} alt="Terrain analysis" ratio="aspect-4/3" caption="Terrain model · elevation" />
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {values.map((v, i) => (
                <ValueItem key={v.title} index={`0${i + 1}`} title={v.title} body={v.body} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* PROCESS */}
      <Section tone="ink">
        <Container>
          <SectionHead eyebrow="Process" title="Plan · Capture · Process · Model · Deliver" />
          <div className="no-scrollbar mt-12 flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible">
            {steps.map((s) => (
              <div key={s.n} className="w-[72vw] shrink-0 snap-start border border-border sm:w-[44vw] md:w-auto">
                <Figure src={s.image} alt={s.title} ratio="aspect-4/3" className="border-0" />
                <div className="p-5">
                  <span className="font-mono text-xs text-primary">{s.n}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold uppercase tracking-wide">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Btn to="/contact">Tell us what you need to measure, document or understand</Btn>
          </div>
        </Container>
      </Section>

      {/* CASES */}
      <Section id="cases" tone="base">
        <Container>
          <SectionHead eyebrow="Case studies" title="Capture in. Result out." />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cases.map((c) => (
              <div key={c.title} className="border border-border bg-surface">
                <div className="grid grid-cols-2 gap-px bg-border">
                  <Figure src={c.capture} alt={`${c.title} capture`} ratio="aspect-4/3" className="border-0" caption="Capture" />
                  <Figure src={c.result} alt={`${c.title} result`} ratio="aspect-4/3" className="border-0" caption="Result" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Output: {c.output}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
