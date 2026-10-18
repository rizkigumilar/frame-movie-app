import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import Search from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import ArrowForward from "@mui/icons-material/ArrowForward";

interface SearchBarProps {
  draft: string;
  onChange: (value: string) => void;
  onSubmit: (query: string) => void;
  onClear: () => void;
}
export default function SearchBar({
  draft,
  onChange,
  onSubmit,
  onClear,
}: SearchBarProps) {
  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(draft.trim());
      }}
      className="w-full sm:[width:360px] ml-auto"
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Search movies, discover stories…"
        value={draft}
        onChange={(event) => onChange(event.target.value)}
        slotProps={{
          htmlInput: { "aria-label": "Search movies" },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {draft && (
                  <IconButton
                    size="small"
                    aria-label="Clear search"
                    onClick={onClear}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                )}
                <IconButton
                  type="submit"
                  size="small"
                  aria-label="Submit search"
                >
                  <ArrowForward fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        className="[&_.MuiOutlinedInput-root]:rounded-[128px] [&_.MuiOutlinedInput-root]:bg-canvas"
      />
    </Box>
  );
}
