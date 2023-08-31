import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BattleshipGameService} from "@component/mini-games/battlesship-game/battleship-game.service";
import {BehaviorSubject, debounceTime, Observable, Subject} from "rxjs";

@Component({
  selector: 'app-battleship-game',
  templateUrl: './battleship-game.component.html',
  styleUrls: ['./battleship-game.component.scss']
})
export class BattleShipGameComponent implements OnInit, AfterViewInit {
  playersYouBoards: number[][] = [];
  shipYouRecords: number = 50;
  youRecords: number = 0;
  youTurn: boolean = true;
  playersComputerBoards: number[][] = [];
  shipComputerRecords: number = 50;
  computerRecords: number = 0;
  turnObservable: Subject<boolean>;


  computerShipNumberOb: BehaviorSubject<number> = new BehaviorSubject<number>(50);
  playShipNumberOb: BehaviorSubject<number> = new BehaviorSubject<number>(50);
  turnOb: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private battleshipGameService: BattleshipGameService) {
    this.turnObservable = new Subject<boolean>();
  }

  ngOnInit(): void {
    this.playersYouBoards = this.battleshipGameService.createTwoDimArray(12, 12);
    this.playersComputerBoards = this.battleshipGameService.createTwoDimArray(12, 12);
    this.battleshipGameService.computerSettingShipLocation(this.playersComputerBoards,this.shipComputerRecords);
    this.battleshipGameService.computerSettingShipLocation(this.playersYouBoards,49);
    this.shipComputerRecords = 0;
    this.shipYouRecords = 1;

    this.turnObservable.pipe(debounceTime(1000)).subscribe(value => {
        this.computerPlay();
    })

    



  }

  ngAfterViewInit(): void {

  }

  private computerPlay():void{
    const rowData = Math.floor(Math.random() * this.playersComputerBoards.length);
    const colData = Math.floor(Math.random() * this.playersComputerBoards[0].length);
    if (this.shipComputerRecords > 0) {
      this.playersComputerBoards[Number(colData)][Number(rowData)] = this.playersComputerBoards[Number(colData)][Number(rowData)] + 1;
      this.shipComputerRecords--;
    } else {
      if(!this.youTurn){
        const youRecordData = this.playersYouBoards[Number(colData)][Number(rowData)];
        if (youRecordData != 0 && youRecordData < 90){
          this.playersYouBoards[Number(colData)][Number(rowData)] = 99;
          this.computerRecords = this.computerRecords + youRecordData;
          this.turnObservable.next(this.youTurn);
        } else {
          if(youRecordData < 90){
            this.playersYouBoards[Number(colData)][Number(rowData)] = 98;
          }
        }
        this.youTurn = true;
      }
    }
  }

  playersBoardsClick($event: MouseEvent): void {
    const clickedDiv = $event.target as HTMLDivElement;
    if (clickedDiv) {
      const colData = clickedDiv.getAttribute('col-data');
      const rowData = clickedDiv.getAttribute('row-data');
      if (colData && rowData) {
        if (this.shipYouRecords > 0) {
          this.playersYouBoards[Number(colData)][Number(rowData)] = this.playersYouBoards[Number(colData)][Number(rowData)] + 1;
          this.shipYouRecords--;
        } else {
          if (this.youTurn) {
            const computerRecord = this.playersComputerBoards[Number(colData)][Number(rowData)];
            if (computerRecord != 0 && computerRecord < 90) {
              this.playersComputerBoards[Number(colData)][Number(rowData)] = 99;
              this.youRecords = this.youRecords + computerRecord;
            } else {
              if(computerRecord < 90){
                this.playersComputerBoards[Number(colData)][Number(rowData)] = 98;
                this.youTurn = false;
                this.turnObservable.next(this.youTurn);
              }
            }
          }
        }
      }
    }
  }
}
