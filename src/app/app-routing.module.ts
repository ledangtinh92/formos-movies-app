import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {navbarTopRoute} from "./layouts/navbar-top/navbar-top.route";
import {navbarRightRoute} from "./layouts/navbar-right/navbar-right.route";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./component/movie-list/movie-list.module').then(m => m.MovieListModule),
  },
  {
    path: 'detail',
    loadChildren: () => import('./component/movie-detail/movie-detail.module').then(m => m.MovieDetailModule),
  },
  navbarTopRoute,navbarRightRoute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
