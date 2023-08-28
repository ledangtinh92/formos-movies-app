import {Pipe, PipeTransform} from '@angular/core';
import {ApplicationConfigService} from "@config/application-config.service";

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {
  baseUrl = '';

  constructor(private applicationConfigService: ApplicationConfigService) {
    this.baseUrl = this.applicationConfigService.getEndpointImage('');
  }

  transform(imageName: string, quality: string): string {
    return this.baseUrl + "/" + quality + "/" + imageName;
  }
}
