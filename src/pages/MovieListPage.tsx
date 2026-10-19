import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import CategoryTabs from "../components/movies/CategoryTabs";
import CollectionHeading from "../components/movies/CollectionHeading";
import FeaturedMovie from "../components/movies/FeaturedMovie";
import MovieGrid from "../components/movies/MovieGrid";
import InfiniteScroll from "../components/movies/InfiniteScroll";
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
        {error && discovering && page === 1 ? (
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
            {discovering && error && page > 1 ? (
              <Alert severity="error" variant="outlined" className="mt-6" action={<Button onClick={onRetry}>Try again</Button>}>
                Couldn’t load more movies. {error}
              </Alert>
            ) : discovering && page < totalPages ? (
              <InfiniteScroll key={`${category}:${query}`} page={page} loading={loading} onLoadMore={onLoadMore} />
            ) : discovering && movies.length > 0 && !loading ? (
              <Typography role="status" className="mt-8 text-center" color="text.secondary" variant="body2">You’ve reached the end of the results.</Typography>
            ) : null}
          </>
        )}
      </Box>
    </>
  );
}
