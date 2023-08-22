import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {navbarTopRoute} from "./layouts/navbar-top/navbar-top.route";
import {navbarRightRoute} from "./layouts/navbar-right/navbar-right.route";
import {HomeComponent} from "./component/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'movie',
    loadChildren: () => import('./component/movie-list/movie-list.module').then(m => m.MovieListModule),
  },
  {
    path: 'movie/:id/detail',
    loadChildren: () => import('./component/movie-detail/movie-detail.module').then(m => m.MovieDetailModule),
  },
  {
    path: 'actor/:id/detail',
    loadChildren: () => import('./component/actor-detail/actor-detail.module').then(m => m.ActorDetailModule),
  },
  navbarTopRoute,navbarRightRoute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
