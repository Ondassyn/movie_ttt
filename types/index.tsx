export type Person = {
  id: number;
  profile_path: string;
  name: string;
  known_for: Movie[];
};

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_count: number;
};
