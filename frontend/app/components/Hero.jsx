"use client";

import { useState, useEffect } from "react";

const heroImages = [
  {
    alt: "Patient with wrapped wrist",
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
  },
  {
    alt: "Attorney supporting stressed client",
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    alt: "Medical professional treating leg injury",
    src: "https://images.unsplash.com/photo-1453396450673-3fe83d2c9b8c?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Hero() {
  const firstLine = "Your Compassionate";
  const secondLine = "Personal Injury Advocates";
  const [displayedFirstLine, setDisplayedFirstLine] = useState("");
  const [displayedSecondLine, setDisplayedSecondLine] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingFirst, setIsTypingFirst] = useState(true);
  const [isTypingSecond, setIsTypingSecond] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (isTypingFirst && currentIndex < firstLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedFirstLine(firstLine.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);

      return () => clearTimeout(timeout);
    } else if (isTypingFirst && currentIndex >= firstLine.length) {
      // Wait a bit before starting second line
      const timeout = setTimeout(() => {
        setIsTypingFirst(false);
        setIsTypingSecond(true);
        setCurrentIndex(0);
      }, 500);

      return () => clearTimeout(timeout);
    } else if (isTypingSecond && currentIndex < secondLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedSecondLine(secondLine.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);

      return () => clearTimeout(timeout);
    } else if (isTypingSecond && currentIndex >= secondLine.length) {
      // Hide cursor after typing is complete
      setTimeout(() => setShowCursor(false), 1000);
    }
  }, [currentIndex, firstLine, secondLine, isTypingFirst, isTypingSecond]);

  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 pb-16 pt-20 text-center lg:px-0">
        <div className="space-y-6" data-aos="fade-up">
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-6xl md:leading-[1.1] min-h-[1.2em] md:min-h-[1.1em]" style={{ fontFamily: "'Homemade Apple', cursive" }}>
            <span className="inline-block">
              {displayedFirstLine}
              {(isTypingFirst || (isTypingSecond && currentIndex === 0)) && showCursor && <span className="animate-pulse">|</span>}
            </span>
            <br className="hidden md:block" />
            <span className="inline-block">
              {displayedSecondLine}
              {isTypingSecond && showCursor && <span className="animate-pulse">|</span>}
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-slate-600 md:text-xl" data-aos="fade-up" data-aos-delay="100">
            We&apos;re here to fight for your rights and secure the compensation you deserve after a
            personal injury. Your recovery is our priority
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center" data-aos="fade-up" data-aos-delay="200">
            <button className="rounded-full bg-slate-900 px-10 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black">
              Schedule now
            </button>
            <button className="rounded-full border border-slate-300 px-10 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900">
              Get in touch
            </button>
          </div>
        </div>
        <div className="grid w-full gap-6 md:grid-cols-3">
          {heroImages.map((image, idx) => (
            <div
              key={image.src}
              data-aos="fade-up"
              data-aos-delay={300 + idx * 100}
              className="h-64 overflow-hidden rounded-[32px] border border-slate-100 bg-slate-50 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
            >
              <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

