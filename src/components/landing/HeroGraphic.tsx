import ConflictCard from "./ConflictCard";

export default function HeroGraphic() {
  const rings = [
    { w: 260, d: "18s", dir: "normal", dotted: false },
    { w: 370, d: "30s", dir: "reverse", dotted: false },
    { w: 480, d: "44s", dir: "normal", dotted: true },
  ] as const;

  const pills = [
    {
      label: "Seniority respected",
      color: "#4f46e5",
      top: "12%",
      left: "2%",
      delay: "0s",
      side: "left" as const,
      icon: (
        <polyline points="20 6 9 17 4 12" />
      ),
    },
    {
      label: "Zero conflicts",
      color: "#16a34a",
      top: "22%",
      right: "0%",
      delay: "0.8s",
      side: "right" as const,
      icon: (
        <polyline points="20 6 9 17 4 12" />
      ),
    },
    {
      label: ".xlsx export",
      color: "#d97706",
      bottom: "18%",
      left: "0%",
      delay: "0.4s",
      side: "left" as const,
      icon: (
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      ),
    },
    {
      label: "Pre-assignments locked",
      color: "#7c3aed",
      bottom: "10%",
      right: "2%",
      delay: "1.2s",
      side: "right" as const,
      icon: (
        <>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        height: "clamp(320px, 50vw, 520px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(99,102,241,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.06) 1px,transparent 1px)",
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
          borderRadius: "1.5rem",
          pointerEvents: "none",
        }}
      />

      {/* glow blobs */}
      <div
        style={{
          position: "absolute",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,.18) 0, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* orbit rings */}
      {rings.map((r, i) => (
        <div
          key={i}
          className={`ring-${i + 1}`}
          style={{
            position: "absolute",
            width: r.w,
            height: r.w,
            borderRadius: "50%",
            border: `1.5px ${r.dotted ? "dotted" : "dashed"} #c7d2fe`,
            animation: `heroSpin ${r.d} linear infinite`,
            animationDirection: r.dir as any,
            opacity: r.dotted ? 0.5 : 1,
          }}
        />
      ))}

      {/* pills */}
      {pills.map((p) => (
        <div
          key={p.label}
          className={p.side === "right" ? "pill-right" : "pill-left"}
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 999,
            padding: "0.4rem 0.8rem",
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: "#334155",
            boxShadow: "0 2px 8px rgba(15,23,42,.07)",
            whiteSpace: "nowrap",
            top: p.top,
            left: (p as any).left,
            right: (p as any).right,
            bottom: (p as any).bottom,
            animation: `heroFloat 4s ease-in-out ${p.delay} infinite`,
          }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke={p.color}
            strokeWidth={2.5}
            className="flex-shrink-0"
          >
            {p.icon}
          </svg>
          <span>{p.label}</span>
        </div>
      ))}

      {/* central conflict card */}
      <div style={{ position: "relative", zIndex: 10, transform: "scale(1.02)" }}>
        <ConflictCard />
      </div>
    </div>
  );
}
