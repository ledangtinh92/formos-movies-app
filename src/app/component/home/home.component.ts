import {Component, OnInit} from '@angular/core';
import {ApplicationConfigService} from "src/app/config/application-config.service";
import {ThemoviedbService} from "src/app/service/themoviedb-service";
import {IMovie} from "src/app/model/movies.model";
import {BackdropSizesEnums, ProfileSizesEnums} from "../../enums/image.quality.enums";
import {NgbCarouselConfig,} from "@ng-bootstrap/ng-bootstrap";
import {IPersonModel} from "../../model/person.model";
import {ImageSliderModel} from "../../shared/image-slider/image-slider.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig],
})
export class HomeComponent implements OnInit {
  nowPlayingMovies: IMovie[];
  populerPeopleLst: IPersonModel[];
  backdropPathUrl= '';
  imageUrl = '';
  poppulerPeople!: ImageSliderModel[];
  constructor(private applicationConfigService: ApplicationConfigService,
              config: NgbCarouselConfig,
              private themoviedbService: ThemoviedbService) {
    this.backdropPathUrl = this.applicationConfigService.getEndpointImage(BackdropSizesEnums.W780);
    this.nowPlayingMovies = [];
    this.populerPeopleLst = []
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
    this.imageUrl = this.applicationConfigService.getEndpointImage(ProfileSizesEnums.H632);
  }

  ngOnInit(): void {
    this.themoviedbService.getTopMoviesNowPlaying().subscribe(value => {
      this.nowPlayingMovies = value;
    })
    this.themoviedbService.getPopularPeopleLst().subscribe(value => {
      if (value) {
        this.populerPeopleLst = value;

        this.poppulerPeople = value.filter(p => p.profile_path).map((person: IPersonModel) => {
          return {
            imageUrl: person.profile_path,
            title: person.name,
            routerLink: '/actor/'+ person.id + '/detail',
            quality: ProfileSizesEnums.H632
          } as ImageSliderModel
        });
      }
    })
  }
}
