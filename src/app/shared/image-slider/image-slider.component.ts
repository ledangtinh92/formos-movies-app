import {Component, Input} from '@angular/core';
import {ImageSliderModel} from "./image-slider.model";

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent {
  @Input() items: ImageSliderModel[] = [];
  @Input() isShowButton: boolean = false;
  @Input() scrollWidth: number = 10;

  previousItems():void {
    if (this.isShowButton) {
      let container = document.getElementById("containerItems");
      container!.scrollLeft -= this.scrollWidth;
    }
  }

  nextItems():void {
    if (this.isShowButton) {
      let container = document.getElementById("containerItems");
      container!.scrollLeft += this.scrollWidth;
    }
  }
}
