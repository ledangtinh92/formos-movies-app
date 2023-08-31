import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class BattleshipGameService {

  createTwoDimArray(rows: number, cols: number): number[][] {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  computerSettingShipLocation(playersComputerBoards: number[][], shipTotal: number): number[][] {
    if (shipTotal == 0) return playersComputerBoards;
    Array.from({length: shipTotal}, (_, index) => index).forEach(value => {
      const rowNumber = Math.floor(Math.random() * playersComputerBoards.length);
      const colNumber = Math.floor(Math.random() * playersComputerBoards[0].length);
      playersComputerBoards[rowNumber][colNumber] = playersComputerBoards[rowNumber][colNumber] + 1;
    });
    return playersComputerBoards;
  }
}
