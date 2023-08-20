import {IGenres} from "./genre.model";

export class SearchModel {
  page: number;
  type: string;
  genres: IGenres[];


  constructor(page: number, type: string) {
    this.page = page;
    this.type = type;
    this.genres = [];
  }

  getNextPage(): number {
    return this.page + 1;
  }
}
