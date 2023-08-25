import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {movielstState} from "./movie-list.route";
import {SharedLibsModule} from "../../shared/shared-libs.module";
import {MovieListComponent} from "./movie-list.component";
import {NgbRating} from "@ng-bootstrap/ng-bootstrap";
import {IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage, provideImgixLoader} from "@angular/common";

@NgModule({
  imports: [SharedLibsModule, RouterModule.forChild(movielstState), NgbRating, NgOptimizedImage],
  declarations: [MovieListComponent],
  providers: [
    provideImgixLoader("https://image.tmdb.org/t/p/"),
  ],
  // providers: [
  //   {
  //     provide: IMAGE_LOADER,
  //     useValue: (config: ImageLoaderConfig) => {
  //       return `https://image.tmdb.org/t/p/`;
  //     }
  //   },
  // ]
})

export class MovieListModule {
}
