import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemoviedbService} from "@service/themoviedb-service";
import {IMovieModel, IMovieDetailModel} from "@model/movies.model";
import {ApplicationConfigService} from "@config/application-config.service";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {first, Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ICastModel} from "@app/model/cast.model";
import {PosterSizesEnums, ProfileSizesEnums} from "@enums/image.quality.enums";
import {IVideoModel} from "@model/video.model";
import {MatDialog} from "@angular/material/dialog";
import {YoutubeDialogComponent} from "@shared/youtube-dialog/youtube-dialog.component";
import {ImageSliderModel} from "@shared/image-slider/image-slider.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  protected readonly ProfileSizesEnums = ProfileSizesEnums;
  protected readonly PosterSizesEnums = PosterSizesEnums;
  private unsubscribe$ = new Subject<void>();
  moviesDetail!: IMovieDetailModel;
  loading = false;
  listCast: ICastModel[] = [];
  videoMovies!: IVideoModel;
  recommendationImageLst: ImageSliderModel[] = [];

  constructor(private themoviedbService: ThemoviedbService,
              private applicationConfigService: ApplicationConfigService,
              private config: NgbRatingConfig,
              private router: Router,
              private dialog: MatDialog,
              private activeRoute: ActivatedRoute) {
    this.config.readonly = true;
    this.config.max = 5;
  }

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        const movieId = params['id'];
        if (movieId && movieId == '') {
          this.router.navigate(['404']);
        }
        this.loadDetailMovie(movieId);
        this.themoviedbService.getMovieCredits(movieId)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: value => {
              if (value) {
                this.listCast = value;
              }
            }
          });
        this.themoviedbService.getMovieRecommendation(movieId, 1)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: value => {
              if (value?.results) {
                const recommendationLst = value.results as IMovieModel[];
                this.recommendationImageLst = recommendationLst.filter((item: IMovieModel) => item.poster_path).map((item: IMovieModel) => {
                  return {
                    imageUrl: item.poster_path,
                    title: item.title,
                    routerLink: '/movie/' + item.id + '/detail',
                    quality: PosterSizesEnums.W342
                  } as ImageSliderModel
                })
              }
            }
          });
        this.themoviedbService.getTrailerMovieById(movieId)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: value => {
              if (value) {
                this.videoMovies = value;
              }
            }
          });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadDetailMovie(movie_id: string): void {
    if (!this.loading) {
      this.loading = true;
      this.themoviedbService.getMovieDetail(movie_id).pipe(
        takeUntil(this.unsubscribe$),
        first()
      ).subscribe({
        next: value => {
          this.loading = false;
          if (value) {
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
    const container = document.getElementById("castItemsContainer");
    container!.scrollLeft -= 50;
  }

  nextCastItems(): void {
    const container = document.getElementById("castItemsContainer");
    container!.scrollLeft += 50;
  }
}
