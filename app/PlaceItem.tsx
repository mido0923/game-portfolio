import type { CSSProperties } from "react";

/**
 * PlaceReveal の中で「順番に配置される」1オブジェクト。
 * i が配置順（ドロップインの遅延）。className にはレイアウト用クラスを渡す。
 */
export default function PlaceItem({
  i,
  className = "",
  children,
}: {
  i: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`place-item ${className}`.trim()} style={{ "--i": i } as CSSProperties}>
      {children}
    </div>
  );
}
