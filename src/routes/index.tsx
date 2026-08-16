import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M. Mohamed Asmaan — Software Engineer, Frontend" },
      {
        name: "description",
        content:
          "Software engineer in Bengaluru working on React and TypeScript interfaces: performance, design systems, and product UI at scale.",
      },
      { property: "og:title", content: "M. Mohamed Asmaan — Software Engineer" },
      {
        property: "og:description",
        content: "React & TypeScript engineer focused on performance, accessibility, and product UI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

/* ---------------- data ---------------- */

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const EXPERIENCE = [
  {
    role: "Frontend Engineer, React",
    org: "Alspark Solutions",
    range: "2024 — Present",
    loc: "Bengaluru, India",
    bullets: [
      "Own UI modules end-to-end for a production conversational platform: design handoff, REST integration, release.",
      "Reduced unnecessary re-renders by ~30% through memoisation and reconciliation-aware refactors.",
      "Built a shared component library that removed duplicated UI code across product areas.",
      "Translate Figma specs into pixel-accurate, responsive, accessible React components.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Bangla Health Connect",
    kind: "Multilingual content platform",
    impact: "2.02M monthly impressions",
    stack: ["React", "Node.js", "REST"],
    body: "900+ multilingual healthcare pages served without performance regressions. Conditional RTL for Arabic, EN/AR switching, modular content APIs.",
  },
  {
    title: "Number Link",
    kind: "Conversational UI platform",
    impact: "100+ message chat state, no jank",
    stack: ["React", "TypeScript", "Firebase"],
    body: "Replaced form-based onboarding with a conversational interface. Handled long chat history state, Firebase auth and Realtime Database, dynamic profile routing.",
  },
  {
    title: "Pizza Palace",
    kind: "Full-stack MERN application",
    impact: "Shipped solo, end to end",
    stack: ["React", "Redux Toolkit", "Express", "MongoDB"],
    body: "Food ordering system built alone: schema design, CRUD API, JWT auth, and Razorpay payments with signature verification.",
  },
  {
    title: "SEO DOM Inspector",
    kind: "Chrome extension",
    impact: "15+ DOM signals, non-blocking",
    stack: ["React", "JavaScript", "Chrome APIs"],
    body: "Inspects structural DOM signals in real time from the extension surface without blocking the page's main thread.",
  },
];

const SKILLS = [
  { g: "Languages", items: ["TypeScript", "JavaScript (ES6+)", "HTML", "CSS", "SQL basics"] },
  { g: "Frameworks", items: ["React", "Redux Toolkit", "Node.js", "Express", "Tailwind CSS"] },
  { g: "Platform", items: ["REST", "GraphQL", "Firebase", "MongoDB", "JWT / OTP auth"] },
  { g: "Tooling", items: ["Vite", "Webpack", "Git", "Postman", "Chrome DevTools", "Figma"] },
  {
    g: "Fundamentals",
    items: ["Data structures", "Event loop", "Closures", "Async patterns", "Rendering performance"],
  },
];

const TOOL_ICON: Record<string, LucideIcon> = {
  TypeScript: FileCode2,
  "JavaScript (ES6+)": Braces,
  HTML: Code2,
  CSS: Palette,
  "SQL basics": Database,
  React: Atom,
  "Redux Toolkit": Repeat2,
  "Node.js": Hexagon,
  Express: Server,
  "Tailwind CSS": Wind,
  REST: Network,
  GraphQL: Share2,
  Firebase: Flame,
  MongoDB: Leaf,
  "JWT / OTP auth": KeyRound,
  Vite: Zap,
  Webpack: Package,
  Git: GitBranch,
  Postman: Send,
  "Chrome DevTools": Wrench,
  Figma: PenTool,
  "Data structures": Blocks,
  "Event loop": RefreshCw,
  Closures: Lock,
  "Async patterns": Hourglass,
  "Rendering performance": Gauge,
};


const EDUCATION = [
  { t: "2024 — Present", h: "MCA", s: "SRM Institute of Science and Technology" },
  { t: "2019 — 2023", h: "B.E. Computer Science", s: "Anna University, Chennai" },
  { t: "2026", h: "MERN Bootcamp", s: "Error Makes Clever" },
];

const FACTS = [
  { k: "Experience", v: "2+ yrs" },
  { k: "Location", v: "Bengaluru, IN" },
  { k: "Focus", v: "Frontend systems" },
  { k: "Open to", v: "SWE roles" },
];

/* ---------------- hooks ---------------- */

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.transition = "opacity .6s cubic-bezier(.2,.7,.2,1), transform .6s cubic-bezier(.2,.7,.2,1)";
          el.style.transitionDelay = `${Math.min(i, 6) * 60}ms`;
          el.style.opacity = "1";
          el.style.transform = "none";
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

/* ---------------- ui ---------------- */

function SectionTitle({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-b border-border pb-4">
      <span className="font-mono text-xs font-semibold text-muted-foreground">{index}</span>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {note ? <span className="ml-auto hidden font-mono text-xs text-muted-foreground sm:block">{note}</span> : null}
    </div>
  );
}

function SkillChip({ label }: { label: string }) {
  return (
    <span className="chip">
      <span aria-hidden="true">{TOOL_EMOJI[label] ?? "▸"}</span>
      <span>{label}</span>
    </span>
  );
}

function AvatarPlaceholder({ initials }: { initials: string }) {
  return (
    <div className="grad-ring relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface sm:h-24 sm:w-24">
      <span className="text-2xl font-semibold text-muted-foreground sm:text-3xl">{initials}</span>
    </div>
  );
}


function Portfolio() {
  useReveal();
  const active = useActiveSection();
  const [copied, setCopied] = useState(false);
  const yearRef = useRef(new Date().getFullYear());

  const email = "asmaan.dev@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {/* header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-6">
          <a href="#top" className="font-mono text-sm font-medium tracking-tight">
            asmaan<span className="text-muted-foreground">.dev</span>
          </a>
          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                  active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href={`mailto:${email}`}
            className="ml-auto rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary md:ml-0"
          >
            Get in touch
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-6">
        {/* hero */}
        <section className="grid gap-10 py-20 md:grid-cols-[1.4fr_1fr] md:py-28">
          <div className="reveal">
            <div className="flex items-center gap-5">
              <AvatarPlaceholder initials="MA" />
              <div>
                <p className="font-mono text-xs text-muted-foreground">Software Engineer · Frontend</p>
                <h1 className="mt-1 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                  M. Mohamed Asmaan
                </h1>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              I build product interfaces in React and TypeScript — with a bias toward measurable performance,
              reusable systems, and details that hold up in production. Currently at Alspark Solutions in
              Bengaluru.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="google-gradient rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                View projects
              </a>
              <button
                onClick={copyEmail}
                className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                {copied ? "Email copied" : "Copy email"}
              </button>
            </div>
          </div>

          <dl className="reveal grid grid-cols-2 gap-px self-start overflow-hidden rounded-xl border border-border bg-border md:grid-cols-1">
            {FACTS.map((f) => (
              <div key={f.k} className="bg-background px-4 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">{f.k}</dt>
                <dd className="mt-1 text-sm">{f.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* about */}
        <section id="about" className="scroll-mt-20 py-16">
          <SectionTitle index="01" title="About" />
          <div className="grid gap-8 md:grid-cols-2">
            <p className="reveal text-sm leading-7 text-muted-foreground">
              I started with computer science fundamentals and moved into frontend because it is where correctness
              and craft meet the user directly. Most of my work sits between design and infrastructure: turning
              specs into components, wiring them to APIs, and keeping the render path fast as the product grows.
            </p>
            <p className="reveal text-sm leading-7 text-muted-foreground">
              I care about the parts that are easy to skip — loading and error states, keyboard access, bundle
              size, and the profiler numbers behind &quot;it feels slow&quot;. I&apos;m currently completing an MCA
              alongside full-time engineering work.
            </p>
          </div>
        </section>

        {/* experience */}
        <section id="experience" className="scroll-mt-20 py-16">
          <SectionTitle index="02" title="Experience" note="2024 — present" />
          <div className="space-y-8">
            {EXPERIENCE.map((e) => (
              <article key={e.org} className="reveal grid gap-4 md:grid-cols-[160px_1fr]">
                <div className="font-mono text-xs text-muted-foreground">
                  <div>{e.range}</div>
                  <div className="mt-1">{e.loc}</div>
                </div>
                <div>
                  <h3 className="text-base font-medium tracking-tight">
                    {e.role} <span className="text-muted-foreground">· {e.org}</span>
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* projects */}
        <section id="projects" className="scroll-mt-20 py-16">
          <SectionTitle index="03" title="Selected projects" note={`${PROJECTS.length} shipped`} />
          <div className="grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((p) => (
              <article key={p.title} className="reveal card card-hover flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-medium tracking-tight">{p.title}</h3>
                  <span className="font-mono text-[11px] text-muted-foreground">{p.kind}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{p.body}</p>
                <p className="mt-4 font-mono text-xs text-green">{p.impact}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <SkillChip key={s} label={s} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* skills */}
        <section id="skills" className="scroll-mt-20 py-16">
          <SectionTitle index="04" title="Skills" />
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {SKILLS.map((s) => (
              <div key={s.g} className="reveal bg-background p-5">
                <h3 className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">{s.g}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {s.items.map((i) => (
                    <li key={i}>
                      <SkillChip label={i} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* education */}
        <section id="education" className="scroll-mt-20 py-16">
          <SectionTitle index="05" title="Education" />
          <ul className="space-y-4">
            {EDUCATION.map((e) => (
              <li key={e.h} className="reveal grid gap-2 border-b border-border pb-4 md:grid-cols-[160px_1fr]">
                <span className="font-mono text-xs text-muted-foreground">{e.t}</span>
                <span className="text-sm">
                  <span className="font-medium">{e.h}</span>
                  <span className="text-muted-foreground"> · {e.s}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* contact */}
        <section id="contact" className="scroll-mt-20 py-16 pb-24">
          <SectionTitle index="06" title="Contact" note="open to opportunities" />
          <div className="reveal card p-8">
            <h3 className="text-2xl font-semibold tracking-tight">Let&apos;s build something dependable.</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              I&apos;m open to frontend and full-stack engineering roles, and happy to talk through interface
              architecture, performance work, or a specific problem you&apos;re stuck on.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${email}`}
                className="google-gradient rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                {email}
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span className="font-mono">© {yearRef.current} M. Mohamed Asmaan</span>
          <span className="font-mono sm:ml-auto">Built with React, TypeScript & Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
