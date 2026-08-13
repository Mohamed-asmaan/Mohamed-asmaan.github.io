import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  Gauge,
  Link2,
  ListTree,
  Moon,
  Printer,
  Sparkles,
  Sun,
  Waves,
} from "lucide-react";

type Section = { id: string; label: string };

const STORE = "asmaan.prefs";

type Prefs = { theme: "light" | "dark"; compact: boolean; calm: boolean };

const DEFAULTS: Prefs = { theme: "light", compact: false, calm: false };

function applyPrefs(p: Prefs) {
  const root = document.documentElement;
  root.classList.toggle("dark", p.theme === "dark");
  root.classList.toggle("density-compact", p.compact);
  root.classList.toggle("no-motion", p.calm);
}

function DockButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      data-active={active ? "true" : "false"}
      className={`grad-ring group relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 font-mono text-[10px] text-muted-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </button>
  );
}

export function CommandDock({ sections, email }: { sections: Section[]; email: string }) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [copied, setCopied] = useState<"email" | "link" | null>(null);
  const [menu, setMenu] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let next = DEFAULTS;
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) next = { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Prefs>) };
      else if (window.matchMedia("(prefers-color-scheme: dark)").matches) next = { ...DEFAULTS, theme: "dark" };
    } catch {
      /* ignore */
    }
    setPrefs(next);
    applyPrefs(next);
  }, []);

  const update = useCallback((patch: Partial<Prefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      applyPrefs(next);
      try {
        localStorage.setItem(STORE, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const flash = (what: "email" | "link") => {
    setCopied(what);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 1500);
  };

  const copy = async (text: string, what: "email" | "link") => {
    try {
      await navigator.clipboard.writeText(text);
      flash(what);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 print:hidden">
      <div className="pointer-events-auto relative">
        {menu ? (
          <div className="absolute bottom-14 left-1/2 w-52 -translate-x-1/2 rounded-xl border border-border bg-background/95 p-1.5 shadow-lg backdrop-blur">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMenu(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                {s.label}
                <span className="font-mono text-[10px] opacity-60">#{s.id}</span>
              </a>
            ))}
          </div>
        ) : null}

        <div className="flex items-center gap-1 rounded-2xl border border-border bg-background/85 p-1.5 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.35)] backdrop-blur">
          <DockButton label="Sections" active={menu} onClick={() => setMenu((m) => !m)}>
            <ListTree size={16} />
          </DockButton>

          <span className="mx-1 h-5 w-px bg-border" />

          <DockButton
            label={prefs.theme === "dark" ? "Light mode" : "Dark mode"}
            active={prefs.theme === "dark"}
            onClick={() => update({ theme: prefs.theme === "dark" ? "light" : "dark" })}
          >
            {prefs.theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </DockButton>

          <DockButton
            label={prefs.compact ? "Comfortable spacing" : "Compact spacing"}
            active={prefs.compact}
            onClick={() => update({ compact: !prefs.compact })}
          >
            <Gauge size={16} />
          </DockButton>

          <DockButton
            label={prefs.calm ? "Motion on" : "Calm mode (no motion)"}
            active={prefs.calm}
            onClick={() => update({ calm: !prefs.calm })}
          >
            {prefs.calm ? <Waves size={16} /> : <Sparkles size={16} />}
          </DockButton>

          <span className="mx-1 h-5 w-px bg-border" />

          <DockButton label={copied === "email" ? "Email copied" : "Copy email"} onClick={() => copy(email, "email")}>
            {copied === "email" ? <Check size={16} className="text-green" /> : <Copy size={16} />}
          </DockButton>

          <DockButton
            label={copied === "link" ? "Link copied" : "Copy page link"}
            onClick={() => copy(window.location.href, "link")}
          >
            {copied === "link" ? <Check size={16} className="text-green" /> : <Link2 size={16} />}
          </DockButton>

          <DockButton label="Print / save as PDF" onClick={() => window.print()}>
            <Printer size={16} />
          </DockButton>
        </div>
      </div>
    </div>
  );
}

export default CommandDock;
