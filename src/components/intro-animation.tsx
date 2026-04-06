"use client";

import { useEffect, useState } from "react";

type IntroAnimationProps = {
  children: React.ReactNode;
};

const INTRO_DURATION_MS = 1800;
const INTRO_STORAGE_KEY = "portfolio-intro-played";

export function IntroAnimation({ children }: IntroAnimationProps) {
  const [playIntro, setPlayIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setPlayIntro(false);
      setIntroComplete(true);
      return;
    }

    if (window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "1") {
      setPlayIntro(false);
      setIntroComplete(true);
      return;
    }

    setPlayIntro(true);
    setIntroComplete(false);
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, "1");

    const timer = window.setTimeout(() => {
      setIntroComplete(true);
    }, INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div>{children}</div>

      {playIntro && !introComplete ? (
        <div
          className="intro-splash pointer-events-none fixed inset-0 z-110 grid place-items-center bg-black text-white"
          style={{ "--intro-duration": `${INTRO_DURATION_MS}ms` } as React.CSSProperties}
          aria-hidden
        >
          <div className="intro-splash-copy px-6 text-center">
            <p className="text-4xl font-bold tracking-[0.16em] sm:text-6xl">AVINASH</p>
            <p className="mt-3 text-xs uppercase tracking-[0.32em] text-zinc-300 sm:text-sm">
              Frontend Engineer
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
