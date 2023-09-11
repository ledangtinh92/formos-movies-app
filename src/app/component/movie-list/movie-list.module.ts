import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {movielstState} from "./movie-list.route";
import {SharedLibsModule} from "@app/shared/shared-libs.module";
import {MovieListComponent} from "./movie-list.component";
import {NgbRating} from "@ng-bootstrap/ng-bootstrap";
import {IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage} from "@angular/common";
import {environment} from "@app/environment/environment";

@NgModule({
  imports: [SharedLibsModule, RouterModule.forChild(movielstState), NgbRating, NgOptimizedImage],
  declarations: [MovieListComponent],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return environment.SERVER_IMAGES_URL + '/' + config.src;

      }
    },
  ],
})

export class MovieListModule {
}
