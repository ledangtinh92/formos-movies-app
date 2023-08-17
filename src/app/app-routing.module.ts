import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {navbarRoute} from "./layouts/navbar/navbar.route";
import {HomeComponent} from "./component/home/home.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./component/home/home.module').then(m => m.HomeModule),
  },
  navbarRoute,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
