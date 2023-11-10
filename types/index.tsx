export type Person = {
  id: number;
  profile_path: string;
  name: string;
  known_for: Movie[];
  popularity: number;
  adult: boolean;
  gender: number;
  known_for_department: string;
};

export type Movie = {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  first_air_date?: string;
  id: number;
  media_type: string;
  original_language: string;
  original_title?: string;
  overview?: string;
  poster_path: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  origin_country?: string[];
  original_name?: string;
};

export type IntersectionData = {
  person_id: number;
  intersections: Intersection[];
};
export type Intersection = {
  person_id: number;
  common: number[];
};
