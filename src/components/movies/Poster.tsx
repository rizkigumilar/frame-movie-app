import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MovieOutlined from "@mui/icons-material/MovieOutlined";
import { imageUrl } from "../../api";
import type { Movie } from "../../types";
export default function Poster({ movie }: { movie: Movie }) {
  const [failed, setFailed] = useState(false);
  return movie.poster_path && !failed ? (
    <Box
      component="img"
      src={imageUrl(movie.poster_path)}
      alt={`${movie.title} poster`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover block"
    />
  ) : (
    <Box className="h-full bg-surface flex flex-col items-center justify-center p-4 gap-4">
      <MovieOutlined color="primary" className="text-[48px]" />
      <Typography align="center">{movie.title}</Typography>
    </Box>
  );
}
