import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RoundNumberPipe} from "./pipe/round-number-pipe";

@NgModule({
  declarations:[RoundNumberPipe],
  imports: [],
  exports: [
    FormsModule,
    CommonModule,
    RoundNumberPipe,
  ],
})
export class SharedLibsModule {
  static forRoot() {
    return {
      ngModule: SharedLibsModule,
    };
  }
}
