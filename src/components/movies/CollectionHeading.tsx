import { Box, Chip, Stack, Typography } from "@mui/material";
import type { View } from "../../types";
interface CollectionHeadingProps {
  view: View;
  query: string;
  total: number;
  watchlistCount: number;
}
export default function CollectionHeading({
  view,
  query,
  total,
  watchlistCount,
}: CollectionHeadingProps) {
  return (
    <Stack className="flex-row gap-4 items-center justify-between mb-6 flex">
      <Box>
        <Typography variant="overline" color="primary">
          {view === "watchlist"
            ? "Your personal collection"
            : "A little discovery goes a long way"}
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          className="mt-1 text-[26px] sm:text-[32px]"
        >
          {view === "watchlist"
            ? "Your watchlist"
            : query
              ? `Results for “${query}”`
              : "Find your next great watch"}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mt-2">
          {view === "watchlist"
            ? "The stories you’re saving for later."
            : query
              ? `${total.toLocaleString()} movies found. Your next favorite might be here.`
              : "From big-screen favorites to hidden gems. Your next story starts here."}
        </Typography>
      </Box>
      <Chip
        variant="outlined"
        label={`${(view === "watchlist" ? watchlistCount : total).toLocaleString()} movies`}
        className="hidden sm:flex"
      />
    </Stack>
  );
}
