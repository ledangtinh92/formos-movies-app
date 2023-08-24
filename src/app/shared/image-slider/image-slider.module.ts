import {NgModule} from '@angular/core';
import {ImageSliderComponent} from './image-slider.component';
import {RouterLink} from "@angular/router";
import {SharedLibsModule} from "../shared-libs.module";

@NgModule({
  declarations: [ImageSliderComponent],
  imports: [RouterLink, SharedLibsModule],
  exports: [ImageSliderComponent],
})
export class ImageSliderModule {
}
