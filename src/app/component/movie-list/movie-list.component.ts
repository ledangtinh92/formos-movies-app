import {Component, OnInit, ViewChild} from '@angular/core';
import {ThemoviedbService} from "../../service/themoviedb-service";
import {IMovie} from "../../model/movies.model";
import {ApplicationConfigService} from "../../config/application-config.service";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {PosterSizesEnums} from "../../enums/image.quality.enums";
import {DiscoverType} from "../../enums/discover.type.enums";

@Component({
  selector: 'app-home',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  moviesLst: IMovie[];
  imageUrl = ''
  typeLoad = '';
  genres = ''
  searchName='';
  isLastPage: boolean = false;

  constructor(private themoviedbService: ThemoviedbService,
              private applicationConfigService: ApplicationConfigService,
              private config: NgbRatingConfig,
              private spinner: NgxSpinnerService,
              private activeRoute: ActivatedRoute,
              private router: Router,) {
    this.moviesLst = []
    this.imageUrl = this.applicationConfigService.getEndpointImage(PosterSizesEnums.W500);
    this.config.max = 5;
    this.config.readonly = true;
    this.typeLoad = this.themoviedbService.searchParams.type;
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.themoviedbService.getMovieList().subscribe({
        next: result => {
          if (result) {
            this.themoviedbService.sendMoviesData(result.results)
          }
        },
        error:():void => {
          this.router.navigate(['404']);
        }
      });
    });
    this.activeRoute.params.subscribe(params => {
      const typeSearch = params['type'];
      switch (typeSearch) {
        case DiscoverType.POPULAR:
        case DiscoverType.UPCOMING:
        case DiscoverType.TOP_RATED:
        case DiscoverType.GENRES:
        case DiscoverType.SEARCH:
          this.themoviedbService.getMovieList().subscribe({
            next: result => {
              if (result) {
                this.themoviedbService.sendMoviesData(result.results)
              }
            },
            error:():void => {
              this.router.navigate(['404']);
            }
          });
          break;
        default:
          this.router.navigate(['404']);
          break;
      }
    });
    this.themoviedbService.getMoviesData().subscribe(data => {
      if(data) {
        this.moviesLst = data;
        this.isLastPage = this.themoviedbService.searchParams.isLastPage;
        this.typeLoad = this.themoviedbService.searchParams.type;
        this.genres = this.themoviedbService.searchParams.genres.map(item => item.name).join(',');
        this.searchName = this.themoviedbService.searchParams.search;
      }
    });
  }

  loadMoreData(): void {
    if(this.isLastPage){
      return;
    }
    this.spinner.show();
    this.themoviedbService.getMovieList().subscribe({
      next: result => {
        this.spinner.hide();
        if (result){
          if(result.page >= result.total_pages){
            this.isLastPage = true;
          }
          if (result.results && result.results.length>0) {
            this.moviesLst.push(...result.results as IMovie[]);
          }
        }
      }, error: error => {
        console.log("loadMoreData: " + error);
        this.spinner.hide();
      }
    });
  }
}
