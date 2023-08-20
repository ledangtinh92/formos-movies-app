import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationConfigService {
  private endpointApi = '';
  private endpointImage = '';

  setEndpointApi(endpointApi: string): void {
    this.endpointApi = endpointApi;
  }

  setEndpointImage(endpointImage: string): void {
    this.endpointImage = endpointImage;
  }

  getEndpointApi(api: string): string {
    return `${ this.endpointApi }${ api }`;
  }

  getEndpointImage(api: string): string {
    return `${ this.endpointImage }/${ api }`;
  }
}
