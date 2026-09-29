import { createFileRoute } from "@tanstack/react-router";
import { media } from "@/lib/media";
import { Btn, Container, Figure, Section, SectionHead, ValueItem } from "@/components/site/ui";
import { FinalCta } from "@/components/site/FinalCta";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AirProPix — Visual Production, Drone Data & 3D" },
      {
        name: "description",
        content:
          "AirProPix combines creative visual production, drone technology, spatial data and 3D manufacturing to turn real-world ideas into usable results.",
      },
      { property: "og:title", content: "About AirProPix" },
      {
        property: "og:description",
        content: "A visual and technology company that can capture reality, understand spaces and turn ideas into physical results.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 pb-16 md:pt-44">
        <img src={media.aerialVilla} alt="" className="img-cover absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/90 to-transparent" />
        <Container className="relative">
          <p className="eyebrow mb-6">About</p>
          <h1 className="max-w-4xl font-display text-[2.4rem] leading-[1] font-semibold text-balance md:text-7xl">
            A visual and technology company.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
            AirProPix works across three capabilities — photo &amp; video, mapping, and 3D. They share
            the same idea: capture something real, and turn it into something you can use.
          </p>
        </Container>
      </section>

      <Section tone="base">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <SectionHead
                eyebrow="What we do"
                title="Capture → Map → Model → Make"
                lead="One project can start with a camera and end with a physical object. More often it stops somewhere in between — exactly where it needs to."
              />
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <ValueItem index="01" title="Creative visual production" body="Photography, video and brand content built for how the material will be used." />
                <ValueItem index="02" title="Drone technology" body="Aerial imagery and planned mapping flights over properties, land and sites." />
                <ValueItem index="03" title="Spatial data" body="Photogrammetry outputs: orthophotos, point clouds, terrain and 3D models." />
                <ValueItem index="04" title="3D production" body="Design, prototyping and printing — from a single piece to a production batch." />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Figure src={media.interior1} alt="Interior work" ratio="aspect-3/4" />
              <Figure src={media.pointcloud} alt="Point cloud" ratio="aspect-3/4" />
              <Figure src={media.printBatch} alt="3D production" ratio="aspect-4/3" />
              <Figure src={media.constructionAerial} alt="Aerial documentation" ratio="aspect-4/3" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHead
            eyebrow="How we think"
            title="The result matters more than the equipment."
            lead="We would rather demonstrate a workflow and show its outputs than claim to be the best at something."
          />
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {[
              { t: "Show the output", b: "Every service page exists to show what you actually receive." },
              { t: "Solve the problem", b: "We start from what you need to achieve, not from a service list." },
              { t: "Scale with the project", b: "One shoot, a full development, or an ongoing documentation cycle." },
            ].map((x) => (
              <div key={x.t} className="bg-background p-8">
                <h3 className="font-display text-xl font-semibold">{x.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{x.b}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Btn to="/work">See our work</Btn>
            <Btn to="/contact" variant="outline">
              Start a project
            </Btn>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
