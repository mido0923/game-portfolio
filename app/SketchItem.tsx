import type { CSSProperties } from "react";

/**
 * EMO の1オブジェクト。最初は中身が白黒(grayscale)で非表示。
 * 自動カーソルが輪郭をなぞるのに合わせて白い線(.sketch-line)が伸びていき、
 * 描き終わると色がついて本物になる（線は SketchReveal が JS で描画）。
 * i は描く順番。className にはレイアウト用クラスを渡す。
 */
export default function SketchItem({
  i,
  className = "",
  children,
}: {
  i: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`sketch-item ${className}`.trim()} style={{ "--i": i } as CSSProperties}>
      <div className="sketch-content">{children}</div>
      <svg className="sketch-ink" aria-hidden="true">
        <path className="sketch-line" />
      </svg>
    </div>
  );
}
