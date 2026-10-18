import { Alert, AlertTitle, Box, Button } from "@mui/material";
import CategoryTabs from "../components/movies/CategoryTabs";
import CollectionHeading from "../components/movies/CollectionHeading";
import FeaturedMovie from "../components/movies/FeaturedMovie";
import MovieGrid from "../components/movies/MovieGrid";
import LoadMoreButton from "../components/movies/LoadMoreButton";
import { isDemo } from "../api";
import { demoMovies } from "../demo";
import type { Category, Movie, View } from "../types";

interface MovieListPageProps {
  category: Category;
  view: View;
  query: string;
  movies: Movie[];
  saved: Movie[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string;
  isSaved: (id: number) => boolean;
  onCategoryChange: (category: Category) => void;
  onOpen: (id: number) => void;
  onToggle: (movie: Movie) => void;
  onRetry: () => void;
  onLoadMore: () => void;
}

export default function MovieListPage({
  category,
  view,
  query,
  movies,
  saved,
  total,
  page,
  totalPages,
  loading,
  error,
  isSaved,
  onCategoryChange,
  onOpen,
  onToggle,
  onRetry,
  onLoadMore,
}: MovieListPageProps) {
  const featured = isDemo ? demoMovies[0] : movies[0];
  const discovering = view === "discover";

  return (
    <>
      {discovering && !query && featured && (
        <FeaturedMovie
          movie={featured}
          isSaved={isSaved(featured.id)}
          onOpen={onOpen}
          onToggle={onToggle}
        />
      )}
      <Box component="section" className="mt-10">
        <CollectionHeading
          view={view}
          query={query}
          total={total}
          watchlistCount={saved.length}
        />
        {discovering && !query && (
          <CategoryTabs category={category} onChange={onCategoryChange} />
        )}
        {error && discovering ? (
          <Alert severity="error" variant="outlined">
            <AlertTitle>We couldn’t load the movies</AlertTitle>
            <p>{error}</p>
            <Button onClick={onRetry}>Try again</Button>
          </Alert>
        ) : (
          <>
            <MovieGrid
              movies={discovering ? movies : saved}
              loading={discovering && loading && page === 1}
              view={view}
              isSaved={isSaved}
              onToggle={onToggle}
            />
            {discovering && page < totalPages && (
              <LoadMoreButton loading={loading} onClick={onLoadMore} />
            )}
          </>
        )}
      </Box>
    </>
  );
}
