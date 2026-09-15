"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mesh-theme");
    const next = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("mesh-theme", next ? "dark" : "light");
  }

  return (
    <button type="button" className="btn btn-secondary px-3 py-2 text-sm" onClick={toggle}>
      {dark ? "Light" : "Dark"}
    </button>
  );
}
