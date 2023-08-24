import {Component, HostListener, Input} from '@angular/core';
import {ImageSliderModel} from "./image-slider.model";
import {interval, Subject, throttleTime} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent {
  @Input() items: ImageSliderModel[] = [];
  @Input() isShowButton: boolean = false;
  @Input() scrollWidth: number = 10;

  private destroy$ = new Subject<void>();
  isScrolling = false;

  stopScrolling():void{
    this.isScrolling = false;
    this.destroy$.next();
  }

  startScrolling(action : 'next' | 'prev') {
    if (!this.isScrolling) {
      this.isScrolling = true;
      interval(100)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          if(action === 'next'){
            this.scrollNextItems();
          } else {
            this.scrollPreviousItems();
          }
        });
    }
  }

  scrollPreviousItems():void {
    if (this.isShowButton) {
      let container = document.getElementById("containerItems");
      container!.scrollLeft -= this.scrollWidth;
    }
  }

  scrollNextItems():void {
    if (this.isShowButton) {
      let container = document.getElementById("containerItems");
      container!.scrollLeft += this.scrollWidth;
    }
  }

  previousItems():void {
    if (this.isShowButton) {
      let container = document.getElementById("containerItems");
      container!.scrollLeft -= this.scrollWidth;
    }
  }

  nextItems():void {
    if (this.isShowButton) {
      let container = document.getElementById("containerItems");
      container!.scrollLeft += this.scrollWidth;
    }
  }
}
