import {AfterViewInit, Component, HostListener, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  isHiddenScrollTopBtn: boolean = false;
  constructor(private viewportScroller: ViewportScroller) {
  }

  toggleDrawer(): void {
    this.drawer.toggle();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setContainerBodyHeight();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos >= (max - (max/4))) {
       this.isHiddenScrollTopBtn = true;
    } else {
      this.isHiddenScrollTopBtn = false;
    }
  }

  ngAfterViewInit(): void {
    this.setContainerBodyHeight();
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToAnchor("top-position");
  }

  private setContainerBodyHeight(): void {
    const viewportHeight = window.innerHeight;
    const divHeightNavTop = document.getElementById('container-nav-top')?.offsetHeight;
    const divHeightFooter = document.getElementById('container-footer')?.offsetHeight;
    let divElementBody = document.getElementById('container-body');
    if (divElementBody && divHeightNavTop && divHeightFooter) {
      divElementBody.style.minHeight = (viewportHeight - divHeightNavTop - divHeightFooter) + 'px';
    }
  }
}
