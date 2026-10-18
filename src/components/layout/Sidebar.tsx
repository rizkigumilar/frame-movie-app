import {
  Box,
  Chip,
  Divider,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ExploreOutlined from "@mui/icons-material/ExploreOutlined";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import MovieFilterOutlined from "@mui/icons-material/MovieFilterOutlined";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import CategoryIcon from "../movies/CategoryIcon";
import { categories } from "../../constants/categories";
import type { Category, View } from "../../types";

interface SidebarProps {
  category: Category;
  view: View;
  watchlistCount: number;
  onViewChange: (view: View) => void;
  onCategoryChange: (category: Category) => void;
}

export default function Sidebar({
  category,
  view,
  watchlistCount,
  onViewChange,
  onCategoryChange,
}: SidebarProps) {
  return (
    <Paper
      component="aside"
      square
      className="w-full md:w-60 static md:fixed md:[inset:0_auto_0_0] p-4 md:p-6 md:[border-right:1px_solid] [border-bottom:1px_solid] md:[border-bottom:0px_solid] border-outline flex flex-row md:flex-col items-center md:items-stretch gap-2 md:gap-0 [z-index:1100]"
    >
      <Link
        href="#"
        onClick={() => onViewChange("discover")}
        underline="none"
        color="text.primary"
        className="flex items-center gap-2 mr-auto md:mr-0"
      >
        <MovieFilterOutlined color="primary" className="text-[32px]" />
        <Typography variant="h5" className="font-bold">
          frame
          <Box component="span" color="primary.main">
            .
          </Box>
        </Typography>
      </Link>
      <Typography
        variant="overline"
        color="text.secondary"
        className="mt-2 mb-8 hidden md:block"
      >
        Your cinema companion
      </Typography>
      <List
        component="nav"
        aria-label="Main navigation"
        className="flex md:block p-0"
      >
        <ListItemButton
          selected={view === "discover"}
          onClick={() => onViewChange("discover")}
          className="mb-1 rounded-[28px] px-3 md:px-4 [&.Mui-selected]:bg-[#32482b] [&.Mui-selected]:text-[#d2edbd]"
        >
          <ListItemIcon className="min-w-8 hidden sm:flex text-inherit">
            <ExploreOutlined />
          </ListItemIcon>
          <ListItemText
            primary="Discover"
            slotProps={{ primary: { className: "text-sm" } }}
          />
        </ListItemButton>
        <ListItemButton
          selected={view === "watchlist"}
          onClick={() => onViewChange("watchlist")}
          className="mb-1 rounded-[28px] gap-2 px-3 md:px-4 [&.Mui-selected]:bg-[#32482b] [&.Mui-selected]:text-[#d2edbd]"
        >
          <ListItemIcon className="min-w-6 hidden sm:flex text-inherit">
            <BookmarkBorder />
          </ListItemIcon>
          <ListItemText
            primary="Watchlist"
            slotProps={{ primary: { className: "text-sm" } }}
          />
          <Chip
            label={watchlistCount}
            size="small"
            className="h-[22px] [&_.MuiChip-label]:px-1.6"
          />
        </ListItemButton>
      </List>
      <Box className="hidden md:block mt-8">
        <Typography variant="overline" color="text.secondary" className="px-4">
          Browse movies
        </Typography>
        <List aria-label="Browse movies">
          {categories.map((item) => (
            <ListItemButton
              key={item.id}
              selected={category === item.id && view === "discover"}
              onClick={() => onCategoryChange(item.id)}
            >
              <ListItemIcon className="min-w-9 text-inherit">
                <CategoryIcon category={item.id} />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { className: "text-sm" } }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box className="hidden md:block mt-auto pt-10">
        <AutoAwesomeOutlined color="primary" className="mb-4" />
        <Typography>A good film changes everything.</Typography>
        <Typography variant="body2" color="text.secondary" className="mt-2">
          Find your next one.
        </Typography>
        <Divider className="my-6" />
        <Stack className="flex-row gap-2 items-center flex">
          <Typography variant="overline" color="text.secondary">
            Powered by
          </Typography>
          <Typography variant="caption" color="primary">
            TMDB
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}
