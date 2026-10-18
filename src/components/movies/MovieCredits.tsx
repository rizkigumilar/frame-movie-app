import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import type { Movie } from "../../types";
import { imageUrl } from "../../api";
export default function MovieCredits({ movie }: { movie: Movie }) {
  return (
    <Box
      component="section"
      className="grid grid-cols-1 md:[grid-template-columns:1fr_3fr] gap-8 mt-10"
    >
      <Box>
        <Typography variant="overline" color="primary">
          Behind the camera
        </Typography>
        <Typography variant="h5" component="h3" className="mb-4">
          Director
        </Typography>
        <Typography color="text.secondary">
          {movie.credits?.crew
            .filter((person) => person.job === "Director")
            .map((person) => person.name)
            .join(", ") || "Not available"}
        </Typography>
      </Box>
      <Box>
        <Typography variant="overline" color="primary">
          On screen
        </Typography>
        <Typography variant="h5" component="h3" className="mb-4">
          Main cast
        </Typography>
        <Box className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {movie.credits?.cast.slice(0, 6).map((person) => (
            <Card variant="outlined" key={person.id}>
              <CardContent>
                <Stack className="gap-3 flex flex-col">
                  <Avatar
                    src={imageUrl(person.profile_path, "w185")}
                    alt={person.name}
                    className="size-14 bg-[#809b5b] text-on-accent"
                  >
                    {person.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">{person.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {person.character}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
        {!movie.credits?.cast.length && (
          <Typography color="text.secondary">
            Cast information is not available in this collection.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
