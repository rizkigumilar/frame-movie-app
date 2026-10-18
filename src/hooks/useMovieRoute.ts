import { useEffect, useState } from "react";

function currentId() {
  return Number(window.location.hash.match(/^#\/movie\/(\d+)/)?.[1]) || null;
}

export function useMovieRoute() {
  const [selected, setSelected] = useState<number | null>(currentId);

  useEffect(() => {
    const onHashChange = () => setSelected(currentId());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function open(id: number) {
    window.location.hash = `/movie/${id}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    window.location.hash = "";
  }

  return { selected, open, back };
}
