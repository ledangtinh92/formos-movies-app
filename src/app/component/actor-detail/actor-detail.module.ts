import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {actorDetailState} from "./actor-detail.route";
import {SharedLibsModule} from "../../shared/shared-libs.module";
import {ActorDetailComponent} from "./actor-detail.component";
import {ImageSliderModule} from "../../shared/image-slider/image-slider.module";

@NgModule({
  imports: [SharedLibsModule, RouterModule.forChild(actorDetailState), ImageSliderModule],
  declarations: [ActorDetailComponent],
})
export class ActorDetailModule {}
