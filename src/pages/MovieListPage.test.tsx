import { intersect } from '../test/intersectionObserver';
import type { ComponentProps } from "react";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import MovieListPage from "./MovieListPage";
import { movieFixture, secondMovieFixture } from "../test/movieFixtures";
import { renderWithTheme } from "../test/renderWithTheme";

// Keep page tests independent of developer credentials and demo-mode selection.
vi.mock("../api", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../api")>()),
  isDemo: false,
}));

type Props = ComponentProps<typeof MovieListPage>;

function setup(overrides: Partial<Props> = {}) {
  const props: Props = {
    category: "now_playing",
    view: "discover",
    query: "",
    movies: [movieFixture, secondMovieFixture],
    saved: [],
    total: 40,
    page: 1,
    totalPages: 2,
    loading: false,
    error: "",
    isSaved: () => false,
    onCategoryChange: vi.fn(),
    onOpen: vi.fn(),
    onToggle: vi.fn(),
    onRetry: vi.fn(),
    onLoadMore: vi.fn(),
    ...overrides,
  };
  const result = renderWithTheme(<MovieListPage {...props} />);
  return { ...result, props, user: userEvent.setup() };
}

describe("MovieListPage", () => {
  it("renders movie titles, release years, posters, and detail links", () => {
    setup();
    const card = screen
      .getByRole("link", { name: `View ${movieFixture.title}` })
      .closest("article")!;
    expect(
      within(card).getByRole("link", { name: movieFixture.title }),
    ).toHaveAttribute("href", "#/movie/101");
    expect(
      within(card).getByRole("img", { name: `${movieFixture.title} poster` }),
    ).toHaveAttribute("src", expect.stringContaining("/lighthouse.jpg"));
    expect(within(card).getByText("2024")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: `View ${secondMovieFixture.title}` }),
    ).toHaveAttribute("href", "#/movie/202");
    expect(screen.getByText("40 movies")).toBeInTheDocument();
  });

  it("opens the featured movie and passes movie data to the watchlist callback", async () => {
    const { user, props } = setup();
    await user.click(screen.getByRole("button", { name: "Explore movie" }));
    expect(props.onOpen).toHaveBeenCalledExactlyOnceWith(movieFixture.id);
    await user.click(
      screen.getByRole("button", { name: `Save ${secondMovieFixture.title}` }),
    );
    expect(props.onToggle).toHaveBeenCalledExactlyOnceWith(secondMovieFixture);
  });

  it("indicates the selected category and requests a category change", async () => {
    const { user, props } = setup({ category: "popular" });
    const categories = screen.getByRole("group", { name: "Movie categories" });
    expect(
      within(categories).getByRole("button", { name: "Popular" }),
    ).toHaveAttribute("aria-pressed", "true");
    await user.click(
      within(categories).getByRole("button", { name: "Top rated" }),
    );
    expect(props.onCategoryChange).toHaveBeenCalledExactlyOnceWith("top_rated");
  });

  it("renders search results without the spotlight or category controls", () => {
    setup({ query: "Lighthouse", movies: [movieFixture], total: 1 });
    expect(
      screen.getByRole("heading", { name: "Results for “Lighthouse”" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: `View ${movieFixture.title}` }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Explore movie" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("group", { name: "Movie categories" }),
    ).not.toBeInTheDocument();
  });

  it("shows skeleton loading before the first page arrives", () => {
    setup({ movies: [], loading: true, totalPages: 0 });
    expect(
      screen.getByRole("status", { name: "Loading movies" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: `View ${movieFixture.title}` }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("No movies found")).not.toBeInTheDocument();
  });

  it("shows an empty state when there are no matching movies", () => {
    setup({ movies: [], total: 0, totalPages: 0, query: "Missing title" });
    expect(
      screen.getByRole("heading", { name: "No movies found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Try a different title or explore a category."),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("status", { name: "Movie pagination" }),
    ).not.toBeInTheDocument();
  });

  it("displays an error and calls retry without showing the grid or pagination", async () => {
    const { user, props } = setup({ error: "TMDB is unavailable" });
    expect(screen.getByRole("alert")).toHaveTextContent("TMDB is unavailable");
    expect(
      screen.queryByRole("link", { name: `View ${movieFixture.title}` }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("status", { name: "Movie pagination" }),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(props.onRetry).toHaveBeenCalledOnce();
  });

  it("automatically requests the next page only once when the sentinel becomes visible", () => {
    const { props } = setup();
    const sentinel = screen.getByRole("status", { name: "Movie pagination" });
    intersect(sentinel, false);
    expect(props.onLoadMore).not.toHaveBeenCalled();
    intersect(sentinel);
    intersect(sentinel);
    expect(props.onLoadMore).toHaveBeenCalledOnce();
  });

  it("keeps existing cards while loading and stops observing at the last page", () => {
    const { props, rerender } = setup({ page: 2, totalPages: 3, loading: true });
    const sentinel = screen.getByRole("status", { name: "Movie pagination" });
    expect(sentinel).toHaveTextContent("Loading more movies…");
    intersect(sentinel);
    expect(props.onLoadMore).not.toHaveBeenCalled();
    expect(screen.getByRole("link", { name: `View ${movieFixture.title}` })).toBeInTheDocument();
    rerender(<MovieListPage {...props} loading={false} />);
    intersect(sentinel);
    expect(props.onLoadMore).toHaveBeenCalledOnce();
    rerender(<MovieListPage {...props} page={3} loading={false} />);
    expect(screen.queryByRole("status", { name: "Movie pagination" })).not.toBeInTheDocument();
    expect(screen.getByText("You’ve reached the end of the results.")).toBeInTheDocument();
    intersect(sentinel);
    expect(props.onLoadMore).toHaveBeenCalledOnce();
  });

  it("retains loaded movies after a pagination error and allows retry", async () => {
    const { user, props } = setup({ page: 2, totalPages: 3, error: "Connection unavailable" });
    expect(screen.getByRole("link", { name: `View ${movieFixture.title}` })).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Couldn’t load more movies.");
    expect(screen.queryByRole("status", { name: "Movie pagination" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(props.onRetry).toHaveBeenCalledOnce();
  });

  it("continues after another page arrives and resets the guard for a new category or query", () => {
    const { props, rerender } = setup({ totalPages: 4 });
    intersect(screen.getByRole("status", { name: "Movie pagination" }));
    rerender(<MovieListPage {...props} page={2} />);
    intersect(screen.getByRole("status", { name: "Movie pagination" }));
    expect(props.onLoadMore).toHaveBeenCalledTimes(2);
    rerender(<MovieListPage {...props} category="popular" />);
    intersect(screen.getByRole("status", { name: "Movie pagination" }));
    expect(props.onLoadMore).toHaveBeenCalledTimes(3);
    rerender(<MovieListPage {...props} category="popular" query="Lighthouse" />);
    intersect(screen.getByRole("status", { name: "Movie pagination" }));
    expect(props.onLoadMore).toHaveBeenCalledTimes(4);
  });

  it("disconnects the observer on unmount", () => {
    const { props, unmount } = setup();
    const sentinel = screen.getByRole("status", { name: "Movie pagination" });
    unmount();
    intersect(sentinel);
    expect(props.onLoadMore).not.toHaveBeenCalled();
  });

  it("shows only saved movies in the watchlist even when discovery is loading or failed", async () => {
    const { user, props } = setup({
      view: "watchlist",
      saved: [secondMovieFixture],
      loading: true,
      error: "Discovery request failed",
      isSaved: () => true,
    });
    expect(
      screen.getByRole("heading", { name: "Your watchlist" }),
    ).toBeInTheDocument();
    expect(screen.getByText("1 movies")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: `View ${movieFixture.title}` }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Explore movie" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("group", { name: "Movie categories" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("status", { name: "Movie pagination" }),
    ).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", {
        name: `Remove ${secondMovieFixture.title}`,
      }),
    );
    expect(props.onToggle).toHaveBeenCalledExactlyOnceWith(secondMovieFixture);
  });

  it("shows a helpful empty watchlist state", () => {
    setup({ view: "watchlist" });
    expect(
      screen.getByRole("heading", { name: "Make room for great stories" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Tap the bookmark icon on a movie to save it here."),
    ).toBeInTheDocument();
  });
});
