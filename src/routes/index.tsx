import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Circle,
  Mail,
  MapPin,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  SiChromewebstore,
  SiCss3,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiLinkedin,
  SiMongodb,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiWebpack,
  type IconType,
} from "react-icons/si";
import { TbApi, TbBinaryTree, TbBolt, TbDatabase, TbGauge, TbRefresh } from "react-icons/tb";

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
    stack: ["React", "JavaScript (ES6+)", "Chrome APIs"],
    body: "Inspects structural DOM signals in real time from the extension surface without blocking the page's main thread.",
  },
];

const SKILLS = [
  { g: "Languages", items: ["TypeScript", "JavaScript (ES6+)", "HTML", "CSS", "SQL basics"] },
  { g: "Frameworks", items: ["React", "Redux Toolkit", "Node.js", "Express", "Tailwind CSS"] },
  { g: "Platform", items: ["REST", "GraphQL", "Firebase", "MongoDB", "JWT / OTP auth"] },
  { g: "Tooling", items: ["Vite", "Webpack", "Git", "Postman", "Chrome APIs", "Figma"] },
  {
    g: "Fundamentals",
    items: ["Data structures", "Event loop", "Closures", "Async patterns", "Rendering performance"],
  },
];

const TOOL_ICON: Record<string, IconType | LucideIcon> = {
  TypeScript: SiTypescript,
  "JavaScript (ES6+)": SiJavascript,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss3,
  "SQL basics": TbDatabase,
  React: SiReact,
  "Redux Toolkit": SiRedux,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  "Tailwind CSS": SiTailwindcss,
  REST: TbApi,
  GraphQL: SiGraphql,
  Firebase: SiFirebase,
  MongoDB: SiMongodb,
  "JWT / OTP auth": SiJsonwebtokens,
  Vite: SiVite,
  Webpack: SiWebpack,
  Git: SiGit,
  Postman: SiPostman,
  "Chrome APIs": SiChromewebstore,
  Figma: SiFigma,
  "Data structures": TbBinaryTree,
  "Event loop": TbRefresh,
  Closures: TbBolt,
  "Async patterns": TbBolt,
  "Rendering performance": TbGauge,
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

const LINKS = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
};

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
          el.style.transition =
            "opacity .55s cubic-bezier(.2,.7,.2,1), transform .55s cubic-bezier(.2,.7,.2,1)";
          el.style.transitionDelay = `${Math.min(i, 6) * 55}ms`;
          el.style.opacity = "1";
          el.style.transform = "none";
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
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
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
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

function SectionTitle({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-10 flex flex-wrap items-end gap-4">
      <h2 className="g-underline text-2xl font-normal tracking-tight sm:text-[28px]">{title}</h2>
      {note ? <span className="ml-auto text-xs text-muted-foreground">{note}</span> : null}
    </div>
  );
}

function SkillChip({ label }: { label: string }) {
  const Icon = (TOOL_ICON[label] ?? Circle) as IconType;
  return (
    <span className="chip">
      <Icon size={13} aria-hidden="true" className="opacity-80" />
      <span>{label}</span>
    </span>
  );
}

function AvatarPlaceholder({ initials }: { initials: string }) {
  return (
    <div className="grad-ring relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-2 sm:h-28 sm:w-28">
      <span className="text-3xl font-normal text-muted-foreground">{initials}</span>
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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {/* header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
          <a href="#top" className="text-[15px] font-medium tracking-tight">
            asmaan<span className="text-muted-foreground">.dev</span>
          </a>

          <nav className="ml-auto hidden items-center gap-1 rounded-full bg-surface p-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                  active === n.id
                    ? "bg-primary-container text-on-primary-container"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 md:ml-2">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="grad-ring flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <SiGithub size={17} />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="grad-ring flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <SiLinkedin size={17} />
            </a>
            <a href={`mailto:${email}`} className="m3-filled ml-2 hidden !py-2 sm:inline-flex">
              <Mail size={16} />
              Get in touch
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-6">
        {/* hero */}
        <section className="grid items-start gap-6 py-16 md:grid-cols-3 md:py-24">
          <div className="reveal card md:col-span-2 p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-6">
              <AvatarPlaceholder initials="MA" />
              <div className="min-w-0">
                <span className="chip">
                  <Sparkles size={13} className="text-blue" />
                  Available for SWE roles
                </span>
                <h1 className="mt-3 text-4xl font-normal leading-[1.08] tracking-tight sm:text-[52px]">
                  M. Mohamed Asmaan
                </h1>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  Software Engineer · Frontend
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={13} /> Bengaluru
                  </span>
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-2xl text-[17px] leading-8 text-muted-foreground">
              I build product interfaces in React and TypeScript — with a bias toward measurable
              performance, reusable systems, and details that hold up in production. Currently at
              Alspark Solutions.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="m3-filled">
                View projects
                <ArrowUpRight size={16} />
              </a>
              <button onClick={copyEmail} className="m3-outlined">
                {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />}
                {copied ? "Email copied" : "Copy email"}
              </button>
            </div>
          </div>

          <dl className="reveal grid grid-cols-2 gap-3 md:grid-cols-1">
            {FACTS.map((f) => (
              <div key={f.k} className="card card-hover px-5 py-4">
                <dt className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{f.k}</dt>
                <dd className="mt-1 text-[15px]">{f.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* about */}
        <section id="about" className="scroll-mt-24 py-16">
          <SectionTitle title="About" />
          <div className="grid gap-6 md:grid-cols-2">
            <p className="reveal card-outlined p-7 text-[15px] leading-8 text-muted-foreground">
              I started with computer science fundamentals and moved into frontend because it is where
              correctness and craft meet the user directly. Most of my work sits between design and
              infrastructure: turning specs into components, wiring them to APIs, and keeping the render
              path fast as the product grows.
            </p>
            <p className="reveal card-outlined p-7 text-[15px] leading-8 text-muted-foreground">
              I care about the parts that are easy to skip — loading and error states, keyboard access,
              bundle size, and the profiler numbers behind &quot;it feels slow&quot;. I&apos;m currently
              completing an MCA alongside full-time engineering work.
            </p>
          </div>
        </section>

        {/* experience */}
        <section id="experience" className="scroll-mt-24 py-16">
          <SectionTitle title="Experience" note="2024 — present" />
          <div className="space-y-6">
            {EXPERIENCE.map((e) => (
              <article key={e.org} className="reveal card grid gap-6 p-8 md:grid-cols-[180px_1fr]">
                <div className="text-xs text-muted-foreground">
                  <div>{e.range}</div>
                  <div className="mt-1">{e.loc}</div>
                </div>
                <div>
                  <h3 className="text-lg font-normal tracking-tight">
                    {e.role} <span className="text-muted-foreground">· {e.org}</span>
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[15px] leading-7 text-muted-foreground">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
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
        <section id="projects" className="scroll-mt-24 py-16">
          <SectionTitle title="Selected projects" note={`${PROJECTS.length} shipped`} />
          <div className="grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((p) => (
              <article key={p.title} className="reveal card card-hover flex flex-col p-7">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-normal tracking-tight">{p.title}</h3>
                  <ArrowUpRight size={16} className="mt-1 shrink-0 text-muted-foreground" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{p.kind}</p>
                <p className="mt-4 text-[15px] leading-7 text-muted-foreground">{p.body}</p>
                <p className="mt-5 text-sm text-green">{p.impact}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <SkillChip key={s} label={s} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* skills */}
        <section id="skills" className="scroll-mt-24 py-16">
          <SectionTitle title="Skills" />
          <div className="grid gap-4 sm:grid-cols-2">
            {SKILLS.map((s) => (
              <div key={s.g} className="reveal card p-7">
                <h3 className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{s.g}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
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
        <section id="education" className="scroll-mt-24 py-16">
          <SectionTitle title="Education" />
          <ul className="reveal card divide-y divide-border overflow-hidden">
            {EDUCATION.map((e) => (
              <li key={e.h} className="grid gap-2 px-7 py-5 md:grid-cols-[180px_1fr]">
                <span className="text-xs text-muted-foreground">{e.t}</span>
                <span className="text-[15px]">
                  {e.h}
                  <span className="text-muted-foreground"> · {e.s}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* contact */}
        <section id="contact" className="scroll-mt-24 py-16 pb-28">
          <SectionTitle title="Contact" note="open to opportunities" />
          <div className="reveal card p-9 sm:p-12">
            <h3 className="max-w-xl text-3xl font-normal leading-tight tracking-tight">
              Let&apos;s build something dependable.
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-8 text-muted-foreground">
              I&apos;m open to frontend and full-stack engineering roles, and happy to talk through
              interface architecture, performance work, or a specific problem you&apos;re stuck on.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${email}`} className="m3-filled">
                <Mail size={16} />
                {email}
              </a>
              <a href={LINKS.github} target="_blank" rel="noreferrer noopener" className="m3-outlined">
                <SiGithub size={16} />
                GitHub
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer noopener" className="m3-outlined">
                <SiLinkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-2 border-t border-border py-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {yearRef.current} M. Mohamed Asmaan</span>
          <span className="sm:ml-auto">Built with React, TypeScript &amp; Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
