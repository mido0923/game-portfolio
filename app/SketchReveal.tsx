"use client";

import { useEffect, useRef } from "react";

/**
 * EMO 用オーケストレーター。
 * 自動マウスカーソルが各 .sketch-item の輪郭（長方形）をなぞりながら
 * 白黒の線を引き、引き終わると色がついて本物になる、を順番に行う。
 * 線の進行とカーソル位置を同じ進捗で駆動して同期させる。
 * prefers-reduced-motion ではカーソル演出をスキップして即カラー表示。
 */
export default function SketchReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    const cursor = cursorRef.current;
    if (!stage || !cursor) return;

    const items = Array.from(stage.querySelectorAll<HTMLElement>(".sketch-item"));

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      items.forEach((it) =>
        it.querySelector(".sketch-content")?.classList.add("is-colored", "no-anim")
      );
      return;
    }

    const TIP = { x: 9, y: 5 };
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

    // stage ローカル座標（body の zoom を補正）
    const localRect = (el: HTMLElement) => {
      const s = stage.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const z = stage.offsetWidth ? s.width / stage.offsetWidth : 1;
      return {
        x: (r.left - s.left) / z,
        y: (r.top - s.top) / z,
        w: r.width / z,
        h: r.height / z,
      };
    };

    const setCursor = (x: number, y: number) => {
      cursor.style.transform = `translate(${x - TIP.x}px, ${y - TIP.y}px)`;
    };

    // カーソルを移動（描画前の移動用）
    const moveTo = async (x: number, y: number, dur: number) => {
      const to = `translate(${x - TIP.x}px, ${y - TIP.y}px)`;
      const a = cursor.animate([{ transform: to }], {
        duration: dur,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards",
      });
      try {
        await a.finished;
        a.commitStyles();
      } catch {
        /* noop */
      }
      a.cancel();
    };

    // 長方形の輪郭ジオメトリ。ローカル(0..w,0..h)とステージ座標の両方を返す。
    const geom = (item: HTMLElement) => {
      const lr = localRect(item);
      const w = item.offsetWidth;
      const h = item.offsetHeight;
      const ix = w * 0.016;
      const iy = h * 0.016;
      const x0 = ix;
      const y0 = iy;
      const ww = w - ix * 2;
      const hh = h - iy * 2;
      const total = 2 * (ww + hh);
      // 左下から時計回り（BL→TL→TR→BR→BL）。終点が下になるよう左下始点。
      const corners = [
        { x: x0, y: y0 + hh }, // BL
        { x: x0, y: y0 }, // TL
        { x: x0 + ww, y: y0 }, // TR
        { x: x0 + ww, y: y0 + hh }, // BR
        { x: x0, y: y0 + hh }, // BL
      ];
      const seg = [hh, ww, hh, ww];
      const localAt = (p: number) => {
        let L = p * total;
        for (let k = 0; k < 4; k++) {
          if (L <= seg[k]) {
            const a = corners[k];
            const b = corners[k + 1];
            const f = seg[k] === 0 ? 0 : L / seg[k];
            return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
          }
          L -= seg[k];
        }
        return corners[4];
      };
      // 進捗 p までの線の d 属性（実際に継ぎ足して伸ばす）
      const pathD = (p: number) => {
        let L = p * total;
        let d = `M ${corners[0].x} ${corners[0].y}`;
        let k = 0;
        while (k < 4 && L >= seg[k]) {
          L -= seg[k];
          k++;
          d += ` L ${corners[k].x} ${corners[k].y}`;
        }
        if (k < 4) {
          const lp = localAt(p);
          d += ` L ${lp.x} ${lp.y}`;
        }
        return d;
      };
      return { w, h, lr, localAt, pathD };
    };

    // 1オブジェクトを「なぞって線を引く」（線は伸びて残る）
    const drawItem = (item: HTMLElement, dur: number) =>
      new Promise<void>((resolve) => {
        const svg = item.querySelector<SVGSVGElement>(".sketch-ink");
        const line = item.querySelector<SVGPathElement>(".sketch-line");
        const ink = item.querySelector<HTMLElement>(".sketch-ink");
        const g = geom(item);
        svg?.setAttribute("viewBox", `0 0 ${g.w} ${g.h}`);
        svg?.setAttribute("preserveAspectRatio", "none");
        ink?.classList.add("is-inking");
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          line?.setAttribute("d", g.pathD(p));
          const lp = g.localAt(p);
          setCursor(g.lr.x + lp.x, g.lr.y + lp.y);
          if (p < 1) requestAnimationFrame(step);
          else resolve();
        };
        requestAnimationFrame(step);
      });

    const run = async () => {
      if (startedRef.current) return;
      startedRef.current = true;

      cursor.classList.add("is-active");
      await wait(120);

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const g = geom(item);
        const start = g.localAt(0);
        await moveTo(g.lr.x + start.x, g.lr.y + start.y, i === 0 ? 360 : 220);
        await drawItem(item, 360);
        // 描き終わってから色をつける（線は少し残してフェード）
        item.querySelector(".sketch-content")?.classList.add("is-colored");
        await wait(220);
        const ink = item.querySelector<HTMLElement>(".sketch-ink");
        ink?.classList.remove("is-inking");
        ink?.classList.add("is-faded");
        await wait(90);
      }

      await wait(150);
      cursor.classList.remove("is-active");
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            io.disconnect();
            run();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -30% 0px", threshold: 0 }
    );
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={stageRef} className={`sketch-stage ${className}`.trim()}>
      {children}
      <div ref={cursorRef} className="fake-cursor" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="38" height="38">
          <path
            d="M5 2.5 L5 19.5 L9.2 15.3 L12 21.5 L14.7 20.3 L11.9 14.2 L17.5 14.2 Z"
            fill="#ffffff"
            stroke="#1a1a1a"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
