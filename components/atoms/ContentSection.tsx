import Image from "next/image";
import React from "react";

interface ContentSectionProps {
  variant: "block";
  chip: string;
  image?: string;
  image_alt?: string;
  chip_data: Array<{
    id: string;
    text: string;
  }>;
}

const BlockContentSection: React.FC<Pick<ContentSectionProps, "chip" | "image" | "image_alt" | "chip_data">> = ({
  chip,
  image,
  image_alt,
  chip_data
}) => {
  return (
    <section className="py-20 bg-[var(--color-bg-page)]">
      <div className="mx-auto max-w-6xl px-4 flex flex-col items-center gap-14">
        {/* Section pill */}
        {chip && (
          <div className="w-full flex justify-center mb-10">
            <div className="rounded-full bg-[var(--color-bg-surface)] md:py-3 md:px-12 py-3 px-8">
              <h3 className="font-sans md:text-xl text-base font-bold md:text-center text-left">
                {chip}
              </h3>
            </div>
          </div>
        )}

        {/* Illustration */}
        {image && <div className="w-full overflow-hidden">
          <Image
            src={image} // replace with your asset
            alt={image_alt ?? ""}
            width={1400}
            height={300}
            className="w-full object-contain"
          />
        </div>}

        {/* Service blocks */}
        <ul className="flex flex-wrap justify-center gap-4 max-w-5xl">
          {chip_data.map((service) => (
            <li
              key={service.id}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-6 py-3 font-sans text-sm md:text-base font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-surface)]"
            >
              {service.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const ContentSection: React.FC<ContentSectionProps> = ({
  variant,
  ...rest
}) => {
  switch (variant) {
    case "block":
      return <BlockContentSection {...rest} />;

    default:
      return null;
  }
};

export default ContentSection;
