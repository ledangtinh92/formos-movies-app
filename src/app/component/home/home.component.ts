import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApplicationConfigService} from "src/app/config/application-config.service";
import {ThemoviedbService} from "src/app/service/themoviedb-service";
import {IMovieModel} from "src/app/model/movies.model";
import {BackdropSizesEnums, ProfileSizesEnums} from "../../enums/image.quality.enums";
import {NgbCarouselConfig,} from "@ng-bootstrap/ng-bootstrap";
import {IPersonModel} from "../../model/person.model";
import {ImageSliderModel} from "../../shared/image-slider/image-slider.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig],
})
export class HomeComponent implements OnInit, OnDestroy {
  protected readonly BackdropSizesEnums = BackdropSizesEnums;
  private unsubscribe$ = new Subject<void>();
  nowPlayingMovies: IMovieModel[] = [];
  popularPeopleImages!: ImageSliderModel[];

  constructor(private applicationConfigService: ApplicationConfigService,
              config: NgbCarouselConfig,
              private themoviedbService: ThemoviedbService) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.themoviedbService.getTopMoviesNowPlaying()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.nowPlayingMovies = value;
      })
    this.themoviedbService.getPopularPeopleLst()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        if (value) {
          this.popularPeopleImages = value.filter(p => p.profile_path).map((person: IPersonModel) => {
            return {
              imageUrl: person.profile_path,
              title: person.name,
              routerLink: '/actor/' + person.id + '/detail',
              quality: ProfileSizesEnums.H632
            } as ImageSliderModel
          });
        }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
