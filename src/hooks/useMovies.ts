import { useEffect, useState } from "react";
import { getMovies } from "../api";
import type { Category, Movie } from "../types";

export function useMovies(category: Category, query: string, page: number) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    getMovies(category, query, page, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;
        setMovies((previous) =>
          page === 1
            ? data.results
            : [
                ...previous,
                ...data.results.filter(
                  (movie) => !previous.some((item) => item.id === movie.id),
                ),
              ],
        );
        setTotalPages(Math.min(data.total_pages, 500));
        setTotal(data.total_results);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [category, query, page, attempt]);

  return {
    movies,
    totalPages,
    total,
    loading,
    error,
    retry: () => setAttempt((value) => value + 1),
  };
}
