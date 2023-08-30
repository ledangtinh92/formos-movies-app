import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {miniGamesState} from "@component/mini-games/mini-games.route";
import {RouterModule} from "@angular/router";
import {AlphabetGameComponent} from "@component/mini-games/alphabet-game/alphabet-game.component";
import {FormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {BattleShipGameComponent} from "@component/mini-games/battlesship-game/battleship-game.component";

@NgModule({
  declarations: [AlphabetGameComponent, BattleShipGameComponent],
  imports: [
    CommonModule, RouterModule.forChild(miniGamesState), FormsModule, MatSliderModule
  ]
})
export class MiniGamesModule {
}
