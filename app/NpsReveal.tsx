"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import bulletHole from "../png/NPS/k0100_5.png";
import gun from "../png/NPS/juu.png";

/**
 * NPS 用。セクションが画面に入ると、弾痕（着弾）が一発出て、
 * その弾痕にズームするように中身が円形に拡大して現れる。
 * 演出は CSS（.fired）で駆動。
 * prefers-reduced-motion では即・等倍表示にフォールバック。
 */
export default function NpsReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setFired(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setFired(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -25% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`nps-stage ${className} ${fired ? "fired" : ""}`.trim()}>
      <div className="nps-view">{children}</div>

      {/* 黒い壁（撃つと穴が開く） */}
      <div className="nps-cover" aria-hidden="true" />

      {/* 弾痕（着弾） */}
      <div className="nps-impact" aria-hidden="true">
        <Image src={bulletHole} alt="" fill sizes="38vh" className="nps-hole" />
      </div>

      {/* マズルフラッシュ */}
      <div className="nps-flash" aria-hidden="true" />

      {/* 銃（右から入って狙い、発砲＝リコイル） */}
      <Image src={gun} alt="" width={512} height={512} className="nps-gun" aria-hidden="true" />
    </div>
  );
}
