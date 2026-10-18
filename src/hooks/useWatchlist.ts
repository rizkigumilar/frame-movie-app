import { useState } from "react";
import type { Movie } from "../types";

const STORAGE_KEY = "frame-watchlist";

export function useWatchlist() {
  const [saved, setSaved] = useState<Movie[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  function toggle(movie: Movie) {
    setSaved((previous) => {
      const next = previous.some((item) => item.id === movie.id)
        ? previous.filter((item) => item.id !== movie.id)
        : [...previous, movie];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return {
    saved,
    toggle,
    isSaved: (id: number) => saved.some((movie) => movie.id === id),
  };
}
