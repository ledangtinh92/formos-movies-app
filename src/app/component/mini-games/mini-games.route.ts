import {Routes} from '@angular/router';
import {AlphabetGameComponent} from "@component/mini-games/alphabet-game/alphabet-game.component";


export const miniGamesState: Routes = [
  {
    path: 'alphabet',
    component: AlphabetGameComponent,
  },
];
