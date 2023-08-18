import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ThemoviedbService} from "../../service/themoviedb-service";
import {IPage} from "../../model/page-model";
import {IMovie} from "../../model/movies.model";
import {ApplicationConfigService} from "../../config/application-config.service";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {first} from "rxjs";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

@Component({
  selector: 'app-home',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!:   CdkVirtualScrollViewport;
  pageInfo!: IPage;
  moviesLst: IMovie[];
  imageUrl = ''
  loading = false;

  constructor(private themoviedbService: ThemoviedbService,private applicationConfigService: ApplicationConfigService,private config: NgbRatingConfig) {
    this.moviesLst = []
    this.imageUrl = this.applicationConfigService.getEndpointImage('/w500');
    this.config.max = 10;
    this.config.readonly = true;
  }

  ngOnInit(): void {
    this.loadMoreData();
  }

  loadMoreData():void {
    if(!this.loading){
      this.loading = true;
      this.themoviedbService.getMovieList(this.pageInfo).pipe(
        first()
      ).subscribe({
        next: value => {
          this.pageInfo = value;
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
