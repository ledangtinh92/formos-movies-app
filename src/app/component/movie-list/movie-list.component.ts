import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ThemoviedbService} from "@app/service/themoviedb-service";
import {IMovieModel} from "@app/model/movies.model";
import {ApplicationConfigService} from "@app/config/application-config.service";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {PosterSizesEnums} from "@app/enums/image.quality.enums";
import {DiscoverTypeEnums} from "@app/enums/discover.type.enums";
import {merge, startWith, Subject} from "rxjs";
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
  isFirstLoadMoreData: boolean=false;

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
    merge(this.activeRoute.queryParams, this.activeRoute.params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
          const typeSearch = params['type'];
          if (typeSearch) {
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
          } else {
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
          }
        }
      );

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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if(this.isFirstLoadMoreData){
      const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      const max = document.documentElement.scrollHeight;
      if (pos == max) {
        this.loadMoreData();
      }
    }
  }

  loadMoreData(): void {
    if (this.isLastPage) {
      return;
    }
    this.spinner.show();
    this.isFirstLoadMoreData = true;
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
