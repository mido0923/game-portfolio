"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";

export type InvSlot = { label: string; img?: StaticImageData };

/**
 * ロボラボ用オーケストレーター。
 * 上部のインベントリから疑似マウスカーソルが各オブジェクトを1つずつ
 * 「配置」していき、全部置いたらカーソルが「行動開始」ボタンを押す。
 * 押すと画面全体（main）が揺れる。
 * 配置先は子の .place-item（DOM順 = inventory 順）。
 * prefers-reduced-motion では全部即表示してカーソル演出はスキップ。
 */
export default function RobotStage({
  children,
  inventory,
  buttonLabel = "行動開始",
}: {
  children: React.ReactNode;
  inventory: InvSlot[];
  buttonLabel?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    const cursor = cursorRef.current;
    const btn = btnRef.current;
    if (!stage || !cursor || !btn) return;

    const items = Array.from(stage.querySelectorAll<HTMLElement>(".place-item"));
    const slots = Array.from(stage.querySelectorAll<HTMLElement>(".inv-slot"));

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      items.forEach((el) => el.classList.add("is-placed", "no-anim"));
      slots.forEach((el) => el.classList.add("is-used"));
      stage.classList.add("ready");
      return;
    }

    const TIP = { x: 9, y: 5 };
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const center = (el: HTMLElement) => {
      const s = stage.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      // body の zoom 倍率（getBoundingClientRect は zoom 後の実px、
      // カーソルの translate は要素ローカル座標なので割って合わせる）
      const z = stage.offsetWidth ? s.width / stage.offsetWidth : 1;
      return {
        x: (r.left - s.left + r.width / 2) / z,
        y: (r.top - s.top + r.height / 2) / z,
      };
    };
    const moveTo = async (el: HTMLElement, dur: number) => {
      const p = center(el);
      const to = `translate(${p.x - TIP.x}px, ${p.y - TIP.y}px)`;
      const anim = cursor.animate([{ transform: to }], {
        duration: dur,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards",
      });
      try {
        await anim.finished;
        anim.commitStyles();
      } catch {
        /* キャンセル時は無視 */
      }
      anim.cancel();
    };

    const run = async () => {
      if (startedRef.current) return;
      startedRef.current = true;

      cursor.classList.add("is-active");
      await wait(90);

      for (let i = 0; i < items.length; i++) {
        const slot = slots[i];
        if (slot) {
          await moveTo(slot, i === 0 ? 260 : 150);
          cursor.classList.add("is-grab");
          slot.classList.add("is-picking");
          await wait(55);
          cursor.classList.remove("is-grab");
          slot.classList.add("is-used");
        }
        await moveTo(items[i], 165);
        items[i].classList.add("is-placed");
        cursor.classList.add("is-drop");
        await wait(45);
        cursor.classList.remove("is-drop");
        await wait(35);
      }

      // ボタンを表示してから押しに行く
      stage.classList.add("ready");
      await wait(80);
      await moveTo(btn, 230);
      cursor.classList.add("is-grab");
      btn.classList.add("is-pressed");
      await wait(80);

      // 画面全体を揺らす
      const main = stage.closest("main") ?? document.body;
      main.classList.add("screen-shaking");
      window.setTimeout(() => main.classList.remove("screen-shaking"), 650);

      cursor.classList.remove("is-grab");
      btn.classList.remove("is-pressed");
      await wait(250);
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

  // 演出後、ユーザーが自分で押したときも画面を揺らす
  function handleManualStart() {
    const stage = stageRef.current;
    const main = stage?.closest("main") ?? document.body;
    if (!main) return;
    main.classList.add("screen-shaking");
    window.setTimeout(() => main.classList.remove("screen-shaking"), 650);
  }

  return (
    <div ref={stageRef} className="robot-stage">
      {/* インベントリ */}
      <div className="inventory" aria-hidden="true">
        {inventory.map((s, i) => (
          <div key={i} className="inv-slot" data-slot={i}>
            {s.img ? (
              <Image src={s.img} alt="" fill sizes="72px" className="inv-thumb" />
            ) : (
              <span className="inv-label">{s.label}</span>
            )}
          </div>
        ))}
      </div>

      {children}

      <div className="place-actions">
        <button
          ref={btnRef}
          type="button"
          className="start-btn"
          onClick={handleManualStart}
        >
          {buttonLabel}
        </button>
      </div>

      {/* 疑似マウスカーソル */}
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
