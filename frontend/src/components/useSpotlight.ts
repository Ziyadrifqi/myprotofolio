"use client";

import { useRef } from "react";

/**
 * Attaches a pointer-follow CSS spotlight effect to any element.
 * Pairs with the `.spotlight` utility class in globals.css.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  function onMouseMove(e: React.MouseEvent<T>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--x", `${x}%`);
    el.style.setProperty("--y", `${y}%`);
  }

  return { ref, onMouseMove };
}
