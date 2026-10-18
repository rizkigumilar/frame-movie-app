import { Box, Paper, Skeleton, Typography } from "@mui/material";
import SearchOff from "@mui/icons-material/SearchOff";
import MovieCard from "./MovieCard";
import type { Movie, View } from "../../types";
interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  view: View;
  isSaved: (id: number) => boolean;
  onToggle: (movie: Movie) => void;
}
export default function MovieGrid({
  movies,
  loading,
  view,
  isSaved,
  onToggle,
}: MovieGridProps) {
  if (loading)
    return (
      <Box
        role="status"
        aria-label="Loading movies"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton
            variant="rounded"
            key={index}
            className="aspect-[2/3] h-auto"
          />
        ))}
      </Box>
    );
  if (!movies.length)
    return (
      <Paper variant="outlined" className="py-16 px-6 text-center">
        <SearchOff color="primary" className="text-[48px] mb-4" />
        <Typography variant="h5" component="h3">
          {view === "watchlist"
            ? "Make room for great stories"
            : "No movies found"}
        </Typography>
        <Typography color="text.secondary" className="mt-2">
          {view === "watchlist"
            ? "Tap the bookmark icon on a movie to save it here."
            : "Try a different title or explore a category."}
        </Typography>
      </Paper>
    );
  return (
    <Box className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isSaved={isSaved(movie.id)}
          onToggle={onToggle}
        />
      ))}
    </Box>
  );
}
