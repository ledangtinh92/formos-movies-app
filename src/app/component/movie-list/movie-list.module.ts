import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {homeState} from "./movie-list.route";
import {SharedLibsModule} from "../../shared/shared-libs.module";
import {MovieListComponent} from "./movie-list.component";
import {NgbRating} from "@ng-bootstrap/ng-bootstrap";
import {
  CdkVirtualForOf,
  CdkVirtualScrollViewport
} from "@angular/cdk/scrolling";

@NgModule({
  imports: [SharedLibsModule, RouterModule.forChild(homeState), NgbRating, CdkVirtualScrollViewport, CdkVirtualForOf],
  declarations: [MovieListComponent],
})
export class MovieListModule {}
