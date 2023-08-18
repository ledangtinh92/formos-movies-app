import {Routes} from '@angular/router';
import {MovieListComponent} from "./movie-list.component";

export const homeState: Routes = [
  {
    path: '',
    component: MovieListComponent,
  },
];
