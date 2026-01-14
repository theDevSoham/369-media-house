import React from "react";
import ComponentRegistry from "./ComponentRegistry";
import { Wrapper } from "@/schema/page.schema";
import LayoutItem from "./atoms/LayoutItem";

const container = "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8";

const backgroundClassMap: Record<
  NonNullable<SectionNode["background"]>,
  string
> = {
  page: "bg-[var(--color-bg-page)] text-[var(--color-text-primary)]",
  surface: "bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]",
  card: "bg-[var(--color-bg-card)] text-[var(--color-text-primary)]",
  primary: "bg-[var(--color-primary)] text-[var(--color-text-inverse)]",
  secondary: "bg-[var(--color-secondary)] text-[var(--color-text-inverse)]",
};

type SectionNode = {
  wrapper?: Wrapper;
  key: string;
  name: string;
  variant?: string;
  props?: any;
  layout?: string;
  mode?: string;
  is_contained: boolean;
  background?: "page" | "surface" | "card" | "primary" | "secondary";
  grid_span: number;
  component_data?: SectionNode[];
};

type SectionRendererProps = {
  nodes: SectionNode[];
};

const SectionRenderer: React.FC<SectionRendererProps> = ({ nodes }) => {
  return (
    <>
      {nodes.map((item) => {
        const content = (
          <RenderSection
            wrapper={item.wrapper}
            background={item.background}
            container={item.is_contained ? container : undefined}
          >
            <ComponentRegistry component={item}>
              {item.component_data && (
                <SectionRenderer nodes={item.component_data} />
              )}
            </ComponentRegistry>
          </RenderSection>
        );

        return (
          <LayoutItem key={item.key} span={item.grid_span}>
            {content}
          </LayoutItem>
        );
      })}
    </>
  );
};

const RenderSection: React.FC<{
  wrapper?: Wrapper;
  background?: "page" | "surface" | "card" | "primary" | "secondary";
  container?: string;
  children: React.ReactNode;
}> = ({
  wrapper: WrapperTag = React.Fragment,
  background,
  container,
  children,
}) => {
  const backgroundClass = background
    ? backgroundClassMap[background]
    : undefined;

  if (WrapperTag === React.Fragment) {
    return <>{children}</>;
  }

  return (
    <WrapperTag className={backgroundClass}>
      {container ? <div className={container}>{children}</div> : children}
    </WrapperTag>
  );
};

export default SectionRenderer;
