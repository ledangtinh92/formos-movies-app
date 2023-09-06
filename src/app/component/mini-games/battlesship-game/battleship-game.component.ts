import {Component, OnInit} from '@angular/core';
import {BattleshipGameService} from "@component/mini-games/battlesship-game/battleship-game.service";
import {debounceTime, Subject} from "rxjs";
import {GAME_SIZE, NUMBER_OF_SHIP_PARTS} from "@component/mini-games/battlesship-game/battleship-game.constants";

@Component({
  selector: 'app-battleship-game',
  templateUrl: './battleship-game.component.html',
  styleUrls: ['./battleship-game.component.scss']
})
export class BattleShipGameComponent implements OnInit {
  playerBoard: number[][] = [];
  ComputerBoard: number[][] = [];
  playerPoints: number = NUMBER_OF_SHIP_PARTS;
  computerPoints: number = NUMBER_OF_SHIP_PARTS;
  playerScores: number = 0;
  computerScores: number = 0;
  playerTurn: boolean = true;
  turnObservable: Subject<boolean>;

  constructor(private battleshipGameService: BattleshipGameService) {
    this.turnObservable = new Subject<boolean>();
  }

  ngOnInit(): void {
    this.playerBoard = this.battleshipGameService.createTwoDimArray(GAME_SIZE, GAME_SIZE);
    this.ComputerBoard = this.battleshipGameService.createTwoDimArray(GAME_SIZE, GAME_SIZE);
    this.battleshipGameService.computerSettingShipLocation(this.ComputerBoard, this.computerPoints);
    this.battleshipGameService.computerSettingShipLocation(this.playerBoard, NUMBER_OF_SHIP_PARTS - 1);
    this.computerPoints = 0;
    this.playerPoints = 1;
    this.turnObservable
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.computerPlay();
      });
  }

  playersBoardsClick($event: MouseEvent): void {
    const clickedDiv = $event.target as HTMLDivElement;
    if (clickedDiv) {
      const colData = clickedDiv.getAttribute('col-data');
      const rowData = clickedDiv.getAttribute('row-data');
      if (colData && rowData) {
        if (this.playerPoints > 0) {
          this.playerBoard[Number(colData)][Number(rowData)] = this.playerBoard[Number(colData)][Number(rowData)] + 1;
          this.playerPoints--;
        } else {
          if (this.playerTurn) {
            this.playerPlay(colData, rowData);
          }
        }
      }
    }
  }

  private computerPlay(): void {
    const rowData = Math.floor(Math.random() * this.ComputerBoard.length);
    const colData = Math.floor(Math.random() * this.ComputerBoard[0].length);
    if (this.computerPoints > 0) {
      this.ComputerBoard[Number(colData)][Number(rowData)] = this.ComputerBoard[Number(colData)][Number(rowData)] + 1;
      this.computerPoints--;
    } else {
      const youRecordData = this.playerBoard[Number(colData)][Number(rowData)];
      if(youRecordData > 90) {
        this.computerPlay();
        return;
      }
      if (youRecordData > 0 && youRecordData < 90) {
        this.playerBoard[Number(colData)][Number(rowData)] = 99;
        this.computerScores = this.computerScores + youRecordData;
        this.turnObservable.next(true);
      } else if (youRecordData == 0){
        this.playerBoard[Number(colData)][Number(rowData)] = 98;
        this.playerTurn = true;
      } else{
        this.turnObservable.next(true);
      }
    }
  }

  private playerPlay(colData: string, rowData: string): void {
    const computerRecord = this.ComputerBoard[Number(colData)][Number(rowData)];
    if (computerRecord != 0 && computerRecord < 90) {
      this.ComputerBoard[Number(colData)][Number(rowData)] = 99;
      this.playerScores = this.playerScores + computerRecord;
    } else {
      if (computerRecord < 90) {
        this.ComputerBoard[Number(colData)][Number(rowData)] = 98;
        this.playerTurn = false;
        this.turnObservable.next(false);
      }
    }
  }

}
