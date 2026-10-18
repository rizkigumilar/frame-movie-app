import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Star from "@mui/icons-material/Star";
import BookmarkAddOutlined from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAdded from "@mui/icons-material/BookmarkAdded";
import type { Movie } from "../../types";
import Poster from "./Poster";
interface MovieCardProps {
  movie: Movie;
  isSaved: boolean;
  onToggle: (movie: Movie) => void;
}
export default function MovieCard({
  movie,
  isSaved,
  onToggle,
}: MovieCardProps) {
  return (
    <Card
      component="article"
      variant="outlined"
      className="h-full [transition:transform_.2s,_border-color_.2s] hover:[transform:translateY(-4px)] hover:border-accent"
    >
      <Box className="relative">
        <CardActionArea
          component="a"
          href={`#/movie/${movie.id}`}
          aria-label={`View ${movie.title}`}
          className="aspect-[2/3]"
        >
          <Poster movie={movie} />
        </CardActionArea>
        <Chip
          icon={<Star className="text-[#f5d675]" />}
          label={movie.vote_average.toFixed(1)}
          size="small"
          className="absolute [top:10px] [left:10px] bg-[#141a18e6] text-[#fff] pointer-events-none"
        />
        <Tooltip
          title={isSaved ? "Remove from watchlist" : "Save to watchlist"}
        >
          <IconButton
            aria-label={`${isSaved ? "Remove" : "Save"} ${movie.title}`}
            onClick={() => onToggle(movie)}
            size="small"
            className={`absolute [right:10px] [top:10px] ${isSaved ? "bg-accent" : "bg-[#141a18dd]"} ${isSaved ? "text-on-accent" : "text-[#fff]"} ${isSaved ? "hover:bg-[#c6e59b]" : "hover:bg-[#32482b]"}`}
          >
            {isSaved ? (
              <BookmarkAdded fontSize="small" />
            ) : (
              <BookmarkAddOutlined fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <CardContent className="p-3 last:pb-3">
        <Link
          href={`#/movie/${movie.id}`}
          underline="hover"
          color="text.primary"
          title={movie.title}
          className="text-[14px] font-medium block overflow-hidden whitespace-nowrap text-ellipsis"
        >
          {movie.title}
        </Link>
        <Stack className="flex-row justify-between mt-1.5 flex">
          <Typography variant="caption" color="text.secondary">
            {movie.release_date?.slice(0, 4) || "TBA"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Movie
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
