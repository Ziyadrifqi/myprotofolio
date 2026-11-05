"use client";

/**
 * Attaches a pointer-follow CSS spotlight effect to any element.
 * Pairs with the `.spotlight` utility class in globals.css.
 */
export function useSpotlight() {
  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--x", `${x}%`);
    el.style.setProperty("--y", `${y}%`);
  }

  return { onMouseMove };
}
