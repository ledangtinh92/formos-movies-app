import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appScrollTracker]'
})
export class ScrollTrackerDirective {
  @Output() scrolledToBottom = new EventEmitter();

  constructor(private el: ElementRef) {}

  @HostListener('scroll', ['$event'])
  onScroll(event: any):void {
    const target = event.target;
    const scrollPosition = target.scrollHeight - target.clientHeight - target.scrollTop;
    const threshold = 100;
    if (scrollPosition <= threshold) {
      this.scrolledToBottom.emit();
    }
  }
}
