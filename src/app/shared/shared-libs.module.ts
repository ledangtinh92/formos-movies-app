import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RoundNumberPipe} from "./pipe/round-number-pipe";
import {ImageUrlPipe} from "./pipe/image-url-pipe";

@NgModule({
  declarations: [RoundNumberPipe, ImageUrlPipe],
  imports: [],
  exports: [
    FormsModule,
    CommonModule,
    RoundNumberPipe,
    ImageUrlPipe,
  ],
})
export class SharedLibsModule {
  static forRoot() {
    return {
      ngModule: SharedLibsModule,
    };
  }
}
