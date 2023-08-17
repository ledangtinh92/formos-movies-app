import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  onConnectLinkOpenNewTab(linkNumber: number): void {
    const linkLinkedInUrl = 'https://www.linkedin.com/company/27063000/';
    const linkTwitterUrl = 'https://twitter.com/counsl_inc';
    const linkFaceUrl = 'https://www.facebook.com/counsl.inc/';
    let currentLink = linkLinkedInUrl;
    if (linkNumber === 1) {
      currentLink = linkTwitterUrl;
    } else if (linkNumber === 2) {
      currentLink = linkFaceUrl;
    }
    window.open(currentLink, '_blank');
  }
}
