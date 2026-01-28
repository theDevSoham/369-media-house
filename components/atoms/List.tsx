import React from "react";
import ComponentRegistry from "../ComponentRegistry";
import LayoutItem from "../atoms/LayoutItem";
import clsx from "clsx";

export type ListItem = {
  key: string;
  name: string;
  props?: any;
  layout?: "horizontal" | "vertical";
  mode?: string;
  grid_span?: number;
  row_span?: number;
  component_data?: ListItem[];
};

interface ListProps {
  items: ListItem[];
  containerClass?: string;

  layout?: "vertical" | "horizontal"; // NEW
  wrap?: boolean; // NEW
  align?: "start" | "center" | "end"; // NEW
}

const List: React.FC<ListProps> = ({
  items,
  containerClass = "",
  layout = "vertical",
  wrap = false,
  align = "start",
}) => {
  return (
    <div
      className={clsx(
        containerClass,

        // 🔹 vertical list (default, backward-compatible)
        layout === "vertical" && "grid gap-6 grid-cols-1",

        // 🔹 horizontal list (chips / tags)
        layout === "horizontal" && "flex gap-4",
        layout === "horizontal" && wrap && "flex-wrap",

        // alignment
        layout === "horizontal" && align === "center" && "justify-center",
        layout === "horizontal" && align === "start" && "justify-start",
        layout === "horizontal" && align === "end" && "justify-end",
      )}
    >
      {items.map((item) => {
        const content = (
          <ComponentRegistry component={item}>
            {item.component_data?.length ? (
              <List items={item.component_data} />
            ) : null}
          </ComponentRegistry>
        );

        return (
          <LayoutItem
            key={item.key}
            colSpan={item.grid_span}
            rowSpan={item.row_span}
          >
            {content}
          </LayoutItem>
        );
      })}
    </div>
  );
};

export default List;
