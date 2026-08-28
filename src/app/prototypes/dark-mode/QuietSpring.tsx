"use client";

import { useState, useRef } from "react";

// ── Variant 1: Quiet Spring ──────────────────────────────────
// Axis: Minimal motion, crisp hardware-accelerated CSS fade.
// The transition is almost invisible but physically satisfying.
// Best for: Daily-use tools where switching is frequent.
// ─────────────────────────────────────────────────────────────

export default function QuietSpring() {
  const [dark, setDark] = useState(false);

  const services = [
    { icon: "🌐", label: "Website", sub: "Design + Dev" },
    { icon: "🔍", label: "SEO", sub: "Growth" },
    { icon: "📣", label: "Marketing", sub: "Performance" },
    { icon: "📱", label: "Social", sub: "Content" },
  ];

  return (
    <div
      className="proto-root"
      style={{
        transition: "background-color 200ms cubic-bezier(0.23,1,0.32,1), color 200ms cubic-bezier(0.23,1,0.32,1)",
        ...(dark ? {
          "--bg": "#12130F",
          "--bg-secondary": "#1C1D18",
          "--fg": "#ECEBE6",
          "--fg-muted": "#A3A59E",
          "--sage-soft": "#8A9A7A",
          "--sage-deep": "#9BB088",
          "--card-bg": "#1C1D18",
          "--card-border": "rgba(255,255,255,0.08)",
          "--nav-bg": "rgba(18,19,15,0.92)",
        } as React.CSSProperties : {
          "--bg": "#F3F1EB",
          "--bg-secondary": "#E8E5DD",
          "--fg": "#20211D",
          "--fg-muted": "#5A5D55",
          "--sage-soft": "#A0AD91",
          "--sage-deep": "#7E8E71",
          "--card-bg": "#ffffff",
          "--card-border": "rgba(32,33,29,0.06)",
          "--nav-bg": "rgba(243,241,235,0.92)",
        } as React.CSSProperties),
      }}
    >
      {/* Nav */}
      <nav className="proto-nav">
        <span className="proto-logo">
          digital<span className="accent">brand</span><span className="light">builder</span>
        </span>
        <ul className="proto-nav-links">
          {["Services", "About", "Blog", "Contact"].map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>

        {/* Quiet Spring Toggle — springy physical icon swap */}
        <button
          className="proto-toggle"
          onClick={() => setDark(!dark)}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            background: "var(--bg-secondary)",
            border: "1.5px solid var(--card-border)",
            transition: "background-color 200ms cubic-bezier(0.23,1,0.32,1), transform 160ms cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          {/* Sun */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              fontSize: 18,
              transition: "transform 350ms cubic-bezier(0.34,1.56,0.64,1), opacity 220ms cubic-bezier(0.23,1,0.32,1)",
              transform: dark ? "translateY(-28px) rotate(30deg)" : "translateY(0) rotate(0deg)",
              opacity: dark ? 0 : 1,
            }}
          >☀️</span>
          {/* Moon */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              fontSize: 18,
              transition: "transform 350ms cubic-bezier(0.34,1.56,0.64,1), opacity 220ms cubic-bezier(0.23,1,0.32,1)",
              transform: dark ? "translateY(0) rotate(0deg)" : "translateY(28px) rotate(-30deg)",
              opacity: dark ? 1 : 0,
            }}
          >🌙</span>
        </button>
      </nav>

      {/* Hero */}
      <section className="proto-hero">
        <div className="proto-hero-inner">
          <span className="proto-eyebrow">Digital Growth for Modern Businesses</span>

          <h1 className="proto-h1">
            Turn your business into a brand people{" "}
            <em>find, trust &amp; choose.</em>
          </h1>

          <p className="proto-p">
            We bring your digital presence together—from high-performing websites
            and SEO to performance marketing and social media—so your business
            doesn&apos;t just exist online. It grows there.
          </p>

          <div className="proto-ctas">
            <button className="proto-btn-primary">
              Build Your Digital Brand →
            </button>
            <button className="proto-btn-secondary">
              See How It Works
            </button>
          </div>

          <div className="proto-tags">
            {["Websites", "SEO", "Marketing", "Social", "Ecommerce"].map((t, i, arr) => (
              <span key={t} className="proto-tag" style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                {t}
                {i < arr.length - 1 && <span className="proto-tag-dot">·</span>}
              </span>
            ))}
          </div>

          <div className="proto-cards">
            {services.map((s) => (
              <div
                key={s.label}
                className="proto-card"
                style={{
                  transition: "background-color 200ms cubic-bezier(0.23,1,0.32,1), border-color 200ms cubic-bezier(0.23,1,0.32,1)",
                }}
              >
                <div className="proto-card-icon">{s.icon}</div>
                <div className="proto-card-label">{s.label}</div>
                <div className="proto-card-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
