import {IGenresModel} from "./genre.model";

export interface IMovieModel {
  adult: boolean;
  backdrop_path?: string | null;
  genre_ids: string[] | null;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: string;
  vote_average: number;
  vote_count: number;
}

export interface IMovieDetailModel {
  adult: boolean | null;
  backdrop_path?: string | null;
  belongs_to_collection: Object[] | null;
  budget: number | null;
  genres: IGenresModel[] | null ;
  homepage: string | null;
  id: number | null;
  imdb_id: string | null;
  original_language: string | null;
  original_title: string | null;
  overview: string | null;
  popularity: number | null;
  poster_path: string | null;
  production_companies: Object[] | null;
  production_countries: Object[] | null;
  release_date: string | null;
  revenue: number | null;
  runtime: number | null;
  spoken_languages: Object[] | null;
  status: string | null;
  tagline: string | null;
  title: string | null;
  video: string | null;
  vote_average: number;
  vote_count: number;
}
