import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {YouTubePlayerModule} from "@angular/youtube-player";

@Component({
  standalone: true,
  selector: 'app-youtube-dialog',
  template: `
      <youtube-player [videoId]="videoId"></youtube-player>
  `,
  imports: [
    YouTubePlayerModule
  ]
})

export class YoutubeDialogComponent implements OnInit {
  videoId = 'dG91B3hHyY4';
  apiLoaded = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { videoId: string }) {
  }

  ngOnInit(): void {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }
}