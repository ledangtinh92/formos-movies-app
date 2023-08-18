import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ThemoviedbService} from "../../service/themoviedb-service";
import {IMovieDetail} from "../../model/movies.model";
import {ApplicationConfigService} from "../../config/application-config.service";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {first} from "rxjs";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  moviesDetail!: IMovieDetail;
  imageUrl = ''
  loading = false;

  constructor(private themoviedbService: ThemoviedbService,private applicationConfigService: ApplicationConfigService,private config: NgbRatingConfig) {
    this.imageUrl = this.applicationConfigService.getEndpointImage('/w500');
  }

  ngOnInit(): void {
    this.loadDetailMovie();
  }

  loadDetailMovie():void {
    if(!this.loading){
      this.loading = true;
      this.themoviedbService.getMovieDetail().pipe(
        first()
      ).subscribe({
        next: value => {
          this.moviesDetail = value;
          this.loading = false;
        },
        error: error => {
          this.loading = false;
        }
      })
    }
  }
}
