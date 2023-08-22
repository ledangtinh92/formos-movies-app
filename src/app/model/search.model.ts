import {IGenres} from "./genre.model";

export class SearchModel {
  page: number;
  type: string;
  genres: IGenres[];
  search: string;

  constructor() {
    this.page = 0;
    this.type = '';
    this.genres = [];
    this.search = '';
  }

  getNextPage(): number {
    return this.page + 1;
  }
}
