import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import BookmarkAddOutlined from "@mui/icons-material/BookmarkAddOutlined";
import Check from "@mui/icons-material/Check";
import Star from "@mui/icons-material/Star";
import type { Movie } from "../../types";
import { imageUrl } from "../../api";
import Poster from "./Poster";
import MovieCredits from "./MovieCredits";
interface MovieDetailsProps {
  movie: Movie;
  isSaved: boolean;
  onToggle: (movie: Movie) => void;
}
export default function MovieDetails({
  movie,
  isSaved,
  onToggle,
}: MovieDetailsProps) {
  return (
    <>
      <Paper
        className="p-6 md:p-10 rounded-[28px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(90deg,#101a14f5,#101a14cc),url(${imageUrl(movie.backdrop_path, "original")})`,
        }}
      >
        <Stack className="flex-col md:flex-row gap-8 flex flex-col">
          <Box className="[width:160px] md:[width:230px] aspect-[2/3] [flex-shrink:0] rounded-[12px] overflow-hidden [align-self:flex-start]">
            <Poster movie={movie} />
          </Box>
          <Box>
            <Typography variant="overline" color="primary">
              The story behind the screen
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              className="mt-2 text-[32px] sm:text-[44px]"
            >
              {movie.title}
            </Typography>
            {movie.tagline && (
              <Typography color="text.secondary" className="italic mt-2">
                {movie.tagline}
              </Typography>
            )}
            <Stack className="flex-row gap-4 items-center my-5 flex">
              <Chip
                icon={<Star />}
                label={movie.vote_average.toFixed(1)}
                color="primary"
                size="small"
              />
              <Typography variant="body2">
                {movie.release_date?.slice(0, 4) || "TBA"}
              </Typography>
              {!!movie.runtime && (
                <Typography variant="body2">{movie.runtime} min</Typography>
              )}
            </Stack>
            <Stack
              useFlexGap

              className="flex-row gap-2 flex-wrap flex"
            >
              {movie.genres?.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Stack>
            <Typography variant="h6" component="h3" className="mt-6">
              Synopsis
            </Typography>
            <Typography
              color="text.secondary"
              className="[line-height:1.8] mt-2 mb-6"
            >
              {movie.overview || "A synopsis is not available yet."}
            </Typography>
            <Button
              variant="contained"
              onClick={() => onToggle(movie)}
              startIcon={isSaved ? <Check /> : <BookmarkAddOutlined />}
            >
              {isSaved ? "In your watchlist" : "Add to watchlist"}
            </Button>
          </Box>
        </Stack>
      </Paper>
      <MovieCredits movie={movie} />
    </>
  );
}
