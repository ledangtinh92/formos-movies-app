import {Component, OnInit} from '@angular/core';
import {ApplicationConfigService} from "src/app/config/application-config.service";
import {ThemoviedbService} from "src/app/service/themoviedb-service";
import {IMovie} from "src/app/model/movies.model";
import {BackdropSizesEnums} from "src/app/enums/image.model";
import {NgbCarouselConfig,} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig],
})
export class HomeComponent implements OnInit {
  nowPlayingMovies: IMovie[];
  backdropPathUrl= '';
  constructor(private applicationConfigService: ApplicationConfigService,
              config: NgbCarouselConfig,
              private themoviedbService: ThemoviedbService) {
    this.backdropPathUrl = this.applicationConfigService.getEndpointImage(BackdropSizesEnums.W780);
    this.nowPlayingMovies = [];
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.themoviedbService.getTopMoviesNowPlaying().subscribe(value => {
      this.nowPlayingMovies = value;
    })
  }
}
