import {Component, OnInit} from '@angular/core';
import {ThemoviedbService} from "../../service/themoviedb-service";
import {IMovie, IMovieDetail} from "../../model/movies.model";
import {ApplicationConfigService} from "../../config/application-config.service";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {first} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ICast} from "../../model/cast.model";
import {PosterSizesEnums, ProfileSizesEnums} from "../../enums/image.quality.enums";
import {IVideoModel} from "src/app/model/video.model";
import {MatDialog} from "@angular/material/dialog";
import {YoutubeDialogComponent} from "src/app/shared/youtube-dialog/youtube-dialog.component";
import {ImageSliderModel} from "../../shared/image-slider/image-slider.model";

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
  videoMovies!: IVideoModel;
  recommendationImageLst: ImageSliderModel[]=[];

  constructor(private themoviedbService: ThemoviedbService,
              private applicationConfigService: ApplicationConfigService,
              private config: NgbRatingConfig,
              private router: Router,
              private dialog: MatDialog,
              private activeRoute: ActivatedRoute) {
    this.imageUrl = this.applicationConfigService.getEndpointImage(PosterSizesEnums.W342);
    this.recommentUrl = this.applicationConfigService.getEndpointImage(PosterSizesEnums.W342);
    this.profileUrl = this.applicationConfigService.getEndpointImage(ProfileSizesEnums.W45);
    this.config.readonly = true;
    this.config.max = 5;
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const movieId = params['id'];
      if (movieId && movieId == '') {
        this.router.navigate(['404']);
      }
      this.loadDetailMovie(movieId);
      this.themoviedbService.getMovieCredits(movieId)
        .subscribe({
          next: value => {
            if (value) {
              this.listCast = value;
            }
          }
        });
      this.themoviedbService.getMovieRecommendation(movieId, 1)
        .subscribe({
          next: value => {
            if (value && value.results) {
              this.recommendationLst = value.results as IMovie[];
              this.recommendationImageLst = this.recommendationLst.filter((item: IMovie) =>item.poster_path).map((recommentItem: IMovie)=>{
                return {
                  imageUrl: recommentItem.poster_path,
                  title: recommentItem.title,
                  routerLink: '/movie/'+ recommentItem.id + '/detail',
                  quality: PosterSizesEnums.W342
                } as ImageSliderModel
              })
            }
          }
        });
      this.themoviedbService.getTrailerMovieById(movieId)
        .subscribe({
          next: value => {
            if (value) {
              this.videoMovies = value;
            }
          }
        });
    });
  }

  loadDetailMovie(movie_id: string): void {
    if (!this.loading) {
      this.loading = true;
      this.themoviedbService.getMovieDetail(movie_id).pipe(
        first()
      ).subscribe({
        next: value => {
          this.loading = false;
          if(value){
            this.moviesDetail = value;
          }
        }
      })
    }
  }

  goBack(): void {
    window.history.back();
  }

  openYoutubeDialog(): void {
    this.dialog.open(YoutubeDialogComponent, {
      data: {videoId: this.videoMovies.key},
    });
  }

  previousCastItems(): void {
    let container = document.getElementById("castItemsContainer");
    container!.scrollLeft -= 50;
  }

  nextCastItems(): void {
    let container = document.getElementById("castItemsContainer");
    container!.scrollLeft += 50;
  }
}
