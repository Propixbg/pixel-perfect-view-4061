import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("eyebrow", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
  tone = "base",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "base" | "surface" | "ink";
}) {
  const tones = {
    base: "bg-background",
    surface: "bg-surface",
    ink: "bg-ink",
  } as const;
  return (
    <section id={id} className={cn("relative py-20 md:py-28", tones[tone], className)}>
      {children}
    </section>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1400px] px-5 md:px-10", className)}>{children}</div>;
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <h2 className="text-3xl leading-[1.05] font-semibold text-balance md:text-5xl">{title}</h2>
      {lead ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{lead}</p>
      ) : null}
    </div>
  );
}

type BtnProps = {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  hash?: string;
};

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 font-display text-sm font-medium tracking-wide uppercase transition-all duration-300";

const btnVariants = {
  solid:
    "bg-primary text-primary-foreground hover:bg-primary/85 hover:-translate-y-0.5 shadow-[0_18px_40px_-24px_var(--color-primary)]",
  outline:
    "border border-border text-foreground hover:border-primary hover:text-primary hover:-translate-y-0.5",
  ghost: "text-primary hover:gap-3",
} as const;

export function Btn({ to, href, children, variant = "solid", className, hash }: BtnProps) {
  const cls = cn(btnBase, btnVariants[variant], className);
  if (to) {
    return (
      <Link to={to} {...(hash ? { hash } : {})} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

export function Figure({
  src,
  alt,
  caption,
  className,
  imgClassName,
  ratio = "aspect-[4/3]",
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cn("group relative hover-zoom border border-border bg-surface", ratio, className)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className={cn("img-cover", imgClassName)}
      />
      {caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/95 to-transparent p-4 font-mono text-[11px] tracking-[0.18em] text-foreground/85 uppercase">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function NeedCard({
  quote,
  answer,
  image,
  to,
}: {
  quote: string;
  answer: string;
  image: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group relative block overflow-hidden border border-border bg-surface transition-colors duration-500 hover:border-primary/60"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={image}
          alt={answer}
          loading="lazy"
          className="img-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="scrim" />
      </div>
      <div className="p-6">
        <p className="font-display text-lg leading-snug text-balance">“{quote}”</p>
        <p className="eyebrow mt-4 flex items-center gap-2">
          <span className="h-px w-6 bg-primary transition-all duration-300 group-hover:w-10" />
          {answer}
        </p>
      </div>
    </Link>
  );
}

export function ValueItem({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div className="group rule-top pt-6">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-primary">{index}</span>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
      </div>
      <p className="mt-3 pl-10 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
