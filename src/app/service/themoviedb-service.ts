import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable, Subject} from 'rxjs';
import {ApplicationConfigService} from "../config/application-config.service";
import {IGenres} from "../model/genre.model";
import {IPage} from "../model/page.model";
import {IMovie, IMovieDetail} from "../model/movies.model";
import {SearchModel} from "../model/search.model";
import {DiscoverType} from "../enums/discover.type.model";
import {DateService} from "../core/util/date-util.service";
import {ICast} from "../model/cast.model";
import {IPersonModel} from "../model/person.model";
import {IVideoModel} from "src/app/model/video.model";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({providedIn: 'root'})
export class ThemoviedbService {
  public searchParams = new SearchModel();
  private moviesLst = new Subject<IMovie[]>();
  private resetSearchParams = new Subject<SearchModel>();
  private pageResult!: IPage;
  private resourceUrl = this.applicationConfigService.getEndpointApi('');

  constructor(private http: HttpClient,
              private applicationConfigService: ApplicationConfigService,
              private spinner: NgxSpinnerService,
              private dateService: DateService) {
  }

  sendSearchParam(): void {
    this.resetSearchParams.next(this.searchParams)
  }

  getSearchParamData(): Observable<SearchModel> {
    return this.resetSearchParams.asObservable();
  }

  sendMoviesData(data: any): void {
    this.moviesLst.next(data);
  }

  getMoviesData(): Observable<IMovie[]> {
    return this.moviesLst.asObservable();
  }

  getMovieList(): Observable<IPage> {
    let url = '/discover/movie/';
    let options: HttpParams = new HttpParams();
    options = options.set('include_adult', false);
    options = options.set('language', 'en-US');
    options = options.set('page', this.searchParams.getNextPage());

    if (this.searchParams.search != "") {
      options = options.append('query', this.searchParams.search);
      url = '/search/movie';
    } else {
      options = options.set('include_video', false);
      if (this.searchParams.genres.length > 0) {
        options = options.set('with_genres', this.searchParams.genres.map(item => item.id.toString()).join(','));
      }
      if (DiscoverType.UPCOMING == this.searchParams.type) {
        options = options.set('sort_by', 'popularity.desc');
        options = options.set('with_release_type', '2|3');
        options = options.set('release_date.gte', this.dateService.getCurrentDateFormatted());
      } else if (DiscoverType.TOP_RATED == this.searchParams.type) {
        options = options.set('sort_by', 'vote_average.desc');
        options = options.set('without_genres', '99,10755');
        options = options.set('vote_count.gte', '200');
      } else if (DiscoverType.POPULAR == this.searchParams.type) {
        options = options.set('sort_by', 'popularity.desc');
      }
    }

    return this.http.get<IPage>(`${this.resourceUrl}${url}`, {params: options, observe: 'response'}).pipe(
      map(response => {
        if (response.body !== null) {
          this.pageResult = response.body;
          this.searchParams.page = response.body.page;
          if (response.body.page >= response.body.total_pages) {
            this.searchParams.page = response.body.total_pages;
            this.searchParams.isLastPage = true;
          }else {
            this.searchParams.isLastPage = false;
          }
          return response.body
        } else {
          this.spinner.hide();
          throw new Error('Response body is null.');
        }
      })
    );
  }

  getTopMoviesNowPlaying(): Observable<IMovie[]> {
    return this.http.get<{ results: IMovie[] }>(`${this.resourceUrl}/movie/now_playing`, {observe: 'response'}).pipe(
      map(response => response.body?.results ?? [])
    );
  }

  getAllGenresOfMovie(): Observable<IGenres[]> {
    return this.http.get<{ genres: IGenres[] }>(`${this.resourceUrl}/genre/movie/list`, {observe: 'response'}).pipe(
      map(response => response.body?.genres ?? [])
    );
  }

  getMovieDetail(movie_id: string): Observable<IMovieDetail> {
    return this.http.get<IMovieDetail>(`${this.resourceUrl}/movie/${movie_id}`, {observe: 'response'}).pipe(
      map(response => {
        if (response.body !== null) {
          return response.body;
        } else {
          throw new Error('Response body is null.');
        }
      })
    );
  }

  getMovieCredits(movie_id: string): Observable<ICast[]> {
    return this.http.get<{
      cast: ICast[]
    }>(`${this.resourceUrl}/movie/${movie_id}/credits`, {observe: 'response'}).pipe(
      map(response => {
        if (response.body !== null) {
          return response.body.cast;
        } else {
          throw new Error('Response body is null.');
        }
      })
    );
  }

  getMovieRecommendation(movie_id: string, page: number): Observable<IPage> {
    let options: HttpParams = new HttpParams();
    options.append('language', 'en-US');
    options.append('page', page);

    return this.http.get<IPage>(`${this.resourceUrl}/movie/${movie_id}/recommendations`, {
      params: options,
      observe: 'response'
    }).pipe(
      map(response => {
        if (response.body !== null) {
          return response.body;
        } else {
          throw new Error('Response body is null.');
        }
      })
    );
  }

  getActorInfo(person_id: string): Observable<IPersonModel> {
    let options: HttpParams = new HttpParams();
    options.append('language', 'en-US');
    return this.http.get<IPersonModel>(`${this.resourceUrl}/person/${person_id}`, {
      params: options,
      observe: 'response'
    }).pipe(
      map(response => {
        if (response.body !== null) {
          return response.body;
        } else {
          throw new Error('Response body is null.');
        }
      })
    );
  }

  getPersonMoviesLst(person_id: string): Observable<IMovie[]> {
    let options: HttpParams = new HttpParams();
    options = options.append('language', 'en-US');
    return this.http.get<{ cast: IMovie[] }>(`${this.resourceUrl}/person/${person_id}/movie_credits`, {
      params: options,
      observe: 'response'
    }).pipe(
      map(response => {
        if (response.body !== null) {
          return response.body.cast;
        } else {
          throw new Error('Response body is null.');
        }
      })
    );
  }

  getTrailerMovieById(movie_id: string): Observable<IVideoModel | undefined> {
    let options: HttpParams = new HttpParams();
    options = options.append('language', 'en-US');
    return this.http.get<{ results: IVideoModel[] }>(`${this.resourceUrl}/movie/${movie_id}/videos`, {
      params: options,
      observe: 'response'
    }).pipe(
      map(response => {
        if (response.body !== null) {
          const trailerMovie = response.body.results
            .find(item => item.key && item.type && 'Trailer' == item.type && item.site == 'YouTube')
          return trailerMovie;
        } else {
          throw new Error('Response body is null.');
        }
      })
    );
  }
}
