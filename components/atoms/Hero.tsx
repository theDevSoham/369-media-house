"use client";

import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import CarouselArrow from "./ui/Carousel/CarouselArrow";

interface HeroProps {
  hero_list: Array<{
    key: string;
    headline: string;
    description: string;
    background: {
      image: string;
      overlay: boolean;
      overlay_opacity: string;
    };
    cta: Array<{
      label: string;
      action: string;
      type: "primary" | "secondary" | "muted" | "inverse";
    }>;
  }>;
}

const Hero: React.FC<HeroProps> = ({ hero_list }) => {
  return (
    <section className="bg-[var(--color-bg-page)] w-full lg:h-[90vh] h-[500px]">
      <Carousel
        showThumbs={false} // hide thumbnails
        showStatus={false} // show slide number
        showIndicators={true} // navigation dots
        infiniteLoop={true} // infinite scroll
        autoPlay={true} // autoplay
        interval={2000} // slide interval
        transitionTime={600} // slide animation
        swipeable={true} // enable drag/swipe
        emulateTouch={true} // emulate touch on desktop
        centerMode={true} // center content
        centerSlidePercentage={100} // make slides full width
        className="w-full h-full" // full width & height
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <CarouselArrow
            direction="left"
            onClick={onClickHandler}
            visible={hasPrev}
            label={label}
            className="left-5 z-99 text-white"
          />
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <CarouselArrow
            direction="right"
            onClick={onClickHandler}
            visible={hasNext}
            label={label}
            className="right-5 z-99 text-white"
          />
        )}
      >
        {hero_list.map((item) => (
          <div className="w-full h-full relative" key={item.key}>
            <div className="absolute z-1 w-full h-full">
              <Image
                src={item.background.image}
                alt={item.background.image}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>

            {item.background?.overlay && (
              <div
                className="absolute inset-0 z-2 bg-[var(--colors-background-overlay)] pointer-events-none"
                style={{
                  opacity: item.background.overlay_opacity,
                }}
              />
            )}

            <div className="absolute z-3 w-full h-full flex flex-col justify-center items-center gap-6 px-4">
              {/* Heading */}
              <h1 className="max-w-3xl font-sans text-4xl font-semibold leading-tight md:text-5xl text-center text-white">
                {item.headline}
              </h1>

              {/* Subheading */}
              <p className="max-w-2xl text-base md:text-lg text-center text-white">
                {item.description}
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                {item.cta.map((ctas) => {
                  switch (ctas.type) {
                    case "primary":
                      return (
                        <button
                          key={ctas.label}
                          className="rounded-[var(--radius-md)] bg-[var(--color-primary)] px-6 py-3 text-sm font-medium hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] text-white"
                        >
                          {ctas.label}
                        </button>
                      );

                    case "inverse": {
                      return (
                        <button
                          key={ctas.label}
                          type="button"
                          className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-6 py-3 text-sm font-medium transition-color bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-page)]"
                        >
                          {ctas.label}
                        </button>
                      );
                    }
                  }
                })}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Hero;
