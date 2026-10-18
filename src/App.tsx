import {
  Alert,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { theme } from "./theme";
import { useState } from "react";
import { isDemo } from "./api";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MovieDetailPage from "./pages/MovieDetailPage";
import MovieListPage from "./pages/MovieListPage";
import { useMovies } from "./hooks/useMovies";
import { useMovieRoute } from "./hooks/useMovieRoute";
import { useWatchlist } from "./hooks/useWatchlist";
import type { Category, View } from "./types";

export default function App() {
  const [category, setCategory] = useState<Category>("now_playing");
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<View>("discover");
  const { selected, open, back } = useMovieRoute();
  const { saved, toggle, isSaved } = useWatchlist();
  const { movies, totalPages, total, loading, error, retry } = useMovies(
    category,
    query,
    page,
  );

  function changeView(nextView: View) {
    setView(nextView);
    back();
  }

  function chooseCategory(nextCategory: Category) {
    setCategory(nextCategory);
    setQuery("");
    setDraft("");
    setPage(1);
    changeView("discover");
  }

  function search(nextQuery: string) {
    setQuery(nextQuery);
    setPage(1);
    changeView("discover");
  }

  function clearSearch() {
    setDraft("");
    setQuery("");
    setPage(1);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="min-h-screen">
        <Sidebar
          category={category}
          view={view}
          watchlistCount={saved.length}
          onViewChange={changeView}
          onCategoryChange={chooseCategory}
        />
        <Box className="md:[margin-left:240px]">
          <Header
            title={
              selected
                ? "Movie details"
                : view === "watchlist"
                  ? "Watchlist"
                  : "Discover"
            }
            draft={draft}
            onDraftChange={setDraft}
            onSearch={search}
            onClearSearch={clearSearch}
          />
          <Container maxWidth="xl" className="pt-6 md:pt-8 px-4 md:px-8">
            <Box component="main">
              {isDemo && (
                <Alert
                  role="status"
                  severity="info"
                  variant="outlined"
                  className="mb-6"
                >
                  Preview collection{" "}
                  <span>Connect TMDB to explore live movies.</span>
                </Alert>
              )}
              {selected ? (
                <MovieDetailPage
                  key={selected}
                  id={selected}
                  isSaved={isSaved(selected)}
                  onBack={back}
                  onToggle={toggle}
                />
              ) : (
                <MovieListPage
                  category={category}
                  view={view}
                  query={query}
                  movies={movies}
                  saved={saved}
                  total={total}
                  page={page}
                  totalPages={totalPages}
                  loading={loading}
                  error={error}
                  isSaved={isSaved}
                  onCategoryChange={chooseCategory}
                  onOpen={open}
                  onToggle={toggle}
                  onRetry={retry}
                  onLoadMore={() => setPage((value) => value + 1)}
                />
              )}
            </Box>
            <Footer />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
