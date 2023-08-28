import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {movieDetailState} from "./movie-detail.route";
import {SharedLibsModule} from "@shared/shared-libs.module";
import {MovieDetailComponent} from "./movie-detail.component";
import {NgbCarousel, NgbRating, NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import {YouTubePlayerModule} from "@angular/youtube-player";
import {ImageSliderModule} from "@shared/image-slider/image-slider.module";

@NgModule({
  imports: [SharedLibsModule, RouterModule.forChild(movieDetailState), NgbRating, YouTubePlayerModule, NgbCarousel, NgbSlide, ImageSliderModule],
  declarations: [MovieDetailComponent],
})
export class MovieDetailModule {
}
