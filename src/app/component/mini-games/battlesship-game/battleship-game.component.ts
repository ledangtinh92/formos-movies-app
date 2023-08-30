import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {combineAll, interval, map, of, take, tap} from "rxjs";


const source$ = interval(1000).pipe(
  take(3),
  map(val =>
    of(`Result (${val})`).pipe(
      // Simulate async operation
      map(result => `${result} delayed by ${val * 1000}ms`),
      // Complete after one emission
      take(1)
    )
  )
);

// Kết hợp tất cả các Observable con khi Observable cha hoàn thành
const combined$ = source$.pipe(
  combineAll()
);

// Đăng ký và lắng nghe sự kiện khi hoàn thành
combined$.subscribe(results => {
  console.log('Combined Results:', results);
});


const source = of(1, 2, 3, 4, 5);
// Log each value with tap
const example = source.pipe(
  tap(val => console.log(`BEFORE MAP: ${val}`)),
  map(val => val + 10),
  tap(val => console.log(`AFTER MAP: ${val}`))
);

//'tap' does not transform values
//output: 11...12...13...14...15
const subscribe = example.subscribe(val => console.log(" subscribe:"+val));




@Component({
  selector: 'app-battleship-game',
  templateUrl: './battleship-game.component.html',
  styleUrls: ['./battleship-game.component.scss']
})
export class BattleShipGameComponent implements AfterViewInit {
  @ViewChild('gameCanvas', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> | undefined;
  constructor() {

  }


  ngAfterViewInit(): void {

  }
}
