import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ApplicationConfigService} from "../config/application-config.service";
import {IGenres} from "../model/genre.model";
import {IPage} from "../model/page-model";
import {IMovieDetail} from "../model/movies.model";

@Injectable({ providedIn: 'root' })
export class ThemoviedbService {
  private resourceUrl = this.applicationConfigService.getEndpointApi('');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getAllGenresOfMovie():Observable<IGenres[]> {
    return this.http.get<{ genres: IGenres[] }>(`${this.resourceUrl}/genre/movie/list`, { observe: 'response' }).pipe(
      map(response => response.body?.genres ?? [])
    );
  }

  getMovieList(ipageInfo: IPage):Observable<IPage>{
    let page = 1;
    if(ipageInfo){
      page = ipageInfo.page + 1;
    }

    let options: HttpParams = new HttpParams();
    options.set('language', 'en-US');
    options.set('include_adult', true);
    options.set('page', page);

    return this.http.get<IPage>(`${this.resourceUrl}/movie/popular?page=${page}&include_adult=false`, {  params: options,observe: 'response' }).pipe(
      map(response => {
        if (response.body !== null) {
          return response.body;
        } else {
          throw new Error('Response body is null.');
        }
      })
    );
  }

  searchMovieByName(movieName: string, page: number):Observable<IPage>{
    let options: HttpParams = new HttpParams();
    options.append('language', 'en-US');
    options.append('include_adult', true);
    options.append('page', page);
    options.append('query', movieName);

    return this.http.get<IPage>(`${this.resourceUrl}/search/movie`, { params: options, observe: 'response' }).pipe(
      map(response => {
        if (response.body !== null) {
          return response.body;
        } else {
          throw new Error('Response body is null.');
        }
      })
    );
  }

  getMovieDetail():Observable<IMovieDetail> {
    const movie_id = 615656;
    return this.http.get<IMovieDetail>(`${this.resourceUrl}/movie/${movie_id}`, {observe: 'response' }).pipe(
      map(response => {
        if (response.body !== null) {
          return response.body;
        } else {
          throw new Error('Response body is null.');
        }
      })
    );
  }

  getMovieCredits(){

  }
}
