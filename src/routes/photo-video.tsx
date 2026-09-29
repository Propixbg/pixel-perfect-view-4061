import { createFileRoute } from "@tanstack/react-router";
import { media } from "@/lib/media";
import { Btn, Container, Figure, Section, SectionHead, ValueItem } from "@/components/site/ui";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { FinalCta } from "@/components/site/FinalCta";

export const Route = createFileRoute("/photo-video")({
  head: () => ({
    meta: [
      { title: "Photo & Video — Real Estate, Drone & Brand Content | AirProPix" },
      {
        name: "description",
        content:
          "Property photography, drone imagery, cinematic video, brand content and 3D tours. AirProPix builds complete visual packages, not single images.",
      },
      { property: "og:title", content: "Photo & Video | AirProPix" },
      {
        property: "og:description",
        content: "Great visuals change how people perceive a property, product or event. See the work.",
      },
    ],
  }),
  component: PhotoVideo,
});

const categories = [
  {
    title: "Property photography",
    items: ["Interiors", "Exteriors", "Architectural details", "Lifestyle compositions", "Luxury properties"],
  },
  {
    title: "Drone photography",
    items: ["Aerial property views", "Land", "Architecture", "Surroundings", "Large-scale environments"],
  },
  {
    title: "Video",
    items: ["Cinematic property videos", "Social media content", "Promotional videos", "Event footage", "Drone video"],
  },
  {
    title: "Branding content",
    items: ["Business locations", "Products", "Spaces", "Personal branding", "Promotional content"],
  },
  {
    title: "3D tours & visualization",
    items: ["Virtual tours", "Floor plans", "Spatial visualization"],
  },
];

const without = [
  "Properties look ordinary",
  "Listings blend into the competition",
  "People scroll past",
  "The space does not communicate its real value",
  "The first impression is lost",
];

const withPro = [
  "The property gets attention",
  "The space becomes easier to understand",
  "Listings look more premium",
  "Marketing becomes stronger",
  "The brand looks more professional",
];

const projects = [
  { title: "Hillside residence", location: "Coastal", services: "Photo · Drone · Video", image: media.aerialVilla },
  { title: "City penthouse", location: "Sofia", services: "Interior photo · 3D tour", image: media.interior1 },
  { title: "Evening exterior film", location: "Black Sea", services: "Cinematic video", image: media.videoFrame },
  { title: "Showroom brand set", location: "Sofia", services: "Brand photography", image: media.brandContent },
  { title: "Two-bedroom apartment", location: "Sofia", services: "Floor plan · 3D tour", image: media.tour3d },
  { title: "Family home", location: "Plovdiv", services: "Photo · Detail set", image: media.interior2 },
];

function PhotoVideo() {
  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden bg-ink pt-36 pb-16 md:pt-44">
        <img src={media.interior1} alt="" className="img-cover absolute inset-0 opacity-35" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-transparent" />
        <Container className="relative">
          <p className="eyebrow mb-6">Photo &amp; Video</p>
          <h1 className="max-w-4xl font-display text-[2.4rem] leading-[1] font-semibold text-balance md:text-7xl">
            Make your story impossible to ignore.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground md:text-lg">
            Great visuals do more than document a property, product or event. They change how people
            perceive it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn to="/contact">Start a project</Btn>
            <Btn to="/photo-video" hash="gallery" variant="outline">
              See the work
            </Btn>
          </div>
        </Container>
      </section>

      {/* GALLERY */}
      <Section id="gallery" tone="base">
        <Container>
          <SectionHead eyebrow="What we shoot" title="Five visual categories, one consistent standard." />
          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <Figure src={media.interior1} alt="Interior photography" ratio="aspect-3/4 lg:col-span-4" caption="Interiors" />
            <div className="grid gap-4 lg:col-span-5">
              <Figure src={media.aerialVilla} alt="Drone photography" ratio="aspect-16/10" caption="Drone" />
              <Figure src={media.videoFrame} alt="Cinematic video" ratio="aspect-16/10" caption="Video frame" />
            </div>
            <Figure src={media.interior2} alt="Architectural detail" ratio="aspect-3/4 lg:col-span-3" caption="Detail" />
            <Figure src={media.brandContent} alt="Brand content" ratio="aspect-16/10 lg:col-span-7" caption="Brand content" />
            <Figure src={media.tour3d} alt="3D tour" ratio="aspect-4/3 lg:col-span-5" caption="3D tour · Floor plan" />
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-5">
            {categories.map((c) => (
              <div key={c.title} className="bg-background p-6">
                <h3 className="font-display text-base font-semibold uppercase tracking-wide">{c.title}</h3>
                <ul className="mt-4 space-y-1.5">
                  {c.items.map((i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHY */}
      <Section id="why" tone="surface">
        <Container>
          <SectionHead
            eyebrow="Why it matters"
            title={
              <>
                Your photos are not decoration.
                <br className="hidden md:block" /> They are part of the sale.
              </>
            }
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <div className="border border-border bg-background p-8">
              <p className="eyebrow mb-6 !text-muted-foreground">Without good visuals</p>
              <ul className="space-y-4">
                {without.map((w) => (
                  <li key={w} className="flex gap-3 text-muted-foreground">
                    <span className="mt-2 h-px w-5 shrink-0 bg-muted-foreground" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-primary/40 bg-background p-8">
              <p className="eyebrow mb-6">With professional visual content</p>
              <ul className="space-y-4">
                {withPro.map((w) => (
                  <li key={w} className="flex gap-3">
                    <span className="mt-2 h-px w-5 shrink-0 bg-primary" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <BeforeAfter
              before={media.interior2}
              after={media.interior1}
              beforeLabel="Ordinary listing photo"
              afterLabel="AirProPix"
            />
            <div>
              <h3 className="font-display text-2xl font-semibold md:text-3xl">
                The same space. A different first impression.
              </h3>
              <p className="mt-4 text-muted-foreground">
                Framing, light, timing and finishing decide whether a room reads as “fine” or as
                somewhere worth visiting. Drag the handle to compare.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* PACKAGE */}
      <Section id="package" tone="base">
        <Container>
          <SectionHead
            eyebrow="Complete package"
            title="From one property to a complete visual package."
            lead="Most listings need more than a set of photos. We deliver everything the marketing actually uses."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              { label: "Photo", image: media.interior1 },
              { label: "Drone", image: media.aerialVilla },
              { label: "Video", image: media.videoFrame },
              { label: "Floor plan / 3D tour", image: media.tour3d },
            ].map((p, idx) => (
              <div key={p.label} className="relative">
                <Figure src={p.image} alt={p.label} ratio="aspect-4/5" />
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-mono text-xs text-primary">0{idx + 1}</span>
                  <span className="font-display text-base uppercase tracking-wide">{p.label}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* PROOF */}
      <Section tone="ink">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Real proof" title="See the difference." className="max-w-xl" />
            <Btn to="/work" variant="outline">
              See more work
            </Btn>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {projects.map((p) => (
              <div key={p.title} className="group border border-border">
                <Figure src={p.image} alt={p.title} ratio="aspect-4/3" />
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                    {p.location}
                  </p>
                  <p className="mt-3 text-sm text-primary">{p.services}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="base">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <SectionHead
              eyebrow="How we work"
              title="What you get beyond the images."
              lead="A shoot is only useful if the output fits how you market."
            />
            <div className="grid gap-8 sm:grid-cols-2">
              <ValueItem index="01" title="Planned around light" body="We shoot at the time of day that makes the space look like itself at its best." />
              <ValueItem index="02" title="Consistent set" body="Photo, drone and video finished to one look so the listing feels coherent." />
              <ValueItem index="03" title="Delivery formats" body="Web, print and social crops prepared for where the content will actually run." />
              <ValueItem index="04" title="Scales up" body="One apartment or a full development — the same workflow, more capture days." />
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
