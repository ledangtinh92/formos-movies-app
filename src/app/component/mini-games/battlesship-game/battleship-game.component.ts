import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BattleshipGameService} from "@component/mini-games/battlesship-game/battleship-game.service";
import {BehaviorSubject, combineLatest, debounceTime, scan, Subject} from "rxjs";

@Component({
  selector: 'app-battleship-game',
  templateUrl: './battleship-game.component.html',
  styleUrls: ['./battleship-game.component.scss']
})
export class BattleShipGameComponent implements OnInit, AfterViewInit {
  playerBoard: number[][] = [];
  ComputerBoard: number[][] = [];
  playerPoints: number = 50;
  computerPoints: number = 50;

  playerScores: number = 0;
  computerScores: number = 0;
  playerTurn: boolean = true;


  turnObservable: Subject<boolean>;
  computerRecordOb: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  playRecordOb: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  playerTurnOb: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private battleshipGameService: BattleshipGameService) {
    this.turnObservable = new Subject<boolean>();
  }

  ngOnInit(): void {
    this.playerBoard = this.battleshipGameService.createTwoDimArray(12, 12);
    this.ComputerBoard = this.battleshipGameService.createTwoDimArray(12, 12);
    this.battleshipGameService.computerSettingShipLocation(this.ComputerBoard, this.computerPoints);
    this.battleshipGameService.computerSettingShipLocation(this.playerBoard, 49);
    this.computerPoints = 0;
    this.playerPoints = 1;

    this.turnObservable.pipe(debounceTime(1000)).subscribe(value => {
      this.computerPlay();
    })

    combineLatest([this.computerRecordOb, this.playRecordOb, this.playerTurnOb])
      .pipe(
        scan((accumulator, [computerRecordOb, playRecordOb, playerTurnOb]) => {
            return {
              computerRecordOb: computerRecordOb,
              playRecordOb: playRecordOb,
              playerTurnOb: playerTurnOb
            };
          }, {computerRecordOb: 0, playRecordOb: 0, playerTurnOb: false}
        ))
      .subscribe(value => {
        if (value.playerTurnOb) {
          this.playerScores = this.playerScores + value.playRecordOb;
        } else {
          this.computerScores = this.computerScores + value.computerRecordOb;
        }
      });
  }

  ngAfterViewInit(): void {

  }

  private computerPlay(): void {
    const rowData = Math.floor(Math.random() * this.ComputerBoard.length);
    const colData = Math.floor(Math.random() * this.ComputerBoard[0].length);
    if (this.computerPoints > 0) {
      this.ComputerBoard[Number(colData)][Number(rowData)] = this.ComputerBoard[Number(colData)][Number(rowData)] + 1;
      this.computerPoints--;
    } else {
      if (!this.playerTurn) {
        const youRecordData = this.playerBoard[Number(colData)][Number(rowData)];
        if (youRecordData != 0 && youRecordData < 90) {
          this.playerBoard[Number(colData)][Number(rowData)] = 99;
          this.turnObservable.next(this.playerTurn);
          this.computerRecordOb.next(youRecordData);
        } else {
          if (youRecordData < 90) {
            this.playerBoard[Number(colData)][Number(rowData)] = 98;
          }
        }
        this.playerTurn = true;
        this.playerTurnOb.next(this.playerTurn);
      }
    }
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
            const computerRecord = this.ComputerBoard[Number(colData)][Number(rowData)];
            if (computerRecord != 0 && computerRecord < 90) {
              this.ComputerBoard[Number(colData)][Number(rowData)] = 99;
              this.playRecordOb.next(computerRecord);
            } else {
              if (computerRecord < 90) {
                this.ComputerBoard[Number(colData)][Number(rowData)] = 98;
                this.playerTurn = false;
                this.turnObservable.next(this.playerTurn);
                this.playerTurnOb.next(this.playerTurn);
              }
            }
          }
        }
      }
    }
  }
}
