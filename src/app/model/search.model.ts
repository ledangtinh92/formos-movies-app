import {IGenres} from "./genre.model";

export class SearchModel {
  page: number;
  type: string;
  genres: IGenres[];
  search: string;
  isLastPage: boolean;

  constructor() {
    this.page = 0;
    this.type = '';
    this.genres = [];
    this.search = '';
    this.isLastPage = false;
  }

  getNextPage(): number {
    return this.page + 1;
  }
}
