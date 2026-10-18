import type { Movie } from '../types'

export const movieFixture: Movie = {
  id: 101,
  title: 'The Last Lighthouse',
  release_date: '2024-05-12',
  poster_path: '/lighthouse.jpg',
  backdrop_path: '/lighthouse-backdrop.jpg',
  overview: 'A lighthouse keeper discovers a message from a missing ship.',
  vote_average: 8.3,
  runtime: 122,
  tagline: 'Every light tells a story.',
  genres: [{ id: 18, name: 'Drama' }],
  credits: {
    cast: [{ id: 1, name: 'Alex Morgan', character: 'The Keeper', profile_path: null }],
    crew: [{ name: 'Jordan Lee', job: 'Director' }],
  },
}

export const secondMovieFixture: Movie = {
  ...movieFixture,
  id: 202,
  title: 'Beyond the Horizon',
  release_date: '2023-10-01',
}
