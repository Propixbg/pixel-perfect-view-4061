import { Link } from "@tanstack/react-router";
import logo from "@/assets/airpropix-logo.png.asset.json";

const columns = [
  {
    title: "Photo & Video",
    links: [
      { label: "Property Photography", to: "/photo-video" },
      { label: "Drone Photography", to: "/photo-video" },
      { label: "Video Production", to: "/photo-video" },
      { label: "Brand Content", to: "/photo-video" },
    ],
  },
  {
    title: "Mapping",
    links: [
      { label: "Drone Mapping", to: "/mapping" },
      { label: "Photogrammetry", to: "/mapping" },
      { label: "Orthophoto", to: "/mapping" },
      { label: "Progress Monitoring", to: "/mapping" },
    ],
  },
  {
    title: "3D",
    links: [
      { label: "3D for Business", to: "/3d" },
      { label: "Events & Personalization", to: "/3d" },
      { label: "Prototyping", to: "/3d" },
      { label: "Custom Production", to: "/3d" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Work", to: "/work" },
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          <div>
            <img src={logo.url} alt="AirProPix" className="h-7 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Capture reality. Turn it into something more. Photo &amp; Video · Mapping · 3D.
            </p>
            <div className="mt-6 space-y-1 font-mono text-sm">
              <a href="tel:+359892061977" className="block text-foreground/85 hover:text-primary">
                +359 892 061 977
              </a>
              <a href="mailto:contact@airpropix.com" className="block text-foreground/85 hover:text-primary">
                contact@airpropix.com
              </a>
            </div>
            <div className="mt-6 flex gap-4 font-mono text-[11px] tracking-[0.18em] uppercase">
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

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="eyebrow mb-4">{col.title}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} AirProPix</span>
          <span>Capture → Map → Model → Make</span>
        </div>
      </div>
    </footer>
  );
}
