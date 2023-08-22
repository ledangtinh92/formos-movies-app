import {Component, Input} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent {
  @Input() imageInput =[]
  images: string[] = [];
  currentIndex: number = 0;

  constructor() {
    for (let i = 1; i <= 30; i++) {
      this.images.push(`image${i}.jpg`);
    }
  }

  slide(direction: 'next' | 'prev') {
    if (direction === 'next') {
      this.currentIndex = Math.min(this.currentIndex + 10, this.images.length - 10);
    } else if (direction === 'prev') {
      this.currentIndex = Math.max(this.currentIndex - 10, 0);
    }
  }
}
