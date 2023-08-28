import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {finalize, map, Observable, Subject} from 'rxjs';
import {ApplicationConfigService} from "@config/application-config.service";
import {IGenresModel} from "@model/genre.model";
import {IPageModel} from "@model/page.model";
import {IMovieModel, IMovieDetailModel} from "@model/movies.model";
import {SearchModel} from "@model/search.model";
import {DiscoverTypeEnums} from "@enums/discover.type.enums";
import {DateService} from "@core/util/date-util.service";
import {ICastModel} from "@model/cast.model";
import {IPersonModel} from "@model/person.model";
import {IVideoModel} from "@app/model/video.model";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({providedIn: 'root'})
export class ThemoviedbService {
  public searchParams = new SearchModel();
  private moviesLst = new Subject<IMovieModel[]>();
  private resetSearchParams = new Subject<SearchModel>();
  private pageResult!: IPageModel;
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

  getMoviesData(): Observable<IMovieModel[]> {
    return this.moviesLst.asObservable();
  }

  getMovieList(): Observable<IPageModel> {
    let url = '/discover/movie';
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
      if (DiscoverTypeEnums.UPCOMING == this.searchParams.type) {
        options = options.set('sort_by', 'popularity.desc');
        options = options.set('with_release_type', '2|3');
        // You can use the DatePipe from @angular/common. However, since you're learning Angular, it's a good idea to create a separate service for practice.
        options = options.set('release_date.gte', this.dateService.getCurrentDateFormatted());
      } else if (DiscoverTypeEnums.TOP_RATED == this.searchParams.type) {
        options = options.set('sort_by', 'vote_average.desc');
        options = options.set('without_genres', '99,10755');
        options = options.set('vote_count.gte', '200');
      } else if (DiscoverTypeEnums.POPULAR == this.searchParams.type) {
        options = options.set('sort_by', 'popularity.desc');
      }
    }

    return this.http.get<IPageModel>(`${this.resourceUrl}${url}`, {params: options, observe: 'response'}).pipe(
      map(response => {
        if (response.body !== null) {
          this.pageResult = response.body;
          this.searchParams.page = response.body.page;
          if (response.body.page >= response.body.total_pages) {
            this.searchParams.page = response.body.total_pages;
            this.searchParams.isLastPage = true;
          } else {
            this.searchParams.isLastPage = false;
          }
          return response.body
        } else {
          throw new Error('Response body is null.');
        }
      })
      , finalize(() => {
        this.spinner.hide();
      })
    );
  }

  getTopMoviesNowPlaying(): Observable<IMovieModel[]> {
    return this.http.get<{ results: IMovieModel[] }>(`${this.resourceUrl}/movie/now_playing`, {observe: 'response'}).pipe(
      map(response => response.body?.results ?? [])
    );
  }

  getAllGenresOfMovie(): Observable<IGenresModel[]> {
    return this.http.get<{ genres: IGenresModel[] }>(`${this.resourceUrl}/genre/movie/list`, {observe: 'response'}).pipe(
      map(response => response.body?.genres ?? [])
    );
  }

  getMovieDetail(movie_id: string): Observable<IMovieDetailModel | undefined> {
    return this.http.get<IMovieDetailModel>(`${this.resourceUrl}/movie/${movie_id}`, {observe: 'response'}).pipe(
      map(response => response.body ?? undefined)
    );
  }

  getMovieCredits(movie_id: string): Observable<ICastModel[]> {
    return this.http.get<{
      cast: ICastModel[]
    }>(`${this.resourceUrl}/movie/${movie_id}/credits`, {observe: 'response'}).pipe(
      map(response => response.body?.cast ?? [])
    );
  }

  getMovieRecommendation(movie_id: string, page: number): Observable<IPageModel | undefined> {
    let options: HttpParams = new HttpParams();
    options.append('language', 'en-US');
    options.append('page', page);

    return this.http.get<IPageModel>(`${this.resourceUrl}/movie/${movie_id}/recommendations`, {
      params: options,
      observe: 'response'
    }).pipe(
      map(response => response.body ?? undefined)
    );
  }

  getActorInfo(person_id: string): Observable<IPersonModel | undefined> {
    let options: HttpParams = new HttpParams();
    options.append('language', 'en-US');
    return this.http.get<IPersonModel>(`${this.resourceUrl}/person/${person_id}`, {
      params: options,
      observe: 'response'
    }).pipe(
      map(response => response.body ?? undefined)
    );
  }

  getPersonMoviesLst(person_id: string): Observable<IMovieModel[]> {
    let options: HttpParams = new HttpParams();
    options = options.append('language', 'en-US');
    return this.http.get<{ cast: IMovieModel[] }>(`${this.resourceUrl}/person/${person_id}/movie_credits`, {
      params: options,
      observe: 'response'
    }).pipe(
      map(response => response.body?.cast ?? [])
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
          return undefined;
        }
      })
    );
  }

  getPopularPeopleLst(): Observable<IPersonModel[] | undefined> {
    let options: HttpParams = new HttpParams();
    options = options.append('language', 'en-US');
    return this.http.get<{ results: IPersonModel[] }>(`${this.resourceUrl}/person/popular`, {
      params: options,
      observe: 'response'
    }).pipe(
      map(response => response.body?.results ?? undefined)
    );
  }
}
