import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import MovieDetails from "../components/movies/MovieDetails";
import { useMovieDetails } from "../hooks/useMovieDetails";
import type { Movie } from "../types";

interface MovieDetailPageProps {
  id: number;
  isSaved: boolean;
  onBack: () => void;
  onToggle: (movie: Movie) => void;
}

export default function MovieDetailPage({
  id,
  isSaved,
  onBack,
  onToggle,
}: MovieDetailPageProps) {
  const { movie, error, retry } = useMovieDetails(id);

  return (
    <Box component="section">
      <Button onClick={onBack} startIcon={<ArrowBack />} className="mb-6">
        Back to movies
      </Button>
      {error ? (
        <Alert
          severity="error"
          action={<Button onClick={retry}>Try again</Button>}
        >
          {error}
        </Alert>
      ) : !movie ? (
        <Stack role="status" className="gap-4 items-center py-16 flex flex-col">
          <CircularProgress />
          <Typography>Loading movie details…</Typography>
        </Stack>
      ) : (
        <MovieDetails movie={movie} isSaved={isSaved} onToggle={onToggle} />
      )}
    </Box>
  );
}
