"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 作品セクションが画面に入ったら一度だけ「ほうきが画面を掃く」→ 子の各ブロック
 * （.flip-block）が順番にカードのようにめくれて現れる演出。
 * めくる順番は子に style={{ "--i": n }} を付けて指定する。
 * prefers-reduced-motion では globals.css 側で即表示にフォールバック。
 */
export default function SweepReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [swept, setSwept] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setSwept(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSwept(true);
            observer.disconnect();
            break;
          }
        }
      },
      // セクションが画面中央あたりまでスクロールされたら発火
      { rootMargin: "0px 0px -45% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`sweep-stage ${className} ${swept ? "swept" : ""}`.trim()}>
      <div className="broom" aria-hidden="true">
        <Broom />
      </div>
      {children}
    </div>
  );
}

/** 手描き調のほうき（透過PNGに差し替え可） */
function Broom() {
  return (
    <svg viewBox="0 0 100 170" className="broom-svg" role="img" aria-hidden="true">
      {/* 柄 */}
      <line
        x1="58"
        y1="6"
        x2="46"
        y2="92"
        stroke="#7c4a1e"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* 結束バンド */}
      <path d="M39 88 L61 83 L67 101 L33 106 Z" fill="#8b5a2b" />
      {/* 穂（わら） */}
      <path
        d="M36 102 Q50 97 65 103 L80 164 Q50 150 20 164 Z"
        fill="#edc04b"
        stroke="#c79a2f"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <g stroke="#c79a2f" strokeWidth="2" strokeLinecap="round">
        <line x1="40" y1="108" x2="28" y2="160" />
        <line x1="48" y1="106" x2="45" y2="162" />
        <line x1="56" y1="106" x2="61" y2="160" />
        <line x1="64" y1="108" x2="74" y2="160" />
      </g>
    </svg>
  );
}
