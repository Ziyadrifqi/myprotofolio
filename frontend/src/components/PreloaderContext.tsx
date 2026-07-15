"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type PreloaderContextValue = {
  visible: boolean;
  fading: boolean;
  /** Show the preloader briefly, then run the given callback once it's done. */
  trigger: (afterFade: () => void) => void;
};

const PreloaderContext = createContext<PreloaderContextValue | null>(null);

const SHOW_DURATION = 650;
const FADE_DURATION = 350;
/** Slightly longer on first load so the boot animation feels intentional. */
const INITIAL_SHOW_DURATION = 900;

export function PreloaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const initialTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  // Auto-hide on first mount (initial page load / refresh).
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), INITIAL_SHOW_DURATION);
    const hideTimer = setTimeout(
      () => setVisible(false),
      INITIAL_SHOW_DURATION + FADE_DURATION
    );
    initialTimers.current = [fadeTimer, hideTimer];

    return () => {
      initialTimers.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trigger = useCallback(
    (afterFade: () => void) => {
      clearTimers();
      initialTimers.current.forEach(clearTimeout);
      initialTimers.current = [];
      setVisible(true);
      setFading(false);

      // Run the navigation action right as the overlay is fully opaque,
      // so the scroll jump happens while the screen is covered.
      timers.current.push(
        setTimeout(() => {
          afterFade();
          setFading(true);
        }, SHOW_DURATION)
      );

      timers.current.push(
        setTimeout(() => {
          setVisible(false);
        }, SHOW_DURATION + FADE_DURATION)
      );
    },
    [clearTimers]
  );

  return (
    <PreloaderContext.Provider value={{ visible, fading, trigger }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  const ctx = useContext(PreloaderContext);
  if (!ctx) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return ctx;
}

export const PRELOADER_TIMINGS = { SHOW_DURATION, FADE_DURATION };
