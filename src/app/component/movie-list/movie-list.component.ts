import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ThemoviedbService} from "../../service/themoviedb-service";
import {IPage} from "../../model/page.model";
import {IMovie} from "../../model/movies.model";
import {ApplicationConfigService} from "../../config/application-config.service";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {first} from "rxjs";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {ActivatedRoute} from "@angular/router";
import {SearchModel} from "../../model/search.model";
import {IGenres} from "../../model/genre.model";

@Component({
  selector: 'app-home',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  pageInfo!: IPage;
  moviesLst: IMovie[];
  imageUrl = ''
  loading = false;
  typeLoad = '';
  searchModel: SearchModel = new SearchModel(0, '');

  constructor(private themoviedbService: ThemoviedbService, private applicationConfigService: ApplicationConfigService, private config: NgbRatingConfig,
              private activeRoute: ActivatedRoute) {
    this.moviesLst = []
    this.imageUrl = this.applicationConfigService.getEndpointImage('/w500');
    this.config.max = 5;
    this.config.readonly = true;
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.searchModel = new SearchModel(0, params['type']);
      this.moviesLst = [];
      this.loadMoreData();
    });
    this.themoviedbService.getData().subscribe(value => {
      if (value) {
        this.searchModel.genres = value as IGenres[];
      }
    })
  }

  loadMoreData(): void {
    if (!this.loading) {
      this.loading = true;
      this.themoviedbService.getMovieList(this.searchModel).pipe(
        first()
      ).subscribe({
        next: value => {
          this.pageInfo = value;
          this.searchModel.page = this.pageInfo.page;
          this.moviesLst.push(...this.pageInfo.results as IMovie[]);
          this.loading = false;
        },
        error: error => {
          this.loading = false;
        }
      })
    }
  }
}
