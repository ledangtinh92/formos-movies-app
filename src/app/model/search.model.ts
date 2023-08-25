import {IGenresModel} from "./genre.model";

export class SearchModel {
  page: number;
  type: string;
  genres: IGenresModel[];
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

  setType(type: string): void {
    this.type = type;
    this.page = 0;
    this.genres = [];
    this.search = '';
    this.isLastPage = false;
  }

  setGenres(genres: IGenresModel[]): void {
    this.type = '';
    this.page = 0;
    this.genres = genres;
    this.search = '';
    this.isLastPage = false;
  }

  setSearch(search: string): void {
    this.type = '';
    this.page = 0;
    this.genres = [];
    this.search = search;
    this.isLastPage = false;
  }

  clear():void{
    this.type = '';
    this.page = 0;
    this.genres = [];
    this.search = '';
    this.isLastPage = false;
  }
}
