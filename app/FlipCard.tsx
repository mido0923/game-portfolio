import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

/**
 * 両面フリップカード。最初は裏面を見せ、ほうきが通った後（祖先の .swept）に
 * mc-draw 風の「浮き上がり＋フリップ」で表へめくれる。
 * めくる順番は i（波の順番）で指定。
 * back を渡すとその画像が裏面になる（未指定なら CSS の仮裏面）。
 * className には flex のサイズ指定など、レイアウト用クラスを渡す。
 */
export default function FlipCard({
  i,
  className = "",
  back,
  backAlt = "",
  children,
}: {
  i: number;
  className?: string;
  back?: StaticImageData;
  backAlt?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flip3d ${className}`.trim()} style={{ "--i": i } as CSSProperties}>
      <div className="flip3d__inner">
        <div className="flip3d__face flip3d__front">{children}</div>
        <div className="flip3d__face flip3d__back" aria-hidden="true">
          {back ? (
            <Image src={back} alt={backAlt} fill className="object-cover" />
          ) : (
            <span className="card-back-fill" />
          )}
        </div>
      </div>
    </div>
  );
}
