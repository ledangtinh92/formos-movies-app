import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {movieDetailState} from "./actor-detail.route";
import {SharedLibsModule} from "../../shared/shared-libs.module";
import {ActorDetailComponent} from "./actor-detail.component";

@NgModule({
    imports: [SharedLibsModule, RouterModule.forChild(movieDetailState)],
    declarations: [ActorDetailComponent],
})
export class ActorDetailModule {}
