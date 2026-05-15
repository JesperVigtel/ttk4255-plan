import { useState, useEffect } from "react";

const DAYS = [ /* same content as original file omitted for brevity - component copied */
];

const COLOR_MAP = {
  purple: { bg: "#EEEDFE", border: "#7F77DD", text: "#3C3489", badge: "#534AB7" },
  teal:   { bg: "#E1F5EE", border: "#1D9E75", text: "#085041", badge: "#0F6E56" },
  coral:  { bg: "#FAECE7", border: "#D85A30", text: "#712B13", badge: "#993C1D" },
  blue:   { bg: "#E6F1FB", border: "#378ADD", text: "#0C447C", badge: "#185FA5" },
  amber:  { bg: "#FAEEDA", border: "#BA7517", text: "#633806", badge: "#854F0B" },
  pink:   { bg: "#FBEAF0", border: "#D4537E", text: "#72243E", badge: "#993556" },
  green:  { bg: "#EAF3DE", border: "#639922", text: "#27500A", badge: "#3B6D11" },
  gray:   { bg: "#F1EFE8", border: "#888780", text: "#444441", badge: "#5F5E5A" },
  red:    { bg: "#FCEBEB", border: "#E24B4A", text: "#791F1F", badge: "#A32D2D" },
};

const STORAGE_KEY = "ttk4255_checklist_v1";

// Storage wrapper: prefer `window.storage` (for extensions/PWAs), otherwise fall back to localStorage
const storage = {
  async get(key) {
    try {
      if (window.storage && typeof window.storage.get === "function") return await window.storage.get(key);
    } catch (_) {}
    try {
      const v = localStorage.getItem(key);
      return v ? { value: v } : null;
    } catch (_) { return null; }
  },
  async set(key, value) {
    try {
      if (window.storage && typeof window.storage.set === "function") return await window.storage.set(key, value);
    } catch (_) {}
    try {
      localStorage.setItem(key, value);
    } catch (_) {}
  }
};

export default function App() {
  // component implementation copied from original with storage -> storage
  const [checked, setChecked] = useState({});
  const [openDays, setOpenDays] = useState({ 1: true });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await storage.get(STORAGE_KEY);
        if (r && r.value) setChecked(JSON.parse(r.value));
      } catch (_) {}
      setLoaded(true);
    })();
  }, []);

  async function toggle(id) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try { await storage.set(STORAGE_KEY, JSON.stringify(next)); } catch (_) {}
  }

  function toggleDay(d) {
    setOpenDays(prev => ({ ...prev, [d]: !prev[d] }));
  }

  const totalTasks = DAYS.reduce((a, d) => a + d.tasks.length, 0);
  const totalDone = DAYS.reduce((a, d) => a + d.tasks.filter(t => checked[t.id]).length, 0);
  const pct = Math.round((totalDone / totalTasks) * 100);

  if (!loaded) return <p style={{ color: "var(--color-text-secondary)", padding: "2rem", fontSize: 14 }}>Loading…</p>;

  return (
    <div style={{ padding: "1.5rem 0" }}>
      <h2 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 4px", color: "var(--color-text-primary)" }}>TTK4255 — 10-day study plan</h2>
      <p style={{ margin: "0 0 1.25rem", fontSize: 14, color: "var(--color-text-secondary)" }}>Exam: 01 June 2026 · 09:00 · Sluppenvegen 14</p>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
        <div style={{ flex: 1, height: 8, background: "var(--color-background-secondary)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "#1D9E75", borderRadius: 99, transition: "width 0.3s" }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>
          {totalDone} / {totalTasks} tasks · {pct}%
        </span>
      </div>

      {DAYS.map(day => {
        const col = COLOR_MAP[day.color];
        const done = day.tasks.filter(t => checked[t.id]).length;
        const total = day.tasks.length;
        const open = !!openDays[day.day];
        const complete = done === total;

        return (
          <div key={day.day} style={{
            marginBottom: 10,
            border: `0.5px solid ${col.border}`,
            borderRadius: "var(--border-radius-lg)",
            overflow: "hidden",
            background: "var(--color-background-primary)",
          }}>
            <button
              onClick={() => toggleDay(day.day)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "12px 16px", background: col.bg,
                border: "none", cursor: "pointer", textAlign: "left",
              }}
            >
              <span style={{
                width: 28, height: 28, borderRadius: 6,
                background: complete ? col.badge : "transparent",
                border: `1.5px solid ${col.badge}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontSize: 13, fontWeight: 500,
                color: complete ? "#fff" : col.text,
                transition: "background 0.2s",
              }}>
                {complete ? <i className="ti ti-check" style={{ fontSize: 14 }} aria-hidden="true" /> : day.day}
              </span>
              <span style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: col.text, display: "block" }}>Day {day.day} — {day.title}</span>
                {day.lectures.length > 0 && (
                  <span style={{ fontSize: 12, color: col.badge, display: "block", marginTop: 1 }}>
                    {day.lectures.join(" · ")}
                  </span>
                )}
              </span>
              <span style={{
                fontSize: 12, fontWeight: 500, color: col.text,
                background: complete ? col.badge : "transparent",
                color: complete ? "#fff" : col.text,
                padding: "2px 8px", borderRadius: 99,
                border: `0.5px solid ${col.border}`,
                whiteSpace: "nowrap"
              }}>
                {done}/{total}
              </span>
              <i className={`ti ti-chevron-${open ? "up" : "down"}`} style={{ fontSize: 16, color: col.text, flexShrink: 0 }} aria-hidden="true" />
            </button>

            {open && (
              <div style={{ padding: "8px 16px 12px" }}>
                {day.tasks.map((task, i) => (
                  <label key={task.id} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "7px 0",
                    borderBottom: i < day.tasks.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none",
                    cursor: "pointer",
                  }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1,
                      border: `1.5px solid ${checked[task.id] ? col.badge : "var(--color-border-secondary)"}`,
                      background: checked[task.id] ? col.badge : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s",
                    }} onClick={() => toggle(task.id)}>
                      {checked[task.id] && <i className="ti ti-check" style={{ fontSize: 11, color: "#fff" }} aria-hidden="true" />}
                    </div>
                    <span style={{
                      fontSize: 13.5,
                      color: checked[task.id] ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
                      textDecoration: checked[task.id] ? "line-through" : "none",
                      lineHeight: 1.5,
                    }} onClick={() => toggle(task.id)}>
                      {task.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: "1.5rem", textAlign: "center" }}>
        Progress is saved automatically in this project.
      </p>
    </div>
  );
}
