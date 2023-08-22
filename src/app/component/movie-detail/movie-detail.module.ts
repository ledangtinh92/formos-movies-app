import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {movieDetailState} from "./movie-detail.route";
import {SharedLibsModule} from "../../shared/shared-libs.module";
import {MovieDetailComponent} from "./movie-detail.component";
import {NgbCarousel, NgbRating, NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import {YouTubePlayerModule} from "@angular/youtube-player";
import {ImageSliderComponent} from "../../shared/image-slider/image-slider.component";

@NgModule({
  imports: [SharedLibsModule, RouterModule.forChild(movieDetailState), NgbRating, YouTubePlayerModule, NgbCarousel, NgbSlide, ImageSliderComponent],
    declarations: [MovieDetailComponent],
})
export class MovieDetailModule {}
