import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { media } from "@/lib/media";
import { Container, Section } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AirProPix — Start a Project" },
      {
        name: "description",
        content:
          "Tell AirProPix what you need to capture, understand, measure or create. Call +359 892 061 977 or email contact@airpropix.com.",
      },
      { property: "og:title", content: "Contact AirProPix" },
      { property: "og:description", content: "Start a photo & video, mapping or 3D project." },
    ],
  }),
  component: Contact,
});

const services = ["Photo & Video", "Drone", "Mapping", "3D for business", "3D for events", "Not sure yet"];

function Contact() {
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (s: string) =>
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 pb-12 md:pt-44">
        <img src={media.videoFrame} alt="" className="img-cover absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/90 to-transparent" />
        <Container className="relative">
          <p className="eyebrow mb-6">Contact</p>
          <h1 className="max-w-3xl font-display text-[2.4rem] leading-[1] font-semibold text-balance md:text-7xl">
            Tell us about the project.
          </h1>
          <div className="mt-8 flex flex-col gap-2 font-mono text-sm md:flex-row md:gap-10">
            <a href="tel:+359892061977" className="text-foreground/85 hover:text-primary">
              +359 892 061 977
            </a>
            <a href="mailto:contact@airpropix.com" className="text-foreground/85 hover:text-primary">
              contact@airpropix.com
            </a>
          </div>
        </Container>
      </section>

      <Section tone="base" className="pt-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <form
              className="border border-border bg-surface p-7 md:p-10"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <p className="eyebrow mb-6">What do you need?</p>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggle(s)}
                    className={cn(
                      "border px-4 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors",
                      selected.includes(s)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary/60 hover:text-primary",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" />
                <Field label="Location / site" name="location" />
              </div>

              <div className="mt-5">
                <label className="eyebrow mb-2 block !text-muted-foreground" htmlFor="message">
                  Project details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="What do you need to capture, understand, measure or create?"
                  className="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="mt-7 w-full bg-primary px-6 py-4 font-display text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/85 sm:w-auto"
              >
                Send enquiry
              </button>

              {sent ? (
                <p className="mt-5 border border-primary/40 p-4 text-sm text-primary">
                  Thanks — your message is ready to send. This form isn’t connected to email yet, so
                  please also reach us at contact@airpropix.com or +359 892 061 977.
                </p>
              ) : null}
            </form>

            <div className="space-y-4">
              <img src={media.aerialVilla} alt="AirProPix aerial work" loading="lazy" className="img-cover aspect-4/3 border border-border" />
              <div className="border border-border bg-surface p-7">
                <p className="eyebrow mb-4">Direct</p>
                <a href="tel:+359892061977" className="block font-display text-2xl font-semibold hover:text-primary">
                  +359 892 061 977
                </a>
                <a
                  href="mailto:contact@airpropix.com"
                  className="mt-2 block font-mono text-sm text-muted-foreground hover:text-primary"
                >
                  contact@airpropix.com
                </a>
                <div className="mt-6 flex gap-4 font-mono text-[11px] tracking-[0.16em] uppercase">
                  <a href="https://www.instagram.com/airpropix" className="text-muted-foreground hover:text-primary">
                    Instagram
                  </a>
                  <a href="https://www.facebook.com/airpropix" className="text-muted-foreground hover:text-primary">
                    Facebook
                  </a>
                  <a href="https://www.youtube.com/@airpropix" className="text-muted-foreground hover:text-primary">
                    YouTube
                  </a>
                </div>
              </div>
              <div className="border border-border bg-surface p-7">
                <p className="eyebrow mb-4">What happens next</p>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li>1. We read the brief and ask anything missing.</li>
                  <li>2. We propose the approach and the outputs.</li>
                  <li>3. We schedule the capture or production.</li>
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow mb-2 block !text-muted-foreground" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}
