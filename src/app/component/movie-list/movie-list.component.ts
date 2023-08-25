import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemoviedbService} from "../../service/themoviedb-service";
import {IMovieModel} from "../../model/movies.model";
import {ApplicationConfigService} from "../../config/application-config.service";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {PosterSizesEnums} from "../../enums/image.quality.enums";
import {DiscoverTypeEnums} from "../../enums/discover.type.enums";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {
  protected readonly PosterSizesEnums = PosterSizesEnums;
  private unsubscribe$ = new Subject<void>();
  moviesLst: IMovieModel[] = [];
  typeLoad = '';
  genres = ''
  searchName = '';
  isLastPage: boolean = false;

  constructor(private themoviedbService: ThemoviedbService,
              private applicationConfigService: ApplicationConfigService,
              private config: NgbRatingConfig,
              private spinner: NgxSpinnerService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
    this.config.max = 5;
    this.config.readonly = true;
    this.typeLoad = this.themoviedbService.searchParams.type;
  }

  ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.themoviedbService.searchParams.page = 0;
        this.themoviedbService.getMovieList()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: result => {
              if (result) {
                this.themoviedbService.sendMoviesData(result.results)
              }
            }
          });
      });
    this.activeRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        const typeSearch = params['type'];
        switch (typeSearch) {
          case DiscoverTypeEnums.POPULAR:
          case DiscoverTypeEnums.UPCOMING:
          case DiscoverTypeEnums.TOP_RATED:
          case DiscoverTypeEnums.GENRES:
          case DiscoverTypeEnums.SEARCH:
            this.themoviedbService.searchParams.page = 0;
            this.themoviedbService.getMovieList()
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe({
                next: result => {
                  if (result) {
                    this.themoviedbService.sendMoviesData(result.results)
                  }
                }
              });
            break;
          default:
            this.router.navigate(['404']);
            break;
        }
      });
    this.themoviedbService.getMoviesData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        if (data) {
          this.moviesLst = data;
          this.isLastPage = this.themoviedbService.searchParams.isLastPage;
          this.typeLoad = this.themoviedbService.searchParams.type;
          this.genres = this.themoviedbService.searchParams.genres.map(item => item.name).join(',');
          this.searchName = this.themoviedbService.searchParams.search;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadMoreData(): void {
    if (this.isLastPage) {
      return;
    }
    this.spinner.show();
    this.themoviedbService.getMovieList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: result => {
          this.spinner.hide();
          if (result) {
            if (result.page >= result.total_pages) {
              this.isLastPage = true;
            }
            if (result.results && result.results.length > 0) {
              this.moviesLst.push(...result.results as IMovieModel[]);
            }
          }
        }
      });
  }
}
