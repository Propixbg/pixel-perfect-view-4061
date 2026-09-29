import { createFileRoute } from "@tanstack/react-router";
import { media } from "@/lib/media";
import { Btn, Container, Figure, NeedCard, Section, SectionHead, ValueItem } from "@/components/site/ui";
import { FinalCta } from "@/components/site/FinalCta";

export const Route = createFileRoute("/3d")({
  head: () => ({
    meta: [
      { title: "Custom 3D Printing for Business & Events | AirProPix" },
      {
        name: "description",
        content:
          "From digital idea to physical object: prototypes, functional parts, small production runs and personalized 3D printed products for events.",
      },
      { property: "og:title", content: "3D — Business & Personalization | AirProPix" },
      {
        property: "og:description",
        content: "Prototypes, custom components and personalized event products — from one piece to 100+.",
      },
    ],
  }),
  component: ThreeD,
});

const businessCards = [
  { title: "Prototyping", body: "Test an idea before committing to production.", image: media.cadToObject },
  { title: "Functional parts", body: "Create custom components when standard parts don't fit.", image: media.printPart },
  { title: "Custom components", body: "Produce specific parts for a particular application.", image: media.printPart },
  { title: "Small production runs", body: "Produce smaller quantities without traditional mass-production setup.", image: media.printBatch },
  { title: "CAD-based projects", body: "Turn digital designs into physical objects.", image: media.cadToObject },
  { title: "Product development", body: "Move from concept to physical prototype.", image: media.eventVariety },
];

const eventGallery = [
  "Wedding table numbers",
  "Personalized name signs",
  "Cake toppers",
  "Guest gifts",
  "Personalized souvenirs",
  "Event decorations",
  "Custom figurines",
  "Commemorative objects",
  "Branded event products",
  "Corporate gifts",
  "Personalized signs",
  "Custom small objects",
];

const quantities = [
  { q: "1 piece", note: "A single personalized keepsake" },
  { q: "20 pieces", note: "A small table or family set" },
  { q: "50 pieces", note: "A full guest list" },
  { q: "100+ pieces", note: "Larger events and corporate runs" },
];

const whyPrint = [
  { title: "Custom", body: "Not limited to standard products." },
  { title: "Personalized", body: "Names, dates, logos, dimensions and designs." },
  { title: "Small quantities", body: "Useful when you need 1, 10, 50 or 100 pieces." },
  { title: "Prototype → final", body: "Test an idea before producing more." },
  { title: "Design flexibility", body: "Modify an existing idea or work from a digital model." },
  { title: "One-stop workflow", body: "Idea → design → print → finished object." },
];

const problems = [
  { quote: "I need something in a specific size.", answer: "Custom 3D printing", image: media.printPart, to: "/contact" },
  { quote: "I need 50 identical personalized gifts.", answer: "Event production", image: media.printBatch, to: "/contact" },
  { quote: "I need a prototype before manufacturing.", answer: "Prototype printing", image: media.cadToObject, to: "/contact" },
  { quote: "I need a replacement part.", answer: "Functional component", image: media.printPart, to: "/contact" },
  { quote: "I have an idea but no physical model.", answer: "From digital design to object", image: media.cadToObject, to: "/contact" },
  { quote: "I need something unique for an event.", answer: "Personalized 3D product", image: media.eventVariety, to: "/contact" },
];

function ThreeD() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 pb-16 md:pt-44">
        <img src={media.cadToObject} alt="" className="img-cover absolute inset-0 opacity-35" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/88 to-transparent" />
        <Container className="relative">
          <p className="eyebrow mb-6">3D</p>
          <h1 className="max-w-4xl font-display text-[2.4rem] leading-[1] font-semibold text-balance md:text-7xl">
            From digital idea to physical object.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground md:text-lg">
            3D printing is not just about printing objects. It is about creating something that didn’t
            exist before.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn to="/3d" hash="business">
              3D for business
            </Btn>
            <Btn to="/3d" hash="events" variant="outline">
              3D for events &amp; personalization
            </Btn>
          </div>
        </Container>
      </section>

      {/* BUSINESS */}
      <Section id="business" tone="base">
        <Container>
          <SectionHead
            eyebrow="3D for business"
            title="Need a part, prototype or custom object?"
            lead="When the shelf version doesn't fit, the answer is usually a printed one — tested first, produced second."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {businessCards.map((c) => (
              <div key={c.title} className="group border border-border bg-surface transition-colors hover:border-primary/50">
                <Figure src={c.image} alt={c.title} ratio="aspect-4/3" className="border-0" />
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* EVENTS */}
      <Section id="events" tone="surface">
        <Container>
          <SectionHead
            eyebrow="3D for events & personalization"
            title="Make the event yours."
            lead="Personalized details make an event feel personal. We turn names, dates, ideas and designs into real objects."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <Figure src={media.eventBatch} alt="Personalized wedding table numbers" ratio="aspect-16/10 lg:col-span-7" caption="Wedding table numbers & place cards" />
            <Figure src={media.eventVariety} alt="Personalized event products" ratio="aspect-16/10 lg:col-span-5" caption="Toppers · signs · figurines · gifts" />
            <Figure src={media.printBatch} alt="Batch of personalized gifts" ratio="aspect-16/9 lg:col-span-8" caption="One design · 35 identical pieces" />
            <Figure src={media.printPart} alt="Detail of a printed object" ratio="aspect-4/3 lg:col-span-4" caption="Surface detail" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border md:grid-cols-4">
            {quantities.map((q) => (
              <div key={q.q} className="bg-background p-6">
                <p className="font-display text-3xl font-semibold text-primary">{q.q}</p>
                <p className="mt-2 text-sm text-muted-foreground">{q.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {eventGallery.map((g) => (
              <span
                key={g}
                className="border border-border px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:border-primary/60 hover:text-primary"
              >
                {g}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHY */}
      <Section tone="base">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <SectionHead eyebrow="Why print with us" title="Why print with us?" />
              <div className="mt-10 grid grid-cols-2 gap-3">
                <Figure src={media.printBatch} alt="Production batch" ratio="aspect-4/5" />
                <Figure src={media.cadToObject} alt="Digital to physical" ratio="aspect-4/5" />
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {whyPrint.map((w, i) => (
                <ValueItem key={w.title} index={`0${i + 1}`} title={w.title} body={w.body} />
              ))}
            </div>
          </div>
          <div className="mt-12">
            <Btn to="/contact">Have an idea? Let’s make it real.</Btn>
          </div>
        </Container>
      </Section>

      {/* PROBLEM → SOLUTION */}
      <Section tone="ink">
        <Container>
          <SectionHead
            eyebrow="Problem → solution"
            title="Some things simply don’t exist on the shelf."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {problems.map((p) => (
              <NeedCard key={p.quote} {...p} />
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
