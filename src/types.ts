export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  genre_ids?: number[];
  runtime?: number;
  genres?: { id: number; name: string }[];
  tagline?: string;
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
    crew: { name: string; job: string }[];
  };
}
export type Category = "now_playing" | "popular" | "top_rated" | "upcoming";
export interface MoviePage {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}
export type View = "discover" | "watchlist";
