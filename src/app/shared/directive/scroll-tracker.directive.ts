import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollTracker]'
})
export class ScrollTrackerDirective {
  @Output() scrollingFinished = new EventEmitter<void>();

  @HostListener("window:scroll", [])
  onScroll(): void {
    //console.log("window.innerHeight " + window.innerHeight);
    //console.log("window.scrollY " + window.scrollY);

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.scrollingFinished.emit();
    } else if ((window.innerHeight + window.scrollY) < document.body.offsetHeight) {
    }
  }
}
