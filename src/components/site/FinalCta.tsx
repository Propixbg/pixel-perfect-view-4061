import { media } from "@/lib/media";
import { useT } from "@/lib/i18n";
import { Btn, Container } from "./ui";

const collage = [media.interior2, media.aerialVilla, media.orthophoto, media.printBatch];

export function FinalCta() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="absolute inset-0 grid grid-cols-2 opacity-25 md:grid-cols-4">
        {collage.map((src) => (
          <img key={src} src={src} alt="" loading="lazy" className="img-cover" />
        ))}
      </div>
      <div className="absolute inset-0 bg-ink/75" />
      <Container className="relative">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">{t("Start here", "Започнете оттук")}</p>
          <h2 className="text-4xl leading-[1.02] font-semibold text-balance md:text-6xl">
            {t("Have something to capture, map or create?", "Имате нещо за заснемане, картографиране или създаване?")}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {t(
              "Tell us what you need. We’ll help you choose the right approach.",
              "Кажете ни от какво имате нужда. Ще Ви помогнем да изберете правилния подход.",
            )}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Btn to="/contact">{t("Start a project", "Започнете проект")}</Btn>
            <Btn href="tel:+359892061977" variant="outline">
              {t("Call us", "Обадете се")}
            </Btn>
          </div>
          <div className="mt-10 flex flex-col gap-1 font-mono text-sm text-foreground/80 md:flex-row md:gap-8">
            <a href="tel:+359892061977" className="hover:text-primary">
              +359 892 061 977
            </a>
            <a href="mailto:contact@airpropix.com" className="hover:text-primary">
              contact@airpropix.com
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
