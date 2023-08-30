import {Routes} from '@angular/router';
import {AlphabetGameComponent} from "@component/mini-games/alphabet-game/alphabet-game.component";
import {BattleShipGameComponent} from "@component/mini-games/battlesship-game/battleship-game.component";


export const miniGamesState: Routes = [
  {
    path: 'alphabet',
    component: AlphabetGameComponent,
  },
  {
    path: 'battleship',
    component: BattleShipGameComponent,
  },
];
