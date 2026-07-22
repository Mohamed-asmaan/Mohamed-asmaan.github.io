import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Lenis from "lenis";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M. Mohamed Asmaan — Frontend Engineer" },
      { name: "description", content: "React engineer & creative developer. Cinematic, retro-futurist interfaces from Bengaluru." },
      { property: "og:title", content: "M. Mohamed Asmaan — Frontend Engineer" },
      { property: "og:description", content: "React engineer & creative developer. Cinematic, retro-futurist interfaces." },
    ],
  }),
  component: Portfolio,
});

/* ---------- data ---------- */
const NAV = ["hero", "about", "experience", "projects", "skills", "timeline", "stack", "log", "contact"];

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
      "Built reusable component library reducing duplicated code across product areas.",
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
    body: "900+ multilingual healthcare pages rendered without perf degradation. Conditional RTL for Arabic, EN/AR language switch, modular content APIs.",
  },
  {
    id: "02",
    title: "Number Link",
    kind: "Conversational UI Platform",
    stack: ["React", "TypeScript", "Firebase", "Node.js"],
    metric: "100+ msg chat state",
    body: "Replaced traditional forms with a conversational React UI. Complex chat history state without lag. Firebase auth + Realtime DB, dynamic routing to live profiles.",
  },
  {
    id: "03",
    title: "Pizza Palace",
    kind: "Full-Stack MERN",
    stack: ["React", "Redux Toolkit", "Express", "MongoDB", "Razorpay"],
    metric: "End-to-end shipped",
    body: "Complete food-ordering system built solo. DB schema, CRUD API, JWT auth, Razorpay integration with signature verification.",
  },
  {
    id: "04",
    title: "SEO DOM Inspector",
    kind: "Chrome Extension",
    stack: ["React", "JS", "Chrome APIs"],
    metric: "15+ DOM signals · non-blocking",
    body: "Browser extension inspecting structural DOM signals in real time without blocking the main thread.",
  },
];

const SKILLS = [
  { g: "core", items: ["React.js", "TypeScript", "JavaScript ES6+", "HTML5", "CSS3"] },
  { g: "state / patterns", items: ["Hooks", "Context API", "Memoisation", "Reconciliation", "Redux Toolkit"] },
  { g: "styling", items: ["Tailwind", "Bootstrap", "Responsive", "CSS Modules"] },
  { g: "data", items: ["REST", "GraphQL", "Firebase RTDB", "JWT / OTP"] },
  { g: "tooling", items: ["Vite", "Webpack", "Git", "Postman", "Figma", "Chrome DevTools"] },
  { g: "cs", items: ["DSA", "Event loop", "Closures", "Async/await", "Debounce/Throttle", "OOP"] },
];

const TIMELINE = [
  { t: "2019", e: "B.E. Computer Science — Anna University, Chennai" },
  { t: "2023", e: "Graduated. Began production frontend work." },
  { t: "2024", e: "Joined Alspark Solutions as Frontend Engineer (React.js)." },
  { t: "2024", e: "Started MCA at SRM Institute of Science and Technology." },
  { t: "2026", e: "MERN bootcamp — Error Makes Clever." },
];

const LOG = [
  "boot: system online",
  "load: /portfolio/asmaan @ 60fps",
  "mount: hooks · context · reconciler",
  "net: rest-api handshake ok",
  "gpu: composite layers ready",
  "user: hello, world.",
];

/* ---------- helpers ---------- */
function useScramble(target: string, active: boolean, speed = 24) {
  const [out, setOut] = useState(target);
  useEffect(() => {
    if (!active) { setOut(target); return; }
    const chars = "!@#$%&*?/{}[]<>=+-_";
    let f = 0;
    const iv = window.setInterval(() => {
      f++;
      setOut(
        target
          .split("")
          .map((c, i) => (i < f / 2 ? c : c === " " ? " " : chars[(Math.random() * chars.length) | 0]))
          .join("")
      );
      if (f / 2 >= target.length) window.clearInterval(iv);
    }, speed);
    return () => window.clearInterval(iv);
  }, [target, active, speed]);
  return out;
}

/* ---------- component ---------- */
function Portfolio() {
  const scope = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");
  const [booted, setBooted] = useState(false);

  // clock
  useEffect(() => {
    const upd = () => {
      const d = new Date();
      const fmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
      }).format(d);
      setTime(fmt);
    };
    upd();
    const iv = window.setInterval(upd, 1000);
    return () => window.clearInterval(iv);
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let rafId = 0;
    const raf = (t: number) => { lenis.raf(t); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  // cursor + mouse light
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursor.current) {
        cursor.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // boot animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setBooted(true) });
      tl.from("[data-boot-line]", { opacity: 0, y: 8, stagger: 0.08, duration: 0.3, ease: "power2.out" })
        .to("[data-boot-screen]", { opacity: 0, duration: 0.6, delay: 0.3, pointerEvents: "none" }, ">")
        .from("[data-hero-name] .word", { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.09 }, "-=0.3")
        .from("[data-hero-meta]", { opacity: 0, y: 12, stagger: 0.06, duration: 0.5, ease: "power2.out" }, "-=0.7");

      // scroll reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          opacity: 0, y: 24, duration: 0.9, ease: "expo.out",
        });
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  // dynamic ScrollTrigger register
  useEffect(() => {
    let mounted = true;
    import("gsap/ScrollTrigger").then((m) => {
      if (!mounted) return;
      gsap.registerPlugin(m.ScrollTrigger);
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          opacity: 0, y: 24, duration: 1, ease: "expo.out",
        });
      });
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div ref={scope} className="relative min-h-screen text-foreground crt-flicker">
      {/* CRT overlays */}
      <div className="scanlines noise vignette pointer-events-none fixed inset-0 z-40" aria-hidden />
      {/* mouse phosphor light */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--phosphor) 8%, transparent), transparent 60%)",
        }}
      />
      {/* custom cursor */}
      <div
        ref={cursor}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color-mix(in_oklab,var(--phosphor)_60%,transparent)] mix-blend-difference md:block"
        style={{ boxShadow: "0 0 20px color-mix(in oklab, var(--phosphor) 40%, transparent)" }}
      />

      {/* boot screen */}
      <div
        data-boot-screen
        className="fixed inset-0 z-[60] flex items-end justify-start bg-background p-8 text-xs text-phosphor"
      >
        <div className="space-y-1 glow-phosphor">
          {LOG.map((l, i) => (
            <div key={i} data-boot-line>
              <span className="text-muted-foreground">[{String(i).padStart(2, "0")}]</span> {l}
            </div>
          ))}
        </div>
      </div>

      {/* nav */}
      <header className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-border/60 bg-background/70 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-phosphor" style={{ boxShadow: "0 0 8px var(--phosphor)" }} />
          <span className="text-foreground">M.A / OS.v2035</span>
        </div>
        <nav className="hidden gap-6 md:flex">
          {NAV.slice(1).map((n) => (
            <a key={n} href={`#${n}`} className="link-under hover:text-foreground">
              {n}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <span>BLR · IN</span>
          <span className="tabular-nums text-foreground">{time}</span>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1400px] px-6 pt-24">
        <Hero booted={booted} time={time} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Timeline />
        <Stack />
        <SystemLog />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

/* ---------- sections ---------- */
function SectionLabel({ id, n, t }: { id: string; n: string; t: string }) {
  return (
    <div id={id} className="mb-10 flex items-baseline justify-between border-b border-border pb-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
      <span>
        <span className="text-phosphor">§ {n}</span> &nbsp;/&nbsp; {t}
      </span>
      <span className="opacity-60">./{id}</span>
    </div>
  );
}

function Hero({ booted, time }: { booted: boolean; time: string }) {
  const prompt = useScramble("compose interfaces at 60fps.", booted, 20);
  return (
    <section id="hero" className="relative min-h-[92vh] pt-10">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8">
          <div data-hero-meta className="mb-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="text-phosphor">●</span> available · portfolio v2035.07
          </div>

          <h1
            data-hero-name
            className="font-display font-black leading-[0.82] tracking-[-0.05em] text-foreground glow-soft"
            style={{ fontSize: "clamp(3.5rem, 12vw, 12rem)" }}
          >
            <div className="overflow-hidden"><div className="word">MOHAMED</div></div>
            <div className="overflow-hidden"><div className="word text-phosphor glow-phosphor">ASMAAN.</div></div>
          </h1>

          <div data-hero-meta className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Frontend engineer &amp; creative developer. I build production React interfaces with the
            restraint of industrial design and the pacing of cinema — currently owning UI end-to-end
            at <span className="text-foreground">Alspark Solutions</span>, Bengaluru.
          </div>

          <div data-hero-meta className="mt-10 flex flex-wrap items-center gap-3 text-xs">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 border border-phosphor/60 bg-phosphor/5 px-5 py-3 text-phosphor transition hover:bg-phosphor hover:text-background"
            >
              <span className="tabular-nums">[01]</span> view case studies
              <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-border px-5 py-3 text-foreground transition hover:border-foreground"
            >
              <span className="tabular-nums text-muted-foreground">[02]</span> open channel
            </a>
          </div>

          <div data-hero-meta className="mt-14 flex items-center gap-2 text-sm text-phosphor glow-phosphor">
            <span className="text-muted-foreground">$</span>
            <span className="cursor-blink">{prompt}</span>
          </div>
        </div>

        {/* side panel */}
        <aside data-hero-meta className="col-span-12 md:col-span-4">
          <div className="panel relative overflow-hidden p-5">
            <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              <span>sys.status</span>
              <span className="flex gap-1">
                <i className="h-2 w-2 rounded-full bg-amber" />
                <i className="h-2 w-2 rounded-full bg-cyan" />
                <i className="h-2 w-2 rounded-full bg-phosphor" />
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-y-3 text-xs">
              <dt className="text-muted-foreground">operator</dt><dd>m.mohamed.asmaan</dd>
              <dt className="text-muted-foreground">role</dt><dd>frontend engineer</dd>
              <dt className="text-muted-foreground">location</dt><dd>bengaluru · IN</dd>
              <dt className="text-muted-foreground">timezone</dt><dd>IST · UTC+5:30</dd>
              <dt className="text-muted-foreground">local time</dt><dd className="tabular-nums text-phosphor">{time}</dd>
              <dt className="text-muted-foreground">uptime</dt><dd>2+ yrs prod</dd>
              <dt className="text-muted-foreground">focus</dt><dd>React · TS · motion</dd>
              <dt className="text-muted-foreground">status</dt><dd className="text-phosphor">◉ online</dd>
            </dl>

            <div className="mt-6 border-t border-border pt-4">
              <div className="mb-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">frame.rate</div>
              <div className="flex items-end gap-[3px] h-10">
                {Array.from({ length: 48 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1 bg-phosphor/70"
                    style={{ height: `${20 + Math.abs(Math.sin((i + 1) * 0.7)) * 80}%`, opacity: 0.35 + Math.random() * 0.5 }}
                  />
                ))}
              </div>
              <div className="mt-2 text-[10px] text-muted-foreground">60.00 fps · main thread idle</div>
            </div>
          </div>
        </aside>
      </div>

      {/* scroll indicator */}
      <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>scroll ↓</span>
        <span>index / 09</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-40" data-reveal>
      <SectionLabel id="about" n="01" t="about the operator" />
      <div className="grid grid-cols-12 gap-6">
        <p className="col-span-12 font-display text-3xl leading-tight tracking-tight md:col-span-8 md:text-5xl">
          I design and engineer the <span className="text-phosphor">quiet, exacting parts</span> of software —
          the interfaces users don't have to think about. Two years of shipping React in production,
          with a bias toward performance, motion that has intent, and code someone else can maintain.
        </p>
        <div className="col-span-12 space-y-6 text-sm text-muted-foreground md:col-span-4">
          <div>
            <div className="mb-1 text-[10px] uppercase tracking-[0.24em] text-phosphor">discipline</div>
            React internals: hooks, context, memoisation, reconciliation & diffing. Debugging as a first-class craft.
          </div>
          <div>
            <div className="mb-1 text-[10px] uppercase tracking-[0.24em] text-phosphor">taste</div>
            Industrial design over decoration. Motion that carries meaning. Typography as UI.
          </div>
          <div>
            <div className="mb-1 text-[10px] uppercase tracking-[0.24em] text-phosphor">currently</div>
            MCA @ SRM · MERN bootcamp @ Error Makes Clever · shipping @ Alspark.
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="py-40" data-reveal>
      <SectionLabel id="experience" n="02" t="experience.log" />
      <div className="grid grid-cols-12 gap-6">
        {EXPERIENCE.map((x) => (
          <article key={x.role} className="panel col-span-12 p-6 md:p-10">
            <header className="mb-6 grid grid-cols-12 items-baseline gap-3 border-b border-border pb-4">
              <div className="col-span-12 md:col-span-8">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{x.range} · {x.loc}</div>
                <h3 className="mt-2 font-display text-3xl tracking-tight md:text-5xl">{x.role}</h3>
                <div className="mt-1 text-phosphor">@ {x.org}</div>
              </div>
              <div className="col-span-12 flex items-center justify-end gap-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground md:col-span-4">
                <span className="h-1.5 w-1.5 rounded-full bg-phosphor" style={{ boxShadow: "0 0 6px var(--phosphor)" }} />
                active tenure
              </div>
            </header>
            <ul className="grid gap-4 text-sm md:grid-cols-2">
              {x.bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 text-phosphor">→</span>
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [open, setOpen] = useState<string | null>("01");
  return (
    <section className="py-40" data-reveal>
      <SectionLabel id="projects" n="03" t="selected works / floating panels" />
      <div className="space-y-3">
        {PROJECTS.map((p) => {
          const isOpen = open === p.id;
          return (
            <article
              key={p.id}
              className={`group panel relative cursor-pointer overflow-hidden p-6 transition-[background,transform] duration-500 hover:-translate-y-[2px] ${isOpen ? "bg-surface" : ""}`}
              onClick={() => setOpen(isOpen ? null : p.id)}
            >
              <header className="grid grid-cols-12 items-center gap-3">
                <div className="col-span-2 font-mono text-xs tabular-nums text-muted-foreground md:col-span-1">{p.id}</div>
                <div className="col-span-10 md:col-span-5">
                  <h3 className="font-display text-2xl tracking-tight transition group-hover:text-phosphor md:text-4xl">{p.title}</h3>
                </div>
                <div className="col-span-6 hidden text-xs text-muted-foreground md:col-span-3 md:block">{p.kind}</div>
                <div className="col-span-6 hidden text-right text-xs text-phosphor md:col-span-2 md:block">{p.metric}</div>
                <div className="col-span-2 flex items-center justify-end text-lg md:col-span-1">
                  <span className={`transition-transform duration-500 ${isOpen ? "rotate-45 text-phosphor" : "text-muted-foreground"}`}>+</span>
                </div>
              </header>

              <div
                className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(.7,0,.2,1)]"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
              >
                <div className="min-h-0">
                  <div className="mt-6 grid grid-cols-12 gap-6 border-t border-border pt-6">
                    <p className="col-span-12 text-sm text-muted-foreground md:col-span-7">{p.body}</p>
                    <div className="col-span-12 md:col-span-5">
                      <div className="mb-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">stack</div>
                      <div className="flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <span key={s} className="border border-border px-2 py-1 text-xs text-foreground">{s}</span>
                        ))}
                      </div>
                      <div className="mt-6 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">metric</div>
                      <div className="mt-1 text-phosphor glow-phosphor">{p.metric}</div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="py-40" data-reveal>
      <SectionLabel id="skills" n="04" t="modules / capability matrix" />
      <div className="grid grid-cols-12 gap-3">
        {SKILLS.map((g, gi) => (
          <div key={g.g} className="panel col-span-12 p-5 sm:col-span-6 lg:col-span-4">
            <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              <span>mod.{String(gi).padStart(2, "0")}</span>
              <span className="text-phosphor">{g.g}</span>
            </div>
            <ul className="space-y-2 text-sm">
              {g.items.map((it) => (
                <li key={it} className="group flex items-center justify-between border-b border-border/50 py-1">
                  <span className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-phosphor transition group-hover:scale-[3]" />
                    {it}
                  </span>
                  <span className="text-[10px] text-muted-foreground opacity-0 transition group-hover:opacity-100">active</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="py-40" data-reveal>
      <SectionLabel id="timeline" n="05" t="timeline / system journal" />
      <div className="relative">
        <div className="absolute left-[7.5rem] top-0 hidden h-full w-px bg-border md:block" />
        <ol className="space-y-6">
          {TIMELINE.map((r, i) => (
            <li key={i} className="grid grid-cols-12 items-center gap-4 text-sm">
              <div className="col-span-3 tabular-nums text-phosphor md:col-span-2">{r.t}</div>
              <div className="relative col-span-1 hidden md:block">
                <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-phosphor" style={{ boxShadow: "0 0 8px var(--phosphor)" }} />
              </div>
              <div className="col-span-9 border-l border-border pl-4 text-foreground md:col-span-9 md:border-0 md:pl-0">
                <span className="text-muted-foreground">[log]</span> {r.e}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stack() {
  const items = ["React", "TypeScript", "JavaScript", "Tailwind", "Vite", "Node.js", "Express", "MongoDB", "Firebase", "GSAP", "Redux", "Figma"];
  return (
    <section className="py-40" data-reveal>
      <SectionLabel id="stack" n="06" t="tech stack / marquee" />
      <div className="relative overflow-hidden border-y border-border py-8">
        <div className="flex gap-14 whitespace-nowrap font-display text-5xl tracking-tight text-foreground md:text-7xl" style={{ animation: "marq 40s linear infinite" }}>
          {[...items, ...items, ...items].map((s, i) => (
            <span key={i} className="opacity-80 hover:text-phosphor">
              {s} <span className="text-phosphor">✦</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marq { to { transform: translateX(-33.333%); } }`}</style>
    </section>
  );
}

function SystemLog() {
  const posts = [
    { d: "2026.05", t: "Notes on Reconciliation", s: "How React's diffing shaped my mental model of components." },
    { d: "2026.03", t: "Motion With Restraint", s: "Why animation should be a spec, not a decoration." },
    { d: "2025.11", t: "Shipping Multilingual", s: "Lessons from 900+ pages, EN/AR, and 2M monthly reads." },
  ];
  return (
    <section className="py-40" data-reveal>
      <SectionLabel id="log" n="07" t="notes / journal (soon)" />
      <div className="grid grid-cols-12 gap-3">
        {posts.map((p) => (
          <article key={p.t} className="panel col-span-12 flex flex-col justify-between p-6 md:col-span-4 min-h-[220px]">
            <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{p.d} · draft</div>
            <h3 className="mt-6 font-display text-2xl tracking-tight">{p.t}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{p.s}</p>
            <div className="mt-6 text-xs text-phosphor">read → soon</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [line, setLine] = useState("");
  const [history, setHistory] = useState<string[]>([
    "channel@asmaan:~ $ open --contact",
    "session established. type 'help' for commands.",
  ]);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = line.trim().toLowerCase();
    const reply: string[] = [`> ${line}`];
    if (cmd === "help") reply.push("commands: email, github, linkedin, cv, clear");
    else if (cmd === "email") { reply.push("→ asmaan011@gmail.com"); window.location.href = "mailto:asmaan011@gmail.com"; }
    else if (cmd === "github") { reply.push("→ github.com/Mohamed-asmaan"); window.open("https://github.com/Mohamed-asmaan", "_blank"); }
    else if (cmd === "linkedin") { reply.push("→ linkedin.com/in/mohamed-asmaan"); window.open("https://linkedin.com/in/mohamed-asmaan", "_blank"); }
    else if (cmd === "cv") reply.push("cv available on request.");
    else if (cmd === "clear") { setHistory([]); setLine(""); return; }
    else reply.push(`unknown: '${line}'. try 'help'.`);
    setHistory((h) => [...h, ...reply]);
    setLine("");
  };
  return (
    <section className="py-40" data-reveal>
      <SectionLabel id="contact" n="08" t="open a channel" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7">
          <h2 className="font-display text-5xl leading-[0.9] tracking-tight md:text-7xl">
            let's build <br /><span className="text-phosphor glow-phosphor">something quiet</span> <br />that ships loud.
          </h2>
          <div className="mt-8 space-y-2 text-sm text-muted-foreground">
            <div><span className="text-phosphor">◉</span> available for freelance & full-time (React / frontend).</div>
            <div><span className="text-phosphor">◉</span> comfortable owning UI end-to-end.</div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:asmaan011@gmail.com" className="link-under text-foreground">asmaan011@gmail.com</a>
            <span className="text-muted-foreground">·</span>
            <a href="https://github.com/Mohamed-asmaan" target="_blank" rel="noreferrer" className="link-under text-foreground">github</a>
            <span className="text-muted-foreground">·</span>
            <a href="https://linkedin.com/in/mohamed-asmaan" target="_blank" rel="noreferrer" className="link-under text-foreground">linkedin</a>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5">
          <div className="panel h-full p-4">
            <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              <span>terminal · /contact</span>
              <span className="flex gap-1">
                <i className="h-2 w-2 rounded-full bg-amber" />
                <i className="h-2 w-2 rounded-full bg-cyan" />
                <i className="h-2 w-2 rounded-full bg-phosphor" />
              </span>
            </div>
            <div className="max-h-64 min-h-[220px] space-y-1 overflow-y-auto text-xs text-foreground">
              {history.map((h, i) => (
                <div key={i} className={h.startsWith(">") ? "text-phosphor" : "text-muted-foreground"}>{h}</div>
              ))}
            </div>
            <form onSubmit={submit} className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-xs">
              <span className="text-phosphor">$</span>
              <input
                autoComplete="off"
                value={line}
                onChange={(e) => setLine(e.target.value)}
                placeholder="type 'help'"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-border py-8 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6 md:col-span-4">© {new Date().getFullYear()} · m. mohamed asmaan</div>
        <div className="col-span-6 md:col-span-4 md:text-center">portfolio v2035.07 · built with react + gsap</div>
        <div className="col-span-12 text-left md:col-span-4 md:text-right">end of transmission ▊</div>
      </div>
    </footer>
  );
}
