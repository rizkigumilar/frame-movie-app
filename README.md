# Frame — Movie Discovery

A responsive movie discovery application built with React and TypeScript. Browse films from [The Movie Database (TMDB)](https://www.themoviedb.org/), search by title, explore movie details, and save films to a personal watchlist.

Material UI provides the interface components and icons. Tailwind CSS handles custom styling, spacing, and responsive layouts.

## Features

- **Movie discovery:** browse Now Playing, Popular, Top Rated, and Upcoming categories.
- **Movie cards:** view posters, titles, release years, and ratings, with links to movie details.
- **Title search:** submit a title to search TMDB. Search results replace the category listing; clear the search to return to browsing.
- **Movie details:** view the synopsis, genres, release year, runtime, rating, director, and main cast, with a button to return to the list.
- **Infinite scroll:** automatically load additional results near the bottom of the list without replacing already loaded movies.
- **Watchlist:** save or remove movies. The watchlist is stored in the current browser using `localStorage`.
- **Responsive interface:** mobile and desktop layouts, dark theme, loading skeletons, empty states, and retry actions.
- **Demo mode:** explore a bundled sample collection when no TMDB credential is configured.

## Tech Stack

| Purpose | Technology |
| --- | --- |
| Interface | React 19, TypeScript |
| Build tooling | Vite 8 |
| Components and icons | Material UI 9, Material Icons |
| Styling | Tailwind CSS 4, Emotion for MUI |
| Typography | Locally bundled Roboto fonts |
| Data | TMDB API v3, browser Fetch API |
| Testing | Vitest, React Testing Library, jest-dom, user-event, jsdom |
| Navigation | Hash-based movie detail routes |
| Persistence | Browser `localStorage` |

## Prerequisites

- **Node.js 24+** is recommended. Node.js **22.13+ within the 22.x release line** also satisfies the installed build and test dependencies.
- npm, included with Node.js.
- A TMDB account and API credential for live movie data.
- Internet access for live requests and TMDB-hosted images.

## Getting Started

Run these commands from the project directory:

```bash
npm ci
```

For live data, create a local environment file **if you do not already have one**:

```bash
cp .env.example .env.local
```

Configure a TMDB credential as described below, then start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually [http://localhost:5173](http://localhost:5173). Vite may choose another port if that port is occupied.

You can skip the environment file to use demo mode.

## TMDB Configuration

1. Create an account or sign in at [TMDB](https://www.themoviedb.org/).
2. Open [Settings → API](https://www.themoviedb.org/settings/api) and complete API registration.
3. Copy your **API Read Access Token** into `.env.local`:

```dotenv
VITE_TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token
```

Paste the token only, without the `Bearer` prefix. The application adds the authorization header.

Alternatively, use a v3 API key:

```dotenv
VITE_TMDB_API_KEY=your_tmdb_v3_api_key
```

Only one credential is needed. Leave the unused variable empty. Restart Vite after changing environment variables. Production builds must be rebuilt after environment changes.

See the official [TMDB getting started guide](https://developer.themoviedb.org/docs/getting-started) and [application authentication guide](https://developer.themoviedb.org/docs/authentication-application).

### Credential handling

`.env.local` is ignored by Git. Keep `.env.example` free of real credentials.

Variables prefixed with `VITE_` are included in the client bundle and are visible to browser users. This application calls TMDB directly from the browser; it does not include a backend. If a deployment requires private credentials, move authenticated requests to a backend or serverless proxy.

### Demo mode

When both credential variables are empty, the application displays a preview notice and uses bundled movie fixtures:

- Category controls operate on the sample collection rather than live release categories.
- Search filters sample titles locally.
- Pagination displays six sample movies at a time.
- Demo cast and director data is included for **Dune: Part Two**; other demo titles may show unavailable-information messages.
- Poster and backdrop images still require internet access.

An invalid configured credential produces an error; it does not automatically switch to demo mode.

## Available Commands

| Command | Description |
| --- | --- |
| `npm ci` | Install dependencies from the committed lockfile. |
| `npm run dev` | Start the Vite development server. |
| `npm test` | Run all tests once. |
| `npm run build` | Check TypeScript and create the production build in `dist/`. |
| `npm run preview` | Serve the production build locally after building. |
| `npm run lint` | Run the current ESLint configuration, which targets JavaScript/JSX files. |

The current ESLint configuration does not lint TypeScript/TSX files. TypeScript checking is included in `npm run build`.

## Testing

Run the complete test suite:

```bash
npm test
```

Run only the page tests:

```bash
npm test -- src/pages/MovieListPage.test.tsx src/pages/MovieDetailPage.test.tsx
```

Start Vitest in watch mode:

```bash
npx vitest
```

The test suite includes:

- **List page tests:** movie content and detail links, category selection, search-result presentation, loading and empty states, retry actions, pagination, and watchlist behavior.
- **Detail page tests:** movie metadata, synopsis, director and cast, loading and error states, retry and back actions, watchlist callbacks, and missing-data fallbacks.
- **Application integration tests:** title search, category changes, automatically loading additional results, persistent watchlist updates, detail navigation, and error recovery.

Tests use fixtures and mocked data boundaries, so they do not require a TMDB credential or live API access. Shared test helpers provide the MUI theme and an isolated storage implementation.

## Project Structure

```text
movie-apps/
├── public/                         # Static assets
├── src/
│   ├── components/
│   │   ├── layout/                 # Sidebar, Header, SearchBar, Footer
│   │   └── movies/                 # Cards, grid, filters, spotlight, details, credits
│   ├── constants/
│   │   └── categories.ts           # Shared movie category definitions
│   ├── hooks/
│   │   ├── useMovies.ts            # List requests, loading, errors, pagination
│   │   ├── useMovieDetails.ts      # Detail requests and retry state
│   │   ├── useMovieRoute.ts        # Hash navigation
│   │   └── useWatchlist.ts         # Local watchlist persistence
│   ├── pages/
│   │   ├── MovieListPage.tsx
│   │   ├── MovieListPage.test.tsx
│   │   ├── MovieDetailPage.tsx
│   │   └── MovieDetailPage.test.tsx
│   ├── test/                       # Integration tests, fixtures, setup, render helper
│   ├── api.ts                      # TMDB client, image URLs, demo selection
│   ├── demo.ts                     # Sample movie collection
│   ├── types.ts                    # Shared TypeScript models
│   ├── theme.ts                    # MUI palette, typography, component defaults
│   ├── index.css                   # Tailwind tokens, breakpoints, global styles
│   ├── App.tsx                     # Application state and page composition
│   └── main.tsx                    # React entry point and font imports
├── .env.example                    # Empty credential template
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.js                  # React, Tailwind, and Vitest configuration
```

## Implementation Notes

### Data and state

UI components receive typed data and callbacks through props. Custom hooks manage data fetching, navigation, and watchlist state. Requests use `AbortController` to cancel obsolete requests. Additional list pages are appended with duplicate movie IDs removed, and pagination is capped at 500 pages. An `IntersectionObserver` watches a sentinel below the grid with a 300px bottom margin. Loading and per-page guards prevent duplicate requests. Observation stops at the final page, on errors, and in the watchlist. A pagination failure retains loaded cards and provides a retry action.

Movie detail requests append `credits` to retrieve cast and crew in the same API call. Requests use `en-US`; searches exclude adult results.

| Feature | TMDB endpoint |
| --- | --- |
| Now Playing | `GET /movie/now_playing` |
| Popular | `GET /movie/popular` |
| Top Rated | `GET /movie/top_rated` |
| Upcoming | `GET /movie/upcoming` |
| Title search | `GET /search/movie?query=...` |
| Details with credits | `GET /movie/{id}?append_to_response=credits` |

API base URL: `https://api.themoviedb.org/3`. Images are loaded from `https://image.tmdb.org/t/p/`.

### Styling

Tailwind utilities control custom layout, spacing, colors, and responsive behavior. The Tailwind import uses `important` so explicit utility styles take precedence over MUI's Emotion styles. Theme tokens are defined in `src/index.css`; breakpoints match MUI at 600, 900, 1200, and 1536 pixels.

MUI supplies interactive components, typography variants, and theme defaults. Only movie background images derived from API data use inline styles.

### Navigation and storage

Movie detail URLs follow the format `/#/movie/{id}`. Category and search state are maintained in memory and reset when the page is reloaded. The watchlist persists under the `frame-watchlist` local storage key and is not synchronized between browsers or devices.

## Production Build and Hosting

```bash
npm ci
npm run build
npm run preview
```

Deploy the contents of `dist/` to a static hosting service. Configure the appropriate `VITE_TMDB_*` variable in the hosting service's build environment **before** building. The preview command is for local build verification, not a production server.

Movie navigation uses URL fragments, so detail links do not require server-side route rewrites when hosted at the site root. Hosting under a subdirectory also requires configuring Vite's `base` option.

## Troubleshooting

| Issue | What to check |
| --- | --- |
| Preview collection appears instead of live movies | Configure one credential in `.env.local`, save it, and restart Vite. For production, rebuild with the credential set. |
| Invalid credential error | Check that you used the correct token or API key variable. Do not include `Bearer` in the token value. |
| Too many requests | Wait briefly, then use the retry action. |
| Movies or images do not load | Check internet access and whether the browser can reach TMDB's API and image domains. |
| A movie has no poster, synopsis, or credits | TMDB may not provide that information; the interface shows a fallback. |
| Saved movies are missing | Watchlists belong to the current browser and origin. Clearing browser data or changing host/port can make the existing list unavailable. |
| Tests or build fail on an older Node.js version | Use a runtime satisfying the prerequisites, reinstall with `npm ci`, and retry. |

## Attribution

Movie metadata and images are provided by [The Movie Database](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.
