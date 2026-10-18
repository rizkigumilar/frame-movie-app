import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import BookmarkAddOutlined from "@mui/icons-material/BookmarkAddOutlined";
import Check from "@mui/icons-material/Check";
import Star from "@mui/icons-material/Star";
import { imageUrl } from "../../api";
import type { Movie } from "../../types";
interface FeaturedMovieProps {
  movie: Movie;
  isSaved: boolean;
  onOpen: (id: number) => void;
  onToggle: (movie: Movie) => void;
}
export default function FeaturedMovie({
  movie,
  isSaved,
  onOpen,
  onToggle,
}: FeaturedMovieProps) {
  return (
    <Paper
      component="section"
      className="relative overflow-hidden rounded-[28px] min-h-[390px] md:min-h-[440px] p-6 sm:p-10 flex items-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(90deg,rgba(10,17,14,.98),rgba(10,17,14,.7) 50%,rgba(10,17,14,.18)),url(${imageUrl(movie.backdrop_path, "original")})`,
      }}
    >
      <Box className="max-w-[550px] relative">
        <Chip
          label="In the spotlight"
          color="primary"
          size="small"
          variant="outlined"
          className="mb-6 bg-[#101a11aa]"
        />
        <Typography
          variant="h3"
          component="h1"
          className="text-[36px] sm:text-[52px] lg:text-[60px] [line-height:1.1] text-[#f0f4ed]"
        >
          {movie.title}
        </Typography>
        <Stack className="flex-row gap-3 items-center my-5 flex">
          <Chip
            icon={<Star />}
            label={movie.vote_average.toFixed(1)}
            size="small"
            color="primary"
          />
          <Typography variant="body2" className="text-[#c0c9c0]">
            {movie.release_date?.slice(0, 4) || "TBA"}
          </Typography>
          <Typography variant="body2" className="text-[#c0c9c0]">
            Featured film
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          className="text-[#c0c9c0] [line-height:1.8] line-clamp-3"
        >
          {movie.overview}
        </Typography>
        <Stack className="flex-row gap-3 mt-6 flex">
          <Button
            variant="contained"
            onClick={() => onOpen(movie.id)}
            endIcon={<ArrowOutward />}
          >
            Explore movie
          </Button>
          <Button
            variant="outlined"
            onClick={() => onToggle(movie)}
            startIcon={isSaved ? <Check /> : <BookmarkAddOutlined />}
            className="bg-[#101a11aa]"
          >
            {isSaved ? "Saved" : "Watchlist"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
