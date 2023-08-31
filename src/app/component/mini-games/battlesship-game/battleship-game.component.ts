import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {bufferTime, combineAll, concatMap, from, fromEvent, interval, map, Observable, of, refCount, share, shareReplay, startWith, take, tap, withLatestFrom, zip} from "rxjs";


// const source$ = interval(1000).pipe(
//   take(3),
//   map(val =>
//     of(`Result (${val})`).pipe(
//       // Simulate async operation
//       map(result => `${result} delayed by ${val * 1000}ms`),
//       // Complete after one emission
//       take(1)
//     )
//   )
// );
//
// // Kết hợp tất cả các Observable con khi Observable cha hoàn thành
// const combined$ = source$.pipe(
//   combineAll()
// );
//
// // Đăng ký và lắng nghe sự kiện khi hoàn thành
// combined$.subscribe(results => {
//   // console.log('Combined Results:', results);
// });

//
// const source = of(1, 2, 3, 4, 5);
// // Log each value with tap
// const example = source.pipe(
//   tap(val => console.log(`BEFORE MAP: ${val}`)),
//   map(val => val + 10),
//   tap(val => console.log(`AFTER MAP: ${val}`)),
//   startWith(0)
// );
//
// //'tap' does not transform values
// //output: 11...12...13...14...15
// const subscribe = example.subscribe(val => console.log(" subscribe:"+val));
//
//
// const sourcea$ = interval(1000);
//
// const click$ = fromEvent(document, 'click').pipe(startWith ());

// click$.pipe(
//   withLatestFrom(sourcea$)
// ).subscribe(([value, event]) => {
//   const eventClick = value as MouseEvent;
//   console.log(`Value: ${event}, Clicked at: (${eventClick.clientX}, ${eventClick.clientY})`);
// });

// const source1$ = of('A', 'B', 'C');
// const source2$ = of(1, 2);
//
// // Sử dụng operator zip để kết hợp các giá trị từ source1$ và source2$
// zip(source1$, source2$).subscribe(([value1, value2]) => {
//   console.log(`Value from source1$: ${value1}, Value from source2$: ${value2}`);
// });



// const sourceNoshare$: Observable<number> = interval(1000).pipe(
//   tap(value => console.log(`Producing: ${value}`))
// );
// const sharedNOSource$: Observable<number> = sourceNoshare$.pipe(share());
// const sharedNOSource1$ = sharedNOSource$.subscribe(value => {
//   console.log(`Subscriber 1 received: ${value}`);
// });
//
// setTimeout(() => {
//   const sharedNOSource2$ = sharedNOSource$.subscribe(value => {
//     console.log(`Subscriber 2 received: ${value}`);
//   });
// }, 2000);

//
// const source$: Observable<number> = interval(1000).pipe(
//   tap(value => console.log(`Producing: ${value}`))
// );
//
// const sharedSource$: Observable<number> = source$.pipe(shareReplay(1));
// const sub1 = sharedSource$.subscribe(value => {
//   console.log(`Subscriber 1 received: ${value}`);
// });
//
// setTimeout(() => {
//   sub1.unsubscribe();
// }, 3000);
//
// setTimeout(() => {
//   const sub2 = sharedSource$.subscribe(value => {
//     console.log(`Subscriber 2 received: ${value}`);
//   });
//   setTimeout(() => {
//     sub2.unsubscribe();
//   }, 2000);
// }, 4000);
//
//
// setTimeout(() => {
//   const sub3 = sharedSource$.subscribe(value => {
//     console.log(`Subscriber 3 received: ${value}`);
//   });
// }, 9000);

//
// // Tạo một Observable phát ra giá trị mỗi 500ms
// const source$ = interval(500);
//
// // Sử dụng bufferTime để tạo chuỗi các giá trị trong khoảng thời gian 2000ms
// const buffered$ = source$.pipe(bufferTime(2000));
//
// // Đăng ký subscriber
// buffered$.subscribe(buffer => {
//   console.log(`Buffered Values: ${buffer}`);
// });

//
// // Sử dụng map
// from([1, 2, 3])
//   .pipe(
//     map(value => value * 2)
//   )
//   .subscribe(result => {
//     console.log( "map "+ result);
//   });
//
// // Sử dụng concatMap
// from([1, 2, 3])
//   .pipe(
//     concatMap(value => interval(1000).pipe(take(2), map(() => value * 2)))
//   )
//   .subscribe(result => {
//     console.log( "concatMap "+result);
//   });


































  @Component({
  selector: 'app-battleship-game',
  templateUrl: './battleship-game.component.html',
  styleUrls: ['./battleship-game.component.scss']
})
export class BattleShipGameComponent implements AfterViewInit {
  //@ViewChild('gameCanvas', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> | undefined;
  constructor() {

  }


  ngAfterViewInit(): void {

  }
}
