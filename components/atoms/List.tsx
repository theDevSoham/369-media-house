import Image from "next/image";
import React from "react";

interface ListProps {
  variant: "card" | "staggered";
  heading: string;
  content: Array<
    | {
        key: string;
        title: string;
        image: string;
        description: string;
      }
    | {
        key: string;
        chip: string;
        image: string;
        image_mobile_between?: string;
        description: string;
      }
  >;
}

const CardList: React.FC<Pick<ListProps, "heading" | "content">> = ({
  heading,
  content,
}) => (
  <section className="py-16 md:py-20">
    <h2 className="mb-10 text-center md:text-left font-sans text-3xl font-semibold md:text-4xl">
      {heading}
    </h2>

    <ul className="grid grid-cols-1 md:gap-16 gap-12 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
      {content.map((item) => (
        <li
          key={item.key}
          className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-shadow hover:shadow-md p-8"
        >
          {/* Image */}
          {/* Image (desktop or normal mobile) */}
          <div
            className={`h-48 w-full overflow-hidden border-b border-b-2 pb-4 ${
              "image_mobile_between" in item && item.image_mobile_between
                ? "hidden md:block"
                : ""
            }`}
          >
            <Image
              src={item.image}
              alt={item.key}
              className="h-full w-full object-cover"
              width={400}
              height={225}
              style={{ mixBlendMode: "darken" }}
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-3 py-6">
            {"title" in item && (
              <h3 className="font-sans text-lg md:text-2xl font-semibold text-left">
                {item.title}
              </h3>
            )}

            {"chip" in item && (
              <div className="flex justify-center">
                <div className="rounded-full bg-[var(--color-bg-surface)] py-3 px-12">
                  <h3 className="font-sans text-lg md:text-2xl font-bold text-center">
                    {item.chip}
                  </h3>
                </div>
              </div>
            )}

            {"image_mobile_between" in item && item.image_mobile_between && (
              <div className="block md:hidden w-full overflow-hidden rounded-[var(--radius-lg)]">
                <Image
                  src={item.image_mobile_between}
                  alt={`${item.key}-mobile`}
                  className="w-full h-auto object-cover"
                  width={400}
                  height={225}
                />
              </div>
            )}

            {/* Description always aligned */}
            <p className="mt-auto text-sm leading-relaxed text-left">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

const StaggeredList: React.FC<Pick<ListProps, "heading" | "content">> = ({
  heading,
  content,
}) => (
  <section className="">
    {heading && (
      <h2 className="mb-12 text-center font-sans text-3xl font-semibold md:text-4xl">
        {heading}
      </h2>
    )}

    <ul className="flex flex-col gap-16">
      {content.map((item, index) => {
        const isReversed = index % 2 !== 0;

        return (
          <li
            key={item.key}
            className={`grid grid-cols-1 items-center md:gap-12 gap-8 md:grid-cols-2 ${
              isReversed ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Image */}
            <div
              className={`overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-surface)] ${
                "image_mobile_between" in item && item.image_mobile_between
                  ? "hidden md:block"
                  : ""
              }`}
            >
              <Image
                src={item.image}
                alt={item.key}
                className="h-full w-full object-cover"
                width={600}
                height={400}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4">
              {"title" in item && (
                <h3 className="font-sans md:text-6xl text-4xl font-bold md:text-center text-left">
                  {item.title}
                </h3>
              )}

              {"chip" in item && (
                <div className="w-full flex justify-center mb-10">
                  <div className="rounded-full bg-[var(--color-bg-surface)] md:py-3 md:px-12 py-3 px-8">
                    <h3 className="font-sans md:text-xl text-base font-bold md:text-center text-left">
                      {item.chip}
                    </h3>
                  </div>
                </div>
              )}

              {"image_mobile_between" in item && item.image_mobile_between && (
                <div className="block md:hidden w-full overflow-hidden rounded-[var(--radius-lg)] my-6">
                  <Image
                    src={item.image_mobile_between}
                    alt={`${item.key}-mobile`}
                    className="w-full h-auto object-cover"
                    width={600}
                    height={400}
                  />
                </div>
              )}

              <p className="md:text-base text-sm leading-relaxed md:text-center text-left">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  </section>
);

const List: React.FC<ListProps> = ({ variant, heading, content }) => {
  switch (variant) {
    case "card":
      return <CardList heading={heading} content={content} />;

    case "staggered":
      return <StaggeredList heading={heading} content={content} />;

    default:
      return null;
  }
};

export default List;
