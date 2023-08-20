import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ThemoviedbService} from "../../service/themoviedb-service";
import {IMovie, IMovieDetail} from "../../model/movies.model";
import {ApplicationConfigService} from "../../config/application-config.service";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {first} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ICast} from "../../model/cast.model";
import {PosterSizesEnums, ProfileSizesEnums} from "../../enums/image.model";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  moviesDetail!: IMovieDetail;
  imageUrl = '';
  profileUrl = '';
  recommentUrl = '';
  loading = false;
  listCast: ICast[] = [];
  recommendationLst: IMovie[] = [];

  constructor(private themoviedbService: ThemoviedbService,private applicationConfigService: ApplicationConfigService,private config: NgbRatingConfig,private activeRoute: ActivatedRoute) {
    this.imageUrl = this.applicationConfigService.getEndpointImage(PosterSizesEnums.W342);
    this.recommentUrl = this.applicationConfigService.getEndpointImage(PosterSizesEnums.W342);
    this.profileUrl = this.applicationConfigService.getEndpointImage(ProfileSizesEnums.W45);
    this.config.readonly =true;
    this.config.max = 5;
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.loadDetailMovie(params['id']);
      this.themoviedbService.getMovieCredits(params['id']).subscribe(value => {
        this.listCast = value;
      });
      this.themoviedbService.getMovieRecommendation(params['id'], 1).subscribe(value => {
        if(value){
          this.recommendationLst = value.results as IMovie[];
        }
      });
    });
  }

  loadDetailMovie(movie_id: string):void {
    if(!this.loading){
      this.loading = true;
      this.themoviedbService.getMovieDetail(movie_id).pipe(
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
