import type { ComponentProps } from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MovieDetailPage from "./MovieDetailPage";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { movieFixture } from "../test/movieFixtures";
import { renderWithTheme } from "../test/renderWithTheme";

// Mock the page's data boundary; keep real detail and credits components.
vi.mock("../hooks/useMovieDetails", () => ({ useMovieDetails: vi.fn() }));
const mockDetails = vi.mocked(useMovieDetails);
const retry = vi.fn();

function setup(
  overrides: Partial<ComponentProps<typeof MovieDetailPage>> = {},
) {
  const props = {
    id: movieFixture.id,
    isSaved: false,
    onBack: vi.fn(),
    onToggle: vi.fn(),
    ...overrides,
  };
  const result = renderWithTheme(<MovieDetailPage {...props} />);
  return { ...result, props, user: userEvent.setup() };
}

beforeEach(() => {
  mockDetails.mockReturnValue({ movie: movieFixture, error: "", retry });
});

describe("MovieDetailPage", () => {
  it("requests the selected movie and renders its metadata, synopsis, director, cast, and poster", () => {
    setup();
    expect(mockDetails).toHaveBeenCalledWith(movieFixture.id);
    expect(
      screen.getByRole("heading", { name: movieFixture.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: `${movieFixture.title} poster` }),
    ).toHaveAttribute("src", expect.stringContaining("/lighthouse.jpg"));
    expect(screen.getByText(movieFixture.overview)).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("122 min")).toBeInTheDocument();
    expect(screen.getByText("8.3")).toBeInTheDocument();
    expect(screen.getByText("Drama")).toBeInTheDocument();
    expect(screen.getByText("Every light tells a story.")).toBeInTheDocument();
    expect(screen.getByText("Jordan Lee")).toBeInTheDocument();
    expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
    expect(screen.getByText("The Keeper")).toBeInTheDocument();
  });

  it("shows loading feedback until details are available", () => {
    mockDetails.mockReturnValue({ movie: null, error: "", retry });
    setup();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading movie details…",
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: movieFixture.title }),
    ).not.toBeInTheDocument();
  });

  it("displays fetch errors and invokes retry", async () => {
    mockDetails.mockReturnValue({
      movie: null,
      error: "Movie not found",
      retry,
    });
    const { user } = setup();
    expect(screen.getByRole("alert")).toHaveTextContent("Movie not found");
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
  });

  it("lets users return to the list while loading, after errors, and after success", async () => {
    mockDetails.mockReturnValue({ movie: null, error: "", retry });
    const { user, props, rerender } = setup();
    await user.click(screen.getByRole("button", { name: "Back to movies" }));
    mockDetails.mockReturnValue({
      movie: null,
      error: "Unable to load movie",
      retry,
    });
    rerender(<MovieDetailPage {...props} />);
    await user.click(screen.getByRole("button", { name: "Back to movies" }));
    mockDetails.mockReturnValue({ movie: movieFixture, error: "", retry });
    rerender(<MovieDetailPage {...props} />);
    await user.click(screen.getByRole("button", { name: "Back to movies" }));
    expect(props.onBack).toHaveBeenCalledTimes(3);
  });

  it("passes the movie to the watchlist callback and reflects its saved state", async () => {
    const { user, props, rerender } = setup();
    await user.click(screen.getByRole("button", { name: "Add to watchlist" }));
    expect(props.onToggle).toHaveBeenCalledExactlyOnceWith(movieFixture);
    rerender(<MovieDetailPage {...props} isSaved />);
    expect(
      screen.queryByRole("button", { name: "Add to watchlist" }),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "In your watchlist" }));
    expect(props.onToggle).toHaveBeenCalledTimes(2);
    expect(props.onToggle).toHaveBeenLastCalledWith(movieFixture);
  });

  it("renders useful fallbacks for missing movie information", () => {
    mockDetails.mockReturnValue({
      movie: {
        ...movieFixture,
        overview: "",
        release_date: "",
        poster_path: null,
        runtime: undefined,
        tagline: undefined,
        genres: undefined,
        credits: undefined,
      },
      error: "",
      retry,
    });
    setup();
    expect(
      screen.getByRole("heading", { name: movieFixture.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A synopsis is not available yet."),
    ).toBeInTheDocument();
    expect(screen.getByText("TBA")).toBeInTheDocument();
    expect(screen.getByText("Not available")).toBeInTheDocument();
    expect(
      screen.getByText("Cast information is not available in this collection."),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: `${movieFixture.title} poster` }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/min$/)).not.toBeInTheDocument();
  });
});
