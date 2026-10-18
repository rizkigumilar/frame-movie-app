import { useEffect, useState } from "react";
import { getMovie } from "../api";
import type { Movie } from "../types";

export function useMovieDetails(id: number) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setMovie(null);
    setError("");
    getMovie(id, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setMovie(data);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setError(error.message);
      });
    return () => controller.abort();
  }, [id, attempt]);

  return { movie, error, retry: () => setAttempt((value) => value + 1) };
}
