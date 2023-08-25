import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {movielstState} from "./movie-list.route";
import {SharedLibsModule} from "../../shared/shared-libs.module";
import {MovieListComponent} from "./movie-list.component";
import {NgbRating} from "@ng-bootstrap/ng-bootstrap";
import {NgOptimizedImage, provideImgixLoader} from "@angular/common";
import {environment} from "../../environment/environment";

@NgModule({
  imports: [SharedLibsModule, RouterModule.forChild(movielstState), NgbRating, NgOptimizedImage],
  declarations: [MovieListComponent],
  providers: [
    provideImgixLoader(environment.SERVER_IMAGES_URL),
  ],
})

export class MovieListModule {
}
