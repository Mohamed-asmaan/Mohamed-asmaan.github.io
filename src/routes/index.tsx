import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const CityScene = lazy(() => import("../components/CityScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M. Mohamed Asmaan — Frontend Engineer / Interface Systems 2099" },
      {
        name: "description",
        content:
          "Cinematic portfolio of M. Mohamed Asmaan — React & TypeScript engineer in Bengaluru building high-performance, motion-driven interfaces.",
      },
      { property: "og:title", content: "M. Mohamed Asmaan — Interface Systems" },
      {
        property: "og:description",
        content: "React & TypeScript engineer. Neon-grade interfaces, WebGL atmospheres, motion-first engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

/* ---------------- data ---------------- */

const SECTIONS = [
  { id: "home", label: "index" },
  { id: "about", label: "profile" },
  { id: "work", label: "service" },
  { id: "projects", label: "archive" },
  { id: "stack", label: "systems" },
  { id: "path", label: "timeline" },
  { id: "contact", label: "uplink" },
];

const EXPERIENCE = [
  {
    role: "Frontend Engineer — React.js",
    org: "Alspark Solutions",
    range: "2024 — PRESENT",
    loc: "Bengaluru, IN",
    bullets: [
      "Translated Figma designs into pixel-accurate, responsive React components for a production conversational platform.",
      "Owned UI modules end-to-end: design handoff → REST API integration → deployment.",
      "Cut unnecessary re-renders by 30% via memoisation and reconciliation-aware refactors.",
      "Built a reusable component library that removed duplicated code across product areas.",
    ],
  },
];

const PROJECTS = [
  {
    id: "01",
    title: "Bangla Health Connect",
    kind: "Multilingual CMS Platform",
    stack: ["React", "Node.js", "REST", "CSS"],
    metric: "2.02M / MO IMPRESSIONS",
    accent: "var(--neon-cyan)",
    body: "900+ multilingual healthcare pages rendered without perf degradation. Conditional RTL for Arabic, EN/AR switching, modular content APIs.",
  },
  {
    id: "02",
    title: "Number Link",
    kind: "Conversational UI Platform",
    stack: ["React", "TypeScript", "Firebase", "Node.js"],
    metric: "100+ MSG CHAT STATE",
    accent: "var(--neon-magenta)",
    body: "Replaced traditional forms with a conversational React UI. Complex chat history state without lag. Firebase auth + Realtime DB, dynamic routing to live profiles.",
  },
  {
    id: "03",
    title: "Pizza Palace",
    kind: "Full-Stack MERN",
    stack: ["React", "Redux Toolkit", "Express", "MongoDB", "Razorpay"],
    metric: "SHIPPED SOLO, END-TO-END",
    accent: "var(--neon-amber)",
    body: "Complete food-ordering system built alone: DB schema, CRUD API, JWT auth, and Razorpay integration with signature verification.",
  },
  {
    id: "04",
    title: "SEO DOM Inspector",
    kind: "Chrome Extension",
    stack: ["React", "JavaScript", "Chrome APIs"],
    metric: "15+ DOM SIGNALS · NON-BLOCKING",
    accent: "var(--neon-cyan)",
    body: "Browser extension inspecting structural DOM signals in real time without ever blocking the main thread.",
  },
];

const STACK = [
  { g: "core", items: ["React.js", "TypeScript", "JavaScript ES6+", "HTML5", "CSS3"] },
  { g: "state & patterns", items: ["Hooks", "Context API", "Memoisation", "Reconciliation", "Redux Toolkit"] },
  { g: "styling", items: ["Tailwind", "Bootstrap", "CSS Modules", "Responsive systems"] },
  { g: "data", items: ["REST", "GraphQL", "Firebase RTDB", "JWT / OTP"] },
  { g: "tooling", items: ["Vite", "Webpack", "Git", "Postman", "Figma", "DevTools"] },
  { g: "fundamentals", items: ["DSA", "Event loop", "Closures", "Async/await", "Debounce", "OOP"] },
];

const PATH = [
  { t: "2019", e: "Started B.E. Computer Science — Anna University, Chennai." },
  { t: "2023", e: "Graduated. Began production frontend work." },
  { t: "2024", e: "Joined Alspark Solutions as Frontend Engineer (React.js)." },
  { t: "2024", e: "Started MCA at SRM Institute of Science and Technology." },
  { t: "2026", e: "MERN bootcamp — Error Makes Clever." },
];

const MARQUEE = [
  "REACT",
  "TYPESCRIPT",
  "MOTION",
  "WEBGL",
  "PERFORMANCE",
  "DESIGN SYSTEMS",
  "NODE",
  "INTERFACE CRAFT",
];

const LINKS = [
  { k: "EMAIL", v: "asmaan.dev@gmail.com", href: "mailto:asmaan.dev@gmail.com" },
  { k: "GITHUB", v: "github.com/asmaan", href: "https://github.com" },
  { k: "LINKEDIN", v: "in/mohamedasmaan", href: "https://linkedin.com" },
  { k: "LOCATION", v: "Bengaluru, IN · UTC+5:30", href: null },
];

/* ---------------- primitives ---------------- */

function useReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return r;
}

function SectionLabel({ index, title, tint = "var(--neon-cyan)" }: { index: string; title: string; tint?: string }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 border-b border-border/60 pb-4">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[0.65rem] tracking-[0.35em]" style={{ color: tint }}>
          {index}
        </span>
        <h2 className="text-2xl font-semibold uppercase tracking-[0.18em] sm:text-3xl">{title}</h2>
      </div>
      <span className="hidden font-mono text-[0.6rem] tracking-[0.3em] text-muted-foreground sm:block">
        // SECTOR ACTIVE
      </span>
    </div>
  );
}

/* ---------------- page ---------------- */

function Portfolio() {
  const reduced = useReduced();
  const [mounted, setMounted] = useState(false);
  const [booted, setBooted] = useState(false);
  const [clock, setClock] = useState("--:--:--");
  const [active, setActive] = useState("home");
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  /* clock */
  useEffect(() => {
    const tick = () =>
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  /* smooth scroll */
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.25, lerp: 0.09, wheelMultiplier: 1 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);

  /* custom cursor */
  useEffect(() => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    const dot = cursorRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const qx = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const qy = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });
    const move = (e: PointerEvent) => {
      qx(e.clientX);
      qy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const hot = (e.target as HTMLElement)?.closest("a,button,[data-magnet]");
      gsap.to(ring, { scale: hot ? 2.1 : 1, borderColor: hot ? "var(--neon-magenta)" : "var(--neon-cyan)", duration: 0.3 });
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [reduced]);

  /* boot + master timeline */
  useEffect(() => {
    if (reduced) {
      setBooted(true);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setBooted(true) });
      tl.to(".boot-line", { opacity: 1, stagger: 0.09, duration: 0.2 })
        .to(".boot-bar", { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0.1)
        .to(".boot-screen", { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "+=0.15")
        .set(".boot-screen", { display: "none" })
        .from(
          ".hero-char",
          { yPercent: 118, rotateX: -70, opacity: 0, stagger: 0.028, duration: 1.05, ease: "expo.out" },
          "-=0.35"
        )
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".hero-meta", { y: 18, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out" }, "-=0.5")
        .from(".chrome", { opacity: 0, duration: 0.8 }, "-=0.7");

      /* parallax hero out */
      gsap.to(".hero-inner", {
        yPercent: -18,
        opacity: 0.15,
        filter: "blur(6px)",
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
      });

      /* generic reveals */
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      /* line draws */
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
      });

      /* horizontal project rail */
      const rail = railRef.current;
      const track = trackRef.current;
      if (rail && track && window.innerWidth > 860) {
        const dist = () => track.scrollWidth - window.innerWidth + 120;
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: rail,
            start: "top top",
            end: () => "+=" + dist(),
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".proj-card").forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: card, containerAnimation: undefined, start: "top 95%" },
          });
        });
      }

      /* timeline spine */
      gsap.from(".spine", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: { trigger: "#path", start: "top 70%", end: "bottom 80%", scrub: true },
      });

      /* section observer */
      SECTIONS.forEach((s) => {
        ScrollTrigger.create({
          trigger: "#" + s.id,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => self.isActive && setActive(s.id),
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  /* magnetic buttons */
  useEffect(() => {
    if (reduced) return;
    const els = gsap.utils.toArray<HTMLElement>("[data-magnet]");
    const cleanups = els.map((el) => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.28,
          y: (e.clientY - (r.top + r.height / 2)) * 0.4,
          duration: 0.5,
          ease: "power3.out",
        });
      };
      const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    });
    return () => cleanups.forEach((c) => c());
  }, [reduced, booted]);

  const title = "ASMAAN";

  return (
    <div ref={rootRef} className="relative min-h-screen scanlines noise md:cursor-none">
      {/* WebGL atmosphere */}
      <div className="fixed inset-0 z-0">
        {mounted && (
          <Suspense fallback={null}>
            <CityScene />
          </Suspense>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_20%,var(--background)_92%)]" />
      </div>

      {/* cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan md:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border md:block"
        style={{ borderColor: "var(--neon-cyan)" }}
      />

      {/* boot */}
      <div className="boot-screen fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm font-mono text-[0.7rem] tracking-[0.18em] text-cyan">
          {["INIT /interface.core", "MOUNT webgl.atmosphere", "LOAD asmaan.profile", "SYNC motion.engine", "READY"].map(
            (l) => (
              <div key={l} className="boot-line opacity-0">
                <span className="text-magenta">▸</span> {l}
              </div>
            )
          )}
          <div className="mt-5 h-px w-full bg-border">
            <div className="boot-bar h-px origin-left scale-x-0 bg-cyan" />
          </div>
        </div>
      </div>

      {/* chrome: side nav */}
      <nav className="chrome fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={"#" + s.id}
            className="group flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.28em]"
          >
            <span
              className="block h-px transition-all duration-500"
              style={{
                width: active === s.id ? 34 : 14,
                background: active === s.id ? "var(--neon-magenta)" : "var(--border)",
              }}
            />
            <span
              className="transition-colors duration-300"
              style={{ color: active === s.id ? "var(--neon-cyan)" : "var(--muted-foreground)" }}
            >
              {s.label}
            </span>
          </a>
        ))}
      </nav>

      {/* chrome: top bar */}
      <header className="chrome fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground sm:px-8">
        <span className="text-cyan">M.M. ASMAAN</span>
        <span className="hidden sm:block">FRONTEND / REACT / MOTION</span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-magenta" style={{ animation: "pulseDot 2s infinite" }} />
          {clock} IST
        </span>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section id="home" className="relative flex min-h-screen items-center px-5 sm:px-8 lg:pl-40 lg:pr-24">
          <div className="hero-inner w-full">
            <div className="hero-meta mb-6 flex flex-wrap items-center gap-3">
              <span className="tag">SECTOR 07 · BENGALURU</span>
              <span className="tag" style={{ borderColor: "color-mix(in oklab, var(--neon-magenta) 35%, transparent)", color: "var(--neon-magenta)" }}>
                AVAILABLE FOR WORK
              </span>
            </div>

            <h1
              className="select-none text-[19vw] font-black leading-[0.82] tracking-tighter sm:text-[15vw] lg:text-[13vw]"
              style={{ perspective: 800 }}
            >
              <span className="sr-only">M. Mohamed Asmaan</span>
              <span aria-hidden="true" className="flex overflow-hidden">
                {title.split("").map((c, i) => (
                  <span key={i} className="hero-char inline-block neon-cyan-glow">
                    {c}
                  </span>
                ))}
              </span>
            </h1>

            <div className="mt-6 max-w-2xl">
              <p className="hero-sub text-base leading-relaxed text-muted-foreground sm:text-lg">
                Frontend engineer building{" "}
                <span className="text-foreground">motion-driven, production-grade React interfaces</span> — 900+ page
                multilingual platforms, real-time conversational UIs, and 30% render-cost reductions.
              </p>
            </div>

            <div className="hero-meta mt-10 flex flex-wrap items-center gap-4">
              <a
                data-magnet
                href="#projects"
                className="glass glass-hover inline-flex items-center gap-3 px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-cyan transition-colors"
              >
                ▸ Enter archive
              </a>
              <a
                data-magnet
                href="#contact"
                className="inline-flex items-center gap-3 border-b border-magenta/50 pb-1 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-magenta"
              >
                open uplink
              </a>
            </div>
          </div>

          <div className="chrome absolute bottom-8 right-5 hidden font-mono text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground sm:right-8 sm:block">
            scroll ↓ to descend
          </div>
        </section>

        <div className="relative bg-background/90 backdrop-blur-[3px]">
        {/* MARQUEE */}
        <div className="relative z-10 overflow-hidden border-y border-border/50 bg-background/50 py-3 backdrop-blur">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span
                key={i}
                className="px-8 font-mono text-[0.68rem] uppercase tracking-[0.4em]"
                style={{ color: i % 3 === 0 ? "var(--neon-magenta)" : "var(--muted-foreground)" }}
              >
                {m} <span className="text-cyan">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="px-5 py-28 sm:px-8 lg:pl-40 lg:pr-24">
          <SectionLabel index="01" title="Profile" />
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div data-reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm <span className="text-foreground">M. Mohamed Asmaan</span>, a React engineer in Bengaluru. I build
                interfaces where the engineering is invisible and the feel is not — fast paint, honest state, motion
                that carries meaning.
              </p>
              <p>
                Day to day that means owning UI modules from Figma handoff through REST integration to deploy, keeping
                render costs low, and turning repeated patterns into component systems other engineers actually reuse.
              </p>
              <p className="font-mono text-sm text-cyan">
                {">"} focus: React · TypeScript · performance · interaction design
              </p>
            </div>
            <div data-reveal className="glass p-6">
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                Runtime stats
              </div>
              <div className="mt-5 space-y-4">
                {[
                  ["Impressions shipped", "2.02M / mo", "var(--neon-cyan)"],
                  ["Render cost cut", "30%", "var(--neon-magenta)"],
                  ["Pages at scale", "900+", "var(--neon-amber)"],
                  ["Years in production", "2+", "var(--neon-cyan)"],
                ].map(([k, v, c]) => (
                  <div key={k} className="flex items-baseline justify-between border-b border-border/40 pb-2">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{k}</span>
                    <span className="text-xl font-semibold" style={{ color: c }}>
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="work" className="px-5 py-28 sm:px-8 lg:pl-40 lg:pr-24">
          <SectionLabel index="02" title="Service Record" tint="var(--neon-magenta)" />
          {EXPERIENCE.map((x) => (
            <div key={x.role} data-reveal className="glass glass-hover p-7 transition-all duration-500 sm:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-semibold">{x.role}</h3>
                  <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-cyan">
                    {x.org} · {x.loc}
                  </p>
                </div>
                <span className="font-mono text-[0.65rem] tracking-[0.24em] text-magenta">{x.range}</span>
              </div>
              <div data-line className="hairline my-6" />
              <ul className="space-y-3">
                {x.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-muted-foreground">
                    <span className="mt-1 font-mono text-xs text-magenta">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* PROJECTS — horizontal rail */}
        <section id="projects" ref={railRef} className="relative overflow-hidden py-10">
          <div className="px-5 sm:px-8 lg:pl-40 lg:pr-24">
            <SectionLabel index="03" title="Archive" tint="var(--neon-amber)" />
          </div>
          <div ref={trackRef} className="flex gap-6 px-5 sm:px-8 lg:pl-40 lg:pr-24">
            {PROJECTS.map((p) => (
              <article
                key={p.id}
                className="proj-card glass glass-hover group relative flex w-[86vw] shrink-0 flex-col justify-between p-7 transition-all duration-500 sm:w-[62vw] lg:w-[38vw] lg:p-9"
                style={{ minHeight: 420 }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }}
                />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[3.2rem] font-black leading-none opacity-15">{p.id}</span>
                    <span className="tag" style={{ borderColor: p.accent, color: p.accent }}>
                      {p.kind}
                    </span>
                  </div>
                  <h3
                    className="chroma mt-6 text-3xl font-bold leading-tight lg:text-4xl"
                    data-text={p.title}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
                <div className="mt-8">
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="tag">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div
                    className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.24em]"
                    style={{ color: p.accent }}
                  >
                    ◆ {p.metric}
                  </div>
                </div>
              </article>
            ))}
            <div className="hidden w-24 shrink-0 lg:block" />
          </div>
        </section>

        {/* STACK */}
        <section id="stack" className="px-5 py-28 sm:px-8 lg:pl-40 lg:pr-24">
          <SectionLabel index="04" title="Systems" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STACK.map((s) => (
              <div key={s.g} data-reveal className="glass glass-hover p-6 transition-all duration-500">
                <div className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-magenta">{s.g}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <span key={i} className="text-sm text-muted-foreground">
                      {i}
                      <span className="px-2 text-cyan/40">/</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PATH */}
        <section id="path" className="px-5 py-28 sm:px-8 lg:pl-40 lg:pr-24">
          <SectionLabel index="05" title="Timeline" tint="var(--neon-magenta)" />
          <div className="relative pl-8">
            <div className="spine absolute left-[3px] top-1 h-full w-px bg-gradient-to-b from-cyan via-magenta to-transparent" />
            {PATH.map((p) => (
              <div key={p.t + p.e} data-reveal className="relative mb-9">
                <span className="absolute -left-8 top-1.5 block h-[7px] w-[7px] rounded-full bg-cyan shadow-[0_0_14px_var(--neon-cyan)]" />
                <div className="font-mono text-[0.65rem] tracking-[0.3em] text-magenta">{p.t}</div>
                <div className="mt-1 text-lg text-foreground/90">{p.e}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="px-5 pb-28 pt-20 sm:px-8 lg:pl-40 lg:pr-24">
          <SectionLabel index="06" title="Uplink" tint="var(--neon-amber)" />
          <div data-reveal className="glass p-8 sm:p-14">
            <h3 className="text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl">
              LET'S BUILD SOMETHING
              <br />
              <span className="text-magenta neon-mag-glow">WORTH LOOKING AT.</span>
            </h3>
            <div data-line className="hairline my-9" />
            <div className="grid gap-6 sm:grid-cols-2">
              {LINKS.map((l) =>
                l.href ? (
                  <a
                    key={l.k}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center justify-between border-b border-border/50 pb-3 transition-colors hover:border-cyan"
                  >
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
                      {l.k}
                    </span>
                    <span className="text-base transition-colors group-hover:text-cyan">{l.v} ↗</span>
                  </a>
                ) : (
                  <div key={l.k} className="flex items-center justify-between border-b border-border/50 pb-3">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
                      {l.k}
                    </span>
                    <span className="text-base text-muted-foreground">{l.v}</span>
                  </div>
                )
              )}
            </div>
            <a
              data-magnet
              href="mailto:asmaan.dev@gmail.com"
              className="mt-12 inline-flex items-center gap-3 bg-cyan px-8 py-4 font-mono text-[0.72rem] uppercase tracking-[0.26em] text-primary-foreground"
            >
              ▸ Transmit message
            </a>
          </div>

          <footer className="mt-14 flex flex-wrap items-center justify-between gap-3 font-mono text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground">
            <span>© {new Date().getFullYear()} M. MOHAMED ASMAAN</span>
            <span>BUILT WITH REACT · GSAP · WEBGL</span>
          </footer>
        </section>
        </div>
      </main>
    </div>
  );
}
