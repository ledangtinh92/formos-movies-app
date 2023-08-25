import {AfterViewInit, Component, HostListener, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  toggleDrawer(): void {
    this.drawer.toggle();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setContainerBodyHeight();
  }

  ngAfterViewInit(): void {
    this.setContainerBodyHeight();
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
