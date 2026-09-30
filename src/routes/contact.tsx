import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { media } from "@/lib/media";
import { Container, Section } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { socials, useLang, useT } from "@/lib/i18n";
import { sendInquiry } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Контакт — AirProPix | Contact AirProPix" },
      {
        name: "description",
        content:
          "Разкажете ни за проекта си — фото и видео, картографиране или 3D. Tell AirProPix about your project. +359 892 061 977, contact@airpropix.com.",
      },
      { property: "og:title", content: "Контакт — AirProPix" },
      { property: "og:description", content: "Започнете проект за фото и видео, картографиране или 3D." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const projectTypes = [
  { value: "Photo & Video", en: "Photo & Video", bg: "Фото и видео" },
  { value: "Mapping", en: "Mapping", bg: "Картографиране" },
  { value: "3D", en: "3D", bg: "3D" },
  { value: "Other", en: "Other", bg: "Друго" },
] as const;

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "projectType" | "message" | "captcha", string>>;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

const SITE_KEY = import.meta.env["VITE_TURNSTILE_SITE_KEY"] as string | undefined;

function useTurnstile(lang: string, onToken: (t: string) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;
    let cancelled = false;
    const render = () => {
      if (cancelled || !ref.current || !window.turnstile) return;
      if (idRef.current) window.turnstile.remove(idRef.current);
      idRef.current = window.turnstile.render(ref.current, {
        sitekey: SITE_KEY,
        theme: "dark",
        language: lang,
        callback: (t: string) => onToken(t),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
    };
    if (window["turnstile"]) render();
    else {
      let s = document.querySelector<HTMLScriptElement>("script[data-turnstile]");
      if (!s) {
        s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        s.async = true;
        s.dataset["turnstile"] = "1";
        document.head.appendChild(s);
      }
      s.addEventListener("load", render);
    }
    return () => {
      cancelled = true;
      if (idRef.current && window.turnstile) window.turnstile.remove(idRef.current);
      idRef.current = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return { ref, reset: () => window.turnstile?.reset(idRef.current) };
}

function Contact() {
  const t = useT();
  const { lang } = useLang();
  const send = useServerFn(sendInquiry);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", projectType: "", message: "" });
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");
  const ts = useTurnstile(lang, setToken);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = t("Please enter your name.", "Моля, въведете име.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = t("Please enter a valid email address.", "Моля, въведете валиден имейл адрес.");
    if (!form.projectType) e.projectType = t("Please choose a project type.", "Моля, изберете тип проект.");
    if (!form.message.trim()) e.message = t("Please describe your project.", "Моля, опишете проекта си.");
    if (!token) e.captcha = t("Please complete the security check.", "Моля, преминете проверката за сигурност.");
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (status === "sending") return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
    setErrMsg("");
    try {
      const res = await send({
        data: { ...form, projectType: form.projectType as (typeof projectTypes)[number]["value"], lang, token },
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", company: "", projectType: "", message: "" });
      } else {
        setStatus("error");
        if (res.code === "captcha") {
          setErrors({ captcha: t("Security check failed. Please try again.", "Проверката за сигурност не беше успешна. Моля, опитайте отново.") });
        }
        setErrMsg(
          res.code === "not_configured"
            ? t(
                "The form is temporarily unavailable. Please email contact@airpropix.com or call +359 892 061 977.",
                "Формата временно не е достъпна. Моля, пишете на contact@airpropix.com или се обадете на +359 892 061 977.",
              )
            : t(
                "Your inquiry could not be sent. Please try again.",
                "Запитването не беше изпратено. Моля, опитайте отново.",
              ),
        );
      }
    } catch {
      setStatus("error");
      setErrMsg(t("Your inquiry could not be sent. Please try again.", "Запитването не беше изпратено. Моля, опитайте отново."));
    } finally {
      setToken("");
      ts.reset();
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 pb-12 md:pt-44">
        <img src={media.videoFrame} alt="" className="img-cover absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/90 to-transparent" />
        <Container className="relative">
          <p className="eyebrow mb-6">{t("Contact", "Контакт")}</p>
          <h1 className="max-w-3xl font-display text-[2.4rem] leading-[1] font-semibold text-balance md:text-7xl">
            {t("Tell us about the project.", "Разкажете ни за проекта.")}
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            {t(
              "You don’t need to know which technology you need. Explain the project — we’ll suggest the right approach.",
              "Не е нужно да знаете каква технология Ви трябва. Опишете проекта — ние ще предложим правилния подход.",
            )}
          </p>
          <div className="mt-8 flex flex-col gap-2 font-mono text-sm md:flex-row md:gap-10">
            <a href="tel:+359892061977" className="text-foreground/85 hover:text-primary">+359 892 061 977</a>
            <a href="mailto:contact@airpropix.com" className="text-foreground/85 hover:text-primary">contact@airpropix.com</a>
          </div>
        </Container>
      </section>

      <Section tone="base" className="pt-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <form className="border border-border bg-surface p-7 md:p-10" onSubmit={onSubmit} noValidate>
              {status === "success" ? (
                <div className="border border-primary/50 p-6" role="status">
                  <p className="font-display text-2xl font-semibold text-primary">
                    {t("Thank you. Your inquiry has been sent.", "Благодарим Ви. Вашето запитване беше изпратено.")}
                  </p>
                  <button type="button" onClick={() => setStatus("idle")} className="mt-5 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase hover:text-primary">
                    {t("Send another inquiry", "Изпратете ново запитване")}
                  </button>
                </div>
              ) : (
                <>
                  <p className="eyebrow mb-4">{t("Project type", "Тип проект")} *</p>
                  <div className="flex flex-wrap gap-2" role="radiogroup">
                    {projectTypes.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        role="radio"
                        aria-checked={form.projectType === p.value}
                        onClick={() => set("projectType", p.value)}
                        className={cn(
                          "min-h-11 border px-4 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors",
                          form.projectType === p.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:border-primary/60 hover:text-primary",
                        )}
                      >
                        {lang === "bg" ? p.bg : p.en}
                      </button>
                    ))}
                  </div>
                  <FieldError msg={errors.projectType} />

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <Field label={t("Name", "Име")} name="name" required value={form.name} onChange={(v) => set("name", v)} error={errors.name} />
                    <Field label={t("Email", "Имейл")} name="email" type="email" required value={form.email} onChange={(v) => set("email", v)} error={errors.email} />
                    <Field label={t("Phone", "Телефон")} name="phone" type="tel" value={form.phone} onChange={(v) => set("phone", v)} />
                    <Field label={t("Company (optional)", "Компания (по избор)")} name="company" value={form.company} onChange={(v) => set("company", v)} />
                  </div>

                  <div className="mt-5">
                    <label className="eyebrow mb-2 block !text-muted-foreground" htmlFor="message">
                      {t("Message", "Съобщение")} *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      maxLength={5000}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      aria-invalid={!!errors.message}
                      placeholder={t(
                        "What do you need to capture, map or create?",
                        "Какво трябва да заснемем, картографираме или създадем?",
                      )}
                      className="w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                    />
                    <FieldError msg={errors.message} />
                  </div>

                  <div className="mt-6">
                    {SITE_KEY ? (
                      <div ref={ts.ref} />
                    ) : (
                      <p className="border border-border p-4 text-sm text-muted-foreground">
                        {t(
                          "Security check is not configured yet — the form can’t be sent. Please use email or phone.",
                          "Проверката за сигурност още не е настроена — формата не може да бъде изпратена. Моля, използвайте имейл или телефон.",
                        )}
                      </p>
                    )}
                    <FieldError msg={errors.captcha} />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending" || !SITE_KEY}
                    className="mt-6 min-h-12 w-full bg-primary px-6 py-4 font-display text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {status === "sending" ? t("Sending…", "Изпращане…") : t("Send inquiry", "Изпратете запитване")}
                  </button>

                  {status === "error" && errMsg ? (
                    <p className="mt-5 border border-destructive/60 p-4 text-sm text-destructive" role="alert">{errMsg}</p>
                  ) : null}
                </>
              )}
            </form>

            <div className="space-y-4">
              <div className="aspect-4/3 overflow-hidden border border-border">
                <img src={media.aerialVilla} alt={t("AirProPix aerial work", "Въздушна работа на AirProPix")} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="border border-border bg-surface p-7">
                <p className="eyebrow mb-4">{t("Direct", "Директно")}</p>
                <a href="tel:+359892061977" className="block font-display text-2xl font-semibold hover:text-primary">+359 892 061 977</a>
                <a href="mailto:contact@airpropix.com" className="mt-2 block font-mono text-sm text-muted-foreground hover:text-primary">contact@airpropix.com</a>
                <div className="mt-6 flex flex-wrap gap-4 font-mono text-[11px] tracking-[0.16em] uppercase">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="border border-border bg-surface p-7">
                <p className="eyebrow mb-4">{t("What happens next", "Какво следва")}</p>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li>1. {t("We read the brief and ask anything missing.", "Преглеждаме запитването и уточняваме липсващото.")}</li>
                  <li>2. {t("We propose the approach and the outputs.", "Предлагаме подход и крайни резултати.")}</li>
                  <li>3. {t("We schedule the capture or production.", "Планираме заснемането или производството.")}</li>
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function FieldError({ msg }: { msg?: string | undefined }) {
  return msg ? <p className="mt-2 text-xs text-destructive">{msg}</p> : null;
}

function Field({
  label, name, type = "text", required, value, onChange, error,
}: {
  label: string; name: string; type?: string; required?: boolean; value: string; onChange: (v: string) => void; error?: string | undefined;
}) {
  return (
    <div>
      <label className="eyebrow mb-2 block !text-muted-foreground" htmlFor={name}>
        {label}{required ? " *" : ""}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        maxLength={200}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-12 w-full border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
      <FieldError msg={error} />
    </div>
  );
}
