import { Box, Link, Stack, Typography } from "@mui/material";
export default function Footer() {
  return (
    <Box
      component="footer"
      className="[border-top:1px_solid] border-outline mt-10 py-6"
    >
      <Stack className="flex-col sm:flex-row gap-4 sm:items-center flex flex-col">
        <Link href="#" underline="none" variant="h6" color="text.primary">
          frame
          <Box component="span" color="primary.main">
            .
          </Box>
        </Link>
        <Typography variant="caption" color="text.secondary">
          A whole world of cinema, at your fingertips.
        </Typography>
        <Box className="sm:[margin-left:auto] [max-width:300px]">
          <Typography variant="caption" color="primary">
            TMDB
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            className="block text-[10px]"
          >
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
