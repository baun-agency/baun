
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Target, PenTool, Megaphone, MonitorSmartphone } from "lucide-react";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";

const navItems = [
  { id: "origin", label: "Origin" },
  { id: "craft", label: "Craft" },
  { id: "treasure", label: "Treasure" },
  { id: "echoes", label: "Echoes" },
  { id: "call", label: "Call" },
];

const PortfolioCard = ({ src, title }: { src: string; title: string }) => (
  <article className="group relative overflow-hidden rounded-lg border bg-card shadow-sm">
    <img
      loading="lazy"
      src={src}
      alt={`${title} — premium portfolio visual in monochrome with red accents`}
      className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="absolute bottom-3 left-3 rounded px-2 py-1 text-sm font-semibold text-foreground backdrop-blur-sm">
      {title}
    </div>
  </article>
);

const Index = () => {
  return (
    <div className="min-h-screen font-sans">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30">
        <nav className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-end gap-8 px-6 py-6">
          {navItems.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="story-link text-sm font-semibold">
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section id="hero" className="relative isolate overflow-hidden bg-background">
          <img
            src="/lovable-uploads/54e529dd-2615-461c-a962-9c8e88a3224a.png"
            alt="Baun hero — Top Concepts Elevated Results, monochrome with Kikuyu red accents"
            className="block h-auto w-full select-none"
            draggable={false}
            fetchPriority="high"
            decoding="async"
          />
        </section>

        {/* Origin */}
        <section id="origin" className="bg-background">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold md:text-4xl">
                Rooted in Vision. Driven by Craft.
              </h2>
              <p className="text-muted-foreground">
                Baun merges heritage-inspired creativity with modern precision —
                delivering concepts that resonate and strategies that perform.
              </p>
            </div>
            <div className="h-64 rounded-xl bg-secondary shadow" />
          </div>
        </section>

        {/* Craft */}
        <section id="craft" className="bg-secondary">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="mb-12 text-3xl font-extrabold md:text-4xl">Craft</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Target, title: "Brand Strategy" },
                { icon: PenTool, title: "Visual Identity" },
                { icon: Megaphone, title: "Campaign Design" },
                { icon: MonitorSmartphone, title: "Digital Experiences" },
              ].map(({ icon: Icon, title }) => (
                <article
                  key={title}
                  className="group rounded-xl border bg-card p-6 shadow-sm transition-transform hover:translate-y-[-2px] hover:shadow-md"
                >
                  <Icon className="mb-4 h-6 w-6 text-foreground" />
                  <h3 className="text-lg font-semibold">{title}</h3>
                </article>
              ))}
            </div>
            <div className="mt-10">
              <Button variant="cta" size="sm">Let’s Build.</Button>
            </div>
          </div>
        </section>

        {/* Treasure */}
        <section id="treasure" className="bg-background">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="mb-12 text-3xl font-extrabold md:text-4xl">Treasure</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <PortfolioCard src={p1} title="Monochrome Poster" />
              <PortfolioCard src={p2} title="Urban Geometry" />
              <PortfolioCard src={p3} title="Product Focus" />
              <PortfolioCard src={p4} title="Editorial System" />
              <PortfolioCard src={p5} title="Geometric Motion" />
              <PortfolioCard src={p6} title="Interface Preview" />
            </div>
          </div>
        </section>

        {/* Echoes */}
        <section id="echoes" className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-5xl px-6 py-24">
            <h2 className="mb-10 text-center text-3xl font-extrabold md:text-4xl">
              Voices That Carry
            </h2>
            <Carousel className="relative">
              <CarouselContent>
                {[
                  {
                    q: "Baun elevated our brand with ruthless clarity and taste.",
                    a: "CMO, Venture Studio",
                  },
                  {
                    q: "Sharp strategy, beautiful execution — measurable results.",
                    a: "Head of Growth, E‑commerce",
                  },
                  {
                    q: "Premium from brief to delivery. A new standard.",
                    a: "Founder, DTC",
                  },
                ].map((t, i) => (
                  <CarouselItem key={i} className="lg:basis-full">
                    <blockquote className="mx-auto max-w-3xl rounded-xl bg-primary/10 p-8 text-center backdrop-blur-sm">
                      <p className="text-xl font-semibold md:text-2xl">“{t.q}”</p>
                      <footer className="mt-4 text-sm opacity-90">{t.a}</footer>
                    </blockquote>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4" />
              <CarouselNext className="-right-4" />
            </Carousel>
          </div>
        </section>

        {/* Call */}
        <section id="call" className="bg-foreground text-background">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-24 text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Let’s Create Something Bold.
            </h2>
            <Button variant="cta" size="lg" aria-label="Summon Me">
              Summon Me!
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
