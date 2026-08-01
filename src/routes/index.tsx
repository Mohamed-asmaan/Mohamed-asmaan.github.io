import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Lenis from "lenis";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M. Mohamed Asmaan — Frontend Engineer & Interface Craftsman" },
      {
        name: "description",
        content:
          "Lo-fi workspace portfolio of M. Mohamed Asmaan — React & TypeScript engineer in Bengaluru building calm, fast, production interfaces.",
      },
      { property: "og:title", content: "M. Mohamed Asmaan — Frontend Engineer" },
      {
        property: "og:description",
        content: "React & TypeScript engineer. Calm interfaces, fast products, lo-fi workspace vibes.",
      },
    ],
  }),
  component: Portfolio,
});

/* ---------------- data ---------------- */

const SECTIONS = [
  { id: "home", label: "home", glyph: "◉" },
  { id: "about", label: "readme", glyph: "◒" },
  { id: "work", label: "work", glyph: "◈" },
  { id: "projects", label: "projects", glyph: "◇" },
  { id: "stack", label: "stack", glyph: "◍" },
  { id: "path", label: "path", glyph: "◌" },
  { id: "contact", label: "contact", glyph: "◎" },
];

const EXPERIENCE = [
  {
    role: "Frontend Engineer — React.js",
    org: "Alspark Solutions",
    range: "2024 — Present",
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
    metric: "2.02M / mo impressions",
    accent: "mint",
    body: "900+ multilingual healthcare pages rendered without perf degradation. Conditional RTL for Arabic, EN/AR switching, modular content APIs.",
  },
  {
    id: "02",
    title: "Number Link",
    kind: "Conversational UI Platform",
    stack: ["React", "TypeScript", "Firebase", "Node.js"],
    metric: "100+ msg chat state",
    accent: "blurple",
    body: "Replaced traditional forms with a conversational React UI. Complex chat history state without lag. Firebase auth + Realtime DB, dynamic routing to live profiles.",
  },
  {
    id: "03",
    title: "Pizza Palace",
    kind: "Full-Stack MERN",
    stack: ["React", "Redux Toolkit", "Express", "MongoDB", "Razorpay"],
    metric: "shipped end-to-end, solo",
    accent: "peach",
    body: "Complete food-ordering system built alone: DB schema, CRUD API, JWT auth, and Razorpay integration with signature verification.",
  },
  {
    id: "04",
    title: "SEO DOM Inspector",
    kind: "Chrome Extension",
    stack: ["React", "JavaScript", "Chrome APIs"],
    metric: "15+ DOM signals · non-blocking",
    accent: "lilac",
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

const TRACKS = [
  { name: "midnight refactor", artist: "sleep.exe", len: "3:42" },
  { name: "rain on the keycaps", artist: "lofi.dev", len: "4:08" },
  { name: "coffee & closures", artist: "async waves", len: "2:57" },
];

const STATUS = [
  { k: "status", v: "open to work", tone: "mint" },
  { k: "based", v: "Bengaluru, IN", tone: "lilac" },
  { k: "focus", v: "React · TypeScript", tone: "peach" },
];

/* ---------------- small pieces ---------------- */

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(el, { opacity: 0, y: 26 });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.9, delay, ease: "power3.out" });
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function SectionHead({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-blurple">{index}</span>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      <p className="font-mono text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

function NowPlaying() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => setI((p) => (p + 1) % TRACKS.length), 9000);
    return () => window.clearInterval(t);
  }, [playing]);
  const track = TRACKS[i];
  return (
    <div className="card-soft flex items-center gap-3 p-3">
      <button
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "Pause the lo-fi mix" : "Play the lo-fi mix"}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-mint transition-colors hover:bg-muted"
      >
        {playing ? "❙❙" : "▶"}
      </button>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">now playing</p>
        <p className="truncate text-sm font-medium">{track.name}</p>
        <p className="truncate font-mono text-xs text-muted-foreground">
          {track.artist} · {track.len}
        </p>
      </div>
      <div className="eq flex h-4 items-end gap-[3px]" style={{ opacity: playing ? 1 : 0.25 }} aria-hidden>
        <span /><span /><span /><span />
      </div>
    </div>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

/* ---------------- page ---------------- */

function Portfolio() {
  const active = useActiveSection();
  const [open, setOpen] = useState<string | null>("02");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    tick();
    const t = window.setInterval(tick, 20000);
    return () => window.clearInterval(t);
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="grain min-h-screen">
      {/* top status bar */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-blurple font-mono text-sm font-bold text-primary-foreground">
              ma
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">M. Mohamed Asmaan</p>
              <p className="font-mono text-[0.68rem] text-muted-foreground">frontend engineer</p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                  active === s.id ? "bg-surface-2 text-foreground" : "text-muted-foreground hover:bg-surface hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
          <div className="hidden items-center gap-2 font-mono text-xs text-muted-foreground sm:flex">
            <span className="h-2 w-2 rounded-full bg-mint" style={{ animation: "blink 2.4s infinite" }} />
            IST {time}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-8">
        {/* hero */}
        <section id="home" className="grid gap-6 py-14 lg:grid-cols-[1.6fr_1fr] lg:py-20">
          <Reveal className="card-soft relative overflow-hidden p-7 sm:p-10">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-peach" />
              <span className="h-3 w-3 rounded-full bg-mint" />
              <span className="h-3 w-3 rounded-full bg-blurple" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">~/asmaan — workspace</span>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-blurple">react · typescript · interfaces</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              I build calm software
              <br />
              <span className="text-lilac">that loads fast</span> and
              <br />
              feels effortless.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Frontend engineer in Bengaluru. I turn dense product requirements into interfaces people actually enjoy
              using — accessible, responsive, and tuned down to the re-render.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => go("projects")}
                className="glow-blurple rounded-xl bg-blurple px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                See the work
              </button>
              <button
                onClick={() => go("contact")}
                className="rounded-xl border border-border bg-surface-2 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Say hello
              </button>
            </div>
            <div className="mt-9 flex flex-wrap gap-2">
              {STATUS.map((s) => (
                <span key={s.k} className="chip">
                  <span className="text-muted-foreground">{s.k}:</span>
                  <span className={`text-${s.tone}`}>{s.v}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <NowPlaying />
            </Reveal>
            <Reveal delay={0.16} className="card-soft flex-1 p-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">this week</p>
              <div className="mt-4 space-y-4">
                {[
                  { k: "shipping", v: "component library v2", tone: "text-mint" },
                  { k: "reading", v: "React reconciler internals", tone: "text-lilac" },
                  { k: "learning", v: "MCA · SRM Institute", tone: "text-peach" },
                ].map((r) => (
                  <div key={r.k} className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-3 last:border-0">
                    <span className="font-mono text-xs text-muted-foreground">{r.k}</span>
                    <span className={`text-right text-sm ${r.tone}`}>{r.v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* about */}
        <section id="about" className="py-16">
          <SectionHead index="01" title="readme.md" note="who's behind the keyboard" />
          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal className="card-soft p-7 lg:col-span-2">
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  I&apos;m <span className="text-foreground">Asmaan</span> — a React engineer who cares about the boring
                  parts: layout stability, keyboard access, bundle weight, and the 200ms that decide whether a product
                  feels premium or cheap.
                </p>
                <p>
                  At Alspark Solutions I own UI modules from Figma handoff through API integration to deploy. Outside
                  work I build small tools, break things on purpose, and keep a lo-fi playlist running.
                </p>
                <p className="font-mono text-sm text-foreground">
                  <span className="text-blurple">const</span> philosophy ={" "}
                  <span className="text-peach">&quot;fewer elements, better motion, zero jank&quot;</span>;
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="card-soft p-7">
              <div className="grid grid-cols-2 gap-5">
                {[
                  { n: "2.02M", l: "monthly impressions" },
                  { n: "30%", l: "fewer re-renders" },
                  { n: "900+", l: "pages shipped" },
                  { n: "4+", l: "products in prod" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-2xl font-semibold tracking-tight text-lilac">{s.n}</p>
                    <p className="mt-1 font-mono text-[0.68rem] leading-snug text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* work */}
        <section id="work" className="py-16">
          <SectionHead index="02" title="where I work" note="current role" />
          {EXPERIENCE.map((x) => (
            <Reveal key={x.org} className="card-soft p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{x.role}</h3>
                  <p className="font-mono text-sm text-blurple">{x.org}</p>
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  {x.range} · {x.loc}
                </p>
              </div>
              <ul className="mt-5 space-y-3">
                {x.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </section>

        {/* projects */}
        <section id="projects" className="py-16">
          <SectionHead index="03" title="selected projects" note="click a card to expand" />
          <div className="grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((p, i) => {
              const isOpen = open === p.id;
              return (
                <Reveal key={p.id} delay={i * 0.06}>
                  <button
                    onClick={() => setOpen(isOpen ? null : p.id)}
                    aria-expanded={isOpen}
                    className={`card-soft group w-full p-6 text-left transition-all duration-300 hover:-translate-y-1 ${
                      isOpen ? "glow-blurple" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs text-muted-foreground">{p.id}</p>
                        <h3 className={`mt-1 text-lg font-semibold text-${p.accent}`}>{p.title}</h3>
                        <p className="font-mono text-xs text-muted-foreground">{p.kind}</p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground transition-transform group-hover:translate-x-0.5">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                    <div
                      className="grid transition-[grid-template-rows,opacity] duration-500"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                    >
                      <div className="overflow-hidden">
                        <p className="pt-4 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {p.stack.map((s) => (
                        <span key={s} className="chip">
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 font-mono text-xs text-mint">{p.metric}</p>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* stack */}
        <section id="stack" className="py-16">
          <SectionHead index="04" title="toolbox" note="what I reach for" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STACK.map((g, i) => (
              <Reveal key={g.g} delay={i * 0.05} className="card-soft h-full p-6">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-blurple">{g.g}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span key={it} className="chip">
                      {it}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* path */}
        <section id="path" className="py-16">
          <SectionHead index="05" title="the path so far" note="commit history" />
          <Reveal className="card-soft p-7">
            <ol className="relative space-y-7 border-l border-border pl-7">
              {PATH.map((p) => (
                <li key={p.t + p.e} className="relative">
                  <span className="absolute -left-[2.05rem] top-1.5 h-2.5 w-2.5 rounded-full bg-blurple ring-4 ring-background" />
                  <p className="font-mono text-xs text-peach">{p.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.e}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        {/* contact */}
        <section id="contact" className="py-16">
          <SectionHead index="06" title="say hello" note="replies within a day" />
          <Reveal className="card-soft overflow-hidden">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-2xl font-semibold tracking-tight">
                  Got a product that deserves a better interface?
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Freelance, full-time, or just a chat about React internals and good typography — my inbox is open.
                </p>
                <a
                  href="mailto:asmaan@example.com"
                  className="glow-blurple mt-7 inline-block rounded-xl bg-blurple px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  asmaan@example.com
                </a>
              </div>
              <div className="border-t border-border bg-surface-2/50 p-8 md:border-l md:border-t-0">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">elsewhere</p>
                <ul className="mt-5 space-y-4 font-mono text-sm">
                  {[
                    { l: "github", v: "/asmaan", h: "https://github.com" },
                    { l: "linkedin", v: "/in/asmaan", h: "https://linkedin.com" },
                    { l: "location", v: "Bengaluru, India", h: null },
                  ].map((r) => (
                    <li key={r.l} className="flex items-baseline justify-between gap-3">
                      <span className="text-muted-foreground">{r.l}</span>
                      {r.h ? (
                        <a href={r.h} target="_blank" rel="noreferrer" className="link-under text-lilac">
                          {r.v}
                        </a>
                      ) : (
                        <span className="text-foreground">{r.v}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-8 font-mono text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} M. Mohamed Asmaan</span>
          <span>built with react · tuned by ear</span>
        </footer>
      </div>

      {/* mobile dock */}
      <nav className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-border bg-background/85 px-2 py-2 backdrop-blur-xl md:hidden">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            aria-label={s.label}
            className={`grid h-9 w-9 place-items-center rounded-xl text-sm transition-colors ${
              active === s.id ? "bg-blurple text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {s.glyph}
          </button>
        ))}
      </nav>
    </div>
  );
}
