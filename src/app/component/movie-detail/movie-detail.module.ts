import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {movieDetailState} from "./movie-detail.route";
import {SharedLibsModule} from "../../shared/shared-libs.module";
import {MovieDetailComponent} from "./movie-detail.component";
import {NgbRating} from "@ng-bootstrap/ng-bootstrap";
import {ScrollTrackerDirective} from "../../shared/directive/scroll-tracker.directive";

@NgModule({
  imports: [SharedLibsModule, RouterModule.forChild(movieDetailState), NgbRating],
  declarations: [MovieDetailComponent,ScrollTrackerDirective],
})
export class MovieDetailModule {}
