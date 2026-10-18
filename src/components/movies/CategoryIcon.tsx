import NowPlaying from "@mui/icons-material/LocalMoviesOutlined";
import Popular from "@mui/icons-material/TrendingUp";
import TopRated from "@mui/icons-material/StarBorder";
import Upcoming from "@mui/icons-material/EventOutlined";
import type { Category } from "../../types";

const icons = {
  now_playing: NowPlaying,
  popular: Popular,
  top_rated: TopRated,
  upcoming: Upcoming,
};
export default function CategoryIcon({ category }: { category: Category }) {
  const Icon = icons[category];
  return <Icon fontSize="small" />;
}
