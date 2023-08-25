import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() isHiddenScrollTopBtn = false;
  @Output() scrollTopEvent = new EventEmitter();
  currentYear = new Date().getFullYear();

  scrollToTop() {
    this.scrollTopEvent.emit();
  }
}
