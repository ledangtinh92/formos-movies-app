import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {homeState} from "./home.route";
import {SharedLibsModule} from "../../shared/shared-libs.module";
import {HomeComponent} from "./home.component";

@NgModule({
  imports: [SharedLibsModule, RouterModule.forChild(homeState)],
  declarations: [HomeComponent],
})
export class HomeModule {}
