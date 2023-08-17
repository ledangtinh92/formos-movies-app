import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [],
  exports: [
    FormsModule,
    CommonModule,
  ],
})
export class SharedLibsModule {
  static forRoot() {
    return {
      ngModule: SharedLibsModule,
    };
  }
}
