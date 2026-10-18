import type { Category } from "../types";

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: "now_playing", label: "Now playing", icon: "◉" },
  { id: "popular", label: "Popular", icon: "↗" },
  { id: "top_rated", label: "Top rated", icon: "☆" },
  { id: "upcoming", label: "Upcoming", icon: "▣" },
];
