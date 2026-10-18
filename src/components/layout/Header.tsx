import {
  AppBar,
  Avatar,
  Breadcrumbs,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchBar from "./SearchBar";
interface HeaderProps {
  title: string;
  draft: string;
  onDraftChange: (value: string) => void;
  onSearch: (query: string) => void;
  onClearSearch: () => void;
}
export default function Header({
  title,
  draft,
  onDraftChange,
  onSearch,
  onClearSearch,
}: HeaderProps) {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className="[border-bottom:1px_solid] border-outline bg-surface"
    >
      <Toolbar className="gap-4 py-2 px-4 md:px-8">
        <Breadcrumbs className="hidden sm:block whitespace-nowrap">
          <Typography variant="body2" color="text.secondary">
            Movies
          </Typography>
          <Typography variant="body2">{title}</Typography>
        </Breadcrumbs>
        <SearchBar
          draft={draft}
          onChange={onDraftChange}
          onSubmit={onSearch}
          onClear={onClearSearch}
        />
        <Avatar className="bg-[#809b5b] text-on-accent [width:34px] [height:34px] text-[14px]">
          C
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
