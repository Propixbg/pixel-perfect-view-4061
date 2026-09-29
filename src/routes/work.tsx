import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { media } from "@/lib/media";
import { Container, Section, SectionHead } from "@/components/site/ui";
import { FinalCta } from "@/components/site/FinalCta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Our Work — Photo, Drone, Mapping & 3D Projects | AirProPix" },
      {
        name: "description",
        content:
          "Selected AirProPix projects: property and drone photography, cinematic video, orthophotos and 3D reconstructions, custom and personalized 3D printing.",
      },
      { property: "og:title", content: "Our Work | AirProPix" },
      { property: "og:description", content: "Projects across photo & video, mapping and 3D production." },
    ],
  }),
  component: Work,
});

type Cat = "All" | "Photo & Video" | "Mapping" | "3D";

const items: {
  title: string;
  cat: Exclude<Cat, "All">;
  service: string;
  image: string;
  span: string;
}[] = [
  { title: "Hillside residence", cat: "Photo & Video", service: "Photo · Drone · Video", image: media.aerialVilla, span: "md:col-span-2 md:row-span-2" },
  { title: "City penthouse", cat: "Photo & Video", service: "Interior photography", image: media.interior1, span: "md:row-span-2" },
  { title: "Riverside development", cat: "Mapping", service: "Orthophoto · Measurements", image: media.orthophoto, span: "md:col-span-2" },
  { title: "Event keepsakes", cat: "3D", service: "Personalized batch · 35 pcs", image: media.printBatch, span: "" },
  { title: "Estate reconstruction", cat: "Mapping", service: "Point cloud · 3D model", image: media.pointcloud, span: "md:col-span-2" },
  { title: "Evening exterior film", cat: "Photo & Video", service: "Cinematic video", image: media.videoFrame, span: "md:col-span-2" },
  { title: "Bracket prototype", cat: "3D", service: "CAD → functional part", image: media.cadToObject, span: "md:col-span-2" },
  { title: "Wedding table set", cat: "3D", service: "Table numbers · Place cards", image: media.eventBatch, span: "" },
  { title: "Terrain study", cat: "Mapping", service: "DTM · Contours", image: media.terrainModel, span: "" },
  { title: "Showroom brand set", cat: "Photo & Video", service: "Brand photography", image: media.brandContent, span: "md:col-span-2" },
  { title: "Two-bedroom apartment", cat: "Photo & Video", service: "Floor plan · 3D tour", image: media.tour3d, span: "" },
  { title: "Construction progress", cat: "Mapping", service: "Monthly aerial documentation", image: media.constructionAerial, span: "md:col-span-2" },
  { title: "Family home", cat: "Photo & Video", service: "Interior detail set", image: media.interior2, span: "md:row-span-2" },
  { title: "Custom components", cat: "3D", service: "Small production run", image: media.printPart, span: "" },
  { title: "Personalized gifts", cat: "3D", service: "Corporate & event products", image: media.eventVariety, span: "md:col-span-2" },
];

const cats: Cat[] = ["All", "Photo & Video", "Mapping", "3D"];

function Work() {
  const [cat, setCat] = useState<Cat>("All");
  const filtered = useMemo(() => (cat === "All" ? items : items.filter((i) => i.cat === cat)), [cat]);

  return (
    <>
      <section className="bg-ink pt-36 pb-12 md:pt-44">
        <Container>
          <p className="eyebrow mb-6">Our work</p>
          <h1 className="max-w-3xl font-display text-[2.4rem] leading-[1] font-semibold text-balance md:text-7xl">
            Projects, outputs and finished objects.
          </h1>
          <div className="mt-10 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={cn(
                  "border px-5 py-2.5 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors",
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/60 hover:text-primary",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <Section tone="base" className="pt-10">
        <Container>
          <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {filtered.map((it) => (
              <figure
                key={it.title}
                className={cn("group relative overflow-hidden border border-border", it.span)}
              >
                <img
                  src={it.image}
                  alt={it.title}
                  loading="lazy"
                  className="img-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-ink via-ink/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="eyebrow">{it.cat}</span>
                  <span className="mt-1 font-display text-lg font-semibold">{it.title}</span>
                  <span className="mt-1 text-sm text-muted-foreground">{it.service}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHead eyebrow="Case studies" title="The challenge, the work, the result." />
          <div className="mt-12 space-y-4">
            {[
              {
                title: "Aerial mapping",
                challenge: "A large site needed accurate documentation without a full manual survey.",
                did: "Planned drone capture, photogrammetric processing, quality control.",
                result: "Orthophoto, 3D model and a measurement set for planning.",
                image: media.orthophoto,
              },
              {
                title: "Real estate",
                challenge: "The property needed a stronger presentation than standard listing photos.",
                did: "Interior and exterior photography, drone imagery, cinematic video, floor plan.",
                result: "A complete marketing package used across portal, social and print.",
                image: media.interior1,
              },
              {
                title: "3D production",
                challenge: "An event needed personalized products that do not exist as stock items.",
                did: "Design adaptation, test print, batch production and finishing.",
                result: "A finished batch of identical personalized objects delivered on schedule.",
                image: media.printBatch,
              },
            ].map((c) => (
              <div key={c.title} className="grid gap-px border border-border bg-border md:grid-cols-[1fr_1.4fr]">
                <img src={c.image} alt={c.title} loading="lazy" className="img-cover min-h-[220px]" />
                <div className="grid gap-6 bg-background p-8 sm:grid-cols-3">
                  <div className="sm:col-span-3">
                    <h3 className="font-display text-2xl font-semibold">{c.title}</h3>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">The challenge</p>
                    <p className="text-sm text-muted-foreground">{c.challenge}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">What we did</p>
                    <p className="text-sm text-muted-foreground">{c.did}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">The result</p>
                    <p className="text-sm text-muted-foreground">{c.result}</p>
                  </div>
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
