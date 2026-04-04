"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type IntroAnimationProps = {
  children: React.ReactNode;
};

const INTRO_DURATION_MS = 1500;

export function IntroAnimation({ children }: IntroAnimationProps) {
  const prefersReducedMotion = useReducedMotion();
  const [playIntro, setPlayIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  const nameLetters = useMemo(() => "Avinash".split(""), []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setPlayIntro(false);
      setIntroComplete(true);
      return;
    }

    setPlayIntro(true);
    setIntroComplete(false);
    const timer = window.setTimeout(() => {
      setIntroComplete(true);
    }, INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <div>{children}</div>

      {playIntro && !introComplete ? (
        <>
          <motion.div
            className="pointer-events-none fixed inset-0 z-[110] backdrop-blur-[3px]"
            initial={{ opacity: 0.65 }}
            animate={{ opacity: [0.65, 0.65, 0] }}
            transition={{ duration: INTRO_DURATION_MS / 1000, times: [0, 0.78, 1], ease: "easeInOut" }}
            aria-hidden
          />

          <motion.div
            className="fixed left-0 top-0 z-[120] h-full w-full overflow-hidden bg-[#0a0a0a]"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 0] }}
            transition={{ duration: INTRO_DURATION_MS / 1000, times: [0, 0.82, 1], ease: "easeInOut" }}
            aria-hidden
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.14),transparent_45%),radial-gradient(circle_at_70%_65%,rgba(45,212,191,0.12),transparent_42%)]" />

          <motion.div
            className="pointer-events-none absolute left-[-35vw] top-1/2 h-[3px] w-[42vw] -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-300/0 via-cyan-200/90 to-emerald-300/0 blur-[1px]"
            initial={{ x: 0, opacity: 0, scaleX: 0.7 }}
            animate={{ x: [0, 72, 170], opacity: [0, 1, 0.45], scaleX: [0.7, 1.25, 1.05] }}
            transition={{ duration: 0.62, delay: 0.06, ease: "easeInOut" }}
          />

          <motion.div
            className="pointer-events-none absolute left-[-34vw] top-1/2 h-8 w-[40vw] -translate-y-1/2 rounded-full bg-cyan-200/25 blur-3xl"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: [0, 84, 180], opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.66, delay: 0.02, ease: "easeInOut" }}
          />

            <div className="absolute inset-0 grid place-items-center px-6 text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, staggerChildren: 0.04, ease: "easeInOut" },
                  },
                }}
              >
                <p className="flex justify-center text-5xl font-bold tracking-[0.12em] text-white sm:text-7xl">
                  {nameLetters.map((letter, index) => (
                    <motion.span
                      key={`${letter}-${index}`}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeInOut" } },
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </p>

                <motion.p
                  className="mt-3 text-sm uppercase tracking-[0.28em] text-zinc-300 sm:text-base"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.28, ease: "easeInOut" }}
                >
                  Frontend Engineer
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </>
      ) : null}
    </>
  );
}
