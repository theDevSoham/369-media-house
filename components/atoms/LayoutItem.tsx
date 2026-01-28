// atoms/GridItem.tsx
import React from "react";
import clsx from "clsx";

type GridItemProps = {
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  children: React.ReactNode;
};

const COL_SPAN_MAP: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

const ROW_SPAN_MAP: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
};

const LayoutItem: React.FC<GridItemProps> = ({
  colSpan,
  rowSpan,
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        colSpan && COL_SPAN_MAP[colSpan],
        rowSpan && ROW_SPAN_MAP[rowSpan],
        className,
      )}
    >
      {children}
    </div>
  );
};

export default LayoutItem;
