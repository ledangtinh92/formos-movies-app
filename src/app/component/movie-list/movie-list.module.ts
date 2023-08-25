import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {movielstState} from "./movie-list.route";
import {SharedLibsModule} from "../../shared/shared-libs.module";
import {MovieListComponent} from "./movie-list.component";
import {NgbRating} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [SharedLibsModule, RouterModule.forChild(movielstState), NgbRating],
  declarations: [MovieListComponent],
})
export class MovieListModule {
}
