import {Component, HostListener, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, fromEvent, interval, map, Observable, scan, startWith, Subscription, switchMap, take, takeWhile} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-alphabet-game',
  templateUrl: './alphabet-game.component.html',
  styleUrls: ['./alphabet-game.component.scss']
})
export class AlphabetGameComponent implements OnInit {
  randomLetter = () => String.fromCharCode(
    Math.random() * ('z'.charCodeAt(0) - 'a'.charCodeAt(0)) + 'a'.charCodeAt(0));

  intervalSubject = new BehaviorSubject<number>(0);
  subscription!: Subscription;
  dataUpdate$: Observable<string>;
  keyGenAutoString = '';
  keyGenAutolst: string[] = [];
  totalTimes = 0;
  scores = 0
  keyMappinglst: string[] = [];
  keyPressError: number = 0;

  isRunning = false;

  speedValue = 1;
  keyPressed: string = '';

  constructor() {
    this.intervalSubject.next(1000 * this.speedValue);
    this.dataUpdate$ = this.intervalSubject.pipe(
      switchMap(frequency => interval(frequency)),
      map(() => {
        return this.randomLetter();
      })
    );
  }

  ngOnInit(): void {

  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.isRunning) {
      this.keyPressed = event.key;
      if (this.keyPressed === this.keyGenAutoString) {
        this.keyMappinglst = this.keyMappinglst.concat(this.keyGenAutoString);
        this.scores = this.scores + 1;
      } else {
        if(this.keyPressError == 5){

        } else {

        }
        this.keyPressError = this.keyPressError + 1;

      }
    }
  }

  startGames() {
    this.isRunning = true;
    this.totalTimes = 0;
    this.scores = 0;
    this.keyGenAutoString = '';
    this.keyMappinglst = [];
    this.keyGenAutolst = [];
    this.keyPressError = 0;
    this.subscription = this.dataUpdate$.pipe(
      takeWhile(value => value != '' && this.keyPressError != 5),
    ).subscribe({
      next: value => {
        this.keyGenAutolst = this.keyGenAutolst.concat(value);
        this.totalTimes = ++this.totalTimes;
        if (value === '') {
          this.stopGames();
        } else {
          this.keyGenAutoString = value;
        }
      },
      error: err => {
        this.isRunning = false;
      },
      complete: () => {
        this.isRunning = false;
      }
    })
  }

  stopGames() {
    this.isRunning = false;
    this.subscription.unsubscribe();
  }

  changeSpeedValue() {
    this.intervalSubject.next(1000 * this.speedValue);
  }
}
