import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {YouTubePlayerModule} from "@angular/youtube-player";

@Component({
  standalone: true,
  selector: 'app-youtube-dialog',
  template: `
      <youtube-player [width]="screenWidth" [height]="screenHeight" [videoId]="videoId"></youtube-player>
  `,
  imports: [
    YouTubePlayerModule
  ]
})

export class YoutubeDialogComponent implements OnInit {
  videoId = '';
  apiLoaded = false;
  screenWidth: number = window.innerWidth - (window.innerWidth/3);
  screenHeight: number = window.innerHeight-(window.innerHeight/4);


  constructor(@Inject(MAT_DIALOG_DATA) public data: { videoId: string }) {
    this.videoId = data.videoId;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth - (window.innerWidth/3);
    this.screenHeight = window.innerHeight-(window.innerHeight/4);
  }

  ngOnInit(): void {
    if (!this.apiLoaded) {
      let tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }
}
