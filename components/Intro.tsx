"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export const IMAGES = [
  "https://i.pinimg.com/736x/cf/ad/4a/cfad4a21cd2a84f22979e5b757e09c07.jpg",
  "https://i.pinimg.com/1200x/f1/82/97/f182976f1382eebd7be2c0526142587c.jpg",
  "https://i.pinimg.com/1200x/86/5f/2a/865f2aac5c8f5a1a073798413b222b12.jpg",
  "https://i.pinimg.com/736x/e6/d8/fc/e6d8fc8ebd8a6dde2e8ebba48def3843.jpg",
  "https://i.pinimg.com/1200x/3c/37/f2/3c37f252a137532052162372e221d04e.jpg",
  "/landing.jpg",
];


export const INTRO_END_DELAY_SEC =
  0.35 + (IMAGES.length - 1) * 0.25 + 1 + 1;

const Intro = () => {
  const refs = useRef<(HTMLImageElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const radialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imgs = refs.current.filter(Boolean);
    if (!imgs.length) return;

    const timeline = gsap.timeline();

    timeline.to(imgs, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      delay: 0.35,
      stagger: { each: 0.25, ease: "power1.out" },
    });

    timeline.to(containerRef.current, {
      width: "100%",
      height: "100dvh",
      maxWidth: "none",
      aspectRatio: "unset",
      margin: 0,
      duration: 1,
      ease: "power3.inOut",
    });

    timeline.to(
      radialRef.current,
      {
        opacity: 1,
        duration: 0.85,
        ease: "power2.out",
      },
      ">"
    );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        ref={containerRef}
        className="relative aspect-video w-[min(88vw,28rem)] overflow-hidden md:w-[42vw]"
      >
        {IMAGES.map((src, i) => (
          <img
            key={src}
            ref={(el) => {
              refs.current[i] = el;
            }}
            src={src}
            alt=""
            className="absolute inset-0 size-full object-cover"
            style={{ zIndex: i, clipPath: "inset(0% 0% 100% 0%)" }}
          />
        ))}
        <div
          ref={radialRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 88% at 50% 42%, transparent 22%, rgba(0,0,0,0.6) 58%, rgba(0,0,0,0.82) 100%)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
};

export default Intro;
