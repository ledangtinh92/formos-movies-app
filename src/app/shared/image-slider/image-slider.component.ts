import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {ImageSliderModel} from "./image-slider.model";
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements AfterViewInit{
  @Input() items: ImageSliderModel[] = [];
  @Input() isShowButton: boolean = false;
  @Input() scrollWidth: number = 10;
  @ViewChild('scrollDiv') scrollDivRef!: ElementRef;
  private destroy$ = new Subject<void>();
  isScrolling = false;

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.renderer.listen('window', 'load', () => {
      const scrollDiv: HTMLElement = this.scrollDivRef.nativeElement;
      if (scrollDiv.scrollWidth <= scrollDiv.clientWidth) {
        this.isShowButton = false;
      }
    });
  }

  stopScrolling(): void {
    this.isScrolling = false;
    this.destroy$.next();
  }

  startScrolling(action: 'next' | 'prev') {
    if (!this.isScrolling) {
      this.isScrolling = true;
      interval(100)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          if (action === 'next') {
            this.scrollNextItems();
          } else {
            this.scrollPreviousItems();
          }
        });
    }
  }

  scrollPreviousItems(): void {
    if (this.isShowButton) {
      let container = document.getElementById("containerItems");
      container!.scrollLeft -= this.scrollWidth;
    }
  }

  scrollNextItems(): void {
    if (this.isShowButton) {
      let container = document.getElementById("containerItems");
      container!.scrollLeft += this.scrollWidth;
    }
  }
}
