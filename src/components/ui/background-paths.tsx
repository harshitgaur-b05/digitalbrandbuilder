"use client";

import { useMemo } from "react";

// Pure CSS animated SVG paths — no Framer Motion on the paths themselves.
// CSS animations run on the GPU compositor thread and do NOT interact with
// React's paint cycle or Framer Motion's opacity management, eliminating all flicker.
export function FloatingPaths({ position }: { position: number }) {
    const paths = useMemo(() => {
        return Array.from({ length: 24 }, (_, i) => {
            const d = `M-${380 - i * 5 * position} -${189 + i * 6}C-${
                380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
                152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
                684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`;

            return {
                id: i,
                d,
                width: 0.6 + i * 0.04,
                opacity: 0.12 + i * 0.018,
                // Deterministic duration spread — avoids simultaneous pulsing
                duration: `${22 + ((i * 13) % 14)}s`,
                delay: `-${(i * 2.1) % 12}s`, // negative delay = pre-running, no initial gap
            };
        });
    }, [position]);

    return (
        <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 696 316"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
        >
            {paths.map((path) => (
                <path
                    key={path.id}
                    d={path.d}
                    stroke="currentColor"
                    strokeWidth={path.width}
                    strokeOpacity={path.opacity}
                    strokeLinecap="round"
                    fill="none"
                    style={{
                        // CSS stroke-dashoffset animation — smooth, GPU-composited, no flicker
                        strokeDasharray: "300 1200",
                        strokeDashoffset: 0,
                        animation: `flowPath ${path.duration} linear ${path.delay} infinite`,
                    }}
                />
            ))}
            <style>{`
                @keyframes flowPath {
                    0%   { stroke-dashoffset: 0; opacity: 0.4; }
                    50%  { opacity: 1; }
                    100% { stroke-dashoffset: -1500; opacity: 0.4; }
                }
                @media (prefers-reduced-motion: reduce) {
                    path { animation: none !important; }
                }
            `}</style>
        </svg>
    );
}

export function BackgroundPaths({
    title = "Background Paths",
}: {
    title?: string;
}) {
    return (
        <div className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
            {/* Isolated SVG layer — CSS animations, not Framer Motion, so no compositor bleed */}
            <div
                className="absolute inset-0 text-slate-900/30 dark:text-white/20"
                style={{ isolation: "isolate" }}
            >
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>
        </div>
    );
}
