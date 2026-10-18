import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
interface LoadMoreButtonProps {
  loading: boolean;
  onClick: () => void;
}
export default function LoadMoreButton({
  loading,
  onClick,
}: LoadMoreButtonProps) {
  return (
    <Box className="text-center mt-8">
      <Button
        variant="outlined"
        disabled={loading}
        onClick={onClick}
        endIcon={
          loading ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            <ExpandMore />
          )
        }
      >
        {loading ? "Loading…" : "Discover more movies"}
      </Button>
      <Typography
        variant="caption"
        color="text.secondary"
        className="block mt-3"
      >
        There’s always another great story.
      </Typography>
    </Box>
  );
}
