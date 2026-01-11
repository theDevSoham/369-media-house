import React from "react";
import ComponentRegistry from "./ComponentRegistry";
import { Wrapper } from "@/schema/page.schema";

const backgroundClassMap: Record<
  NonNullable<SectionRendererProps["nodes"][number]["background"]>,
  string
> = {
  page: "bg-[var(--color-bg-page)] text-[var(--color-text-primary)]",
  surface: "bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]",
  card: "bg-[var(--color-bg-card)] text-[var(--color-text-primary)]",
  primary: "bg-[var(--color-primary)] text-[var(--color-text-inverse)]",
  secondary: "bg-[var(--color-secondary)] text-[var(--color-text-inverse)]",
};

type SectionRendererProps = {
  nodes: {
    wrapper?: Wrapper;
    key: string;
    name: string;
    variant?: string;
    props?: any;
    container?: string;
    is_contained: boolean;
    background?: "page" | "surface" | "card" | "primary" | "secondary";
  }[];
};

const SectionRenderer: React.FC<SectionRendererProps> = ({ nodes }) => {
  return (
    <React.Fragment>
      {nodes.map((item) => (
        <RenderSection
          key={item.key}
          wrapper={item.wrapper}
          background={item.background}
          container={item.is_contained ? item.container : undefined}
        >
          <ComponentRegistry component={item} />
        </RenderSection>
      ))}
    </React.Fragment>
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

  // No wrapper at all → just children
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
