import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApplicationConfigService} from "../../config/application-config.service";
import {environment} from "../../environment/environment";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private applicationConfigService: ApplicationConfigService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const serverApiUrl = this.applicationConfigService.getEndpointApi('');
    if (!request.url || (request.url.startsWith('http') && !(serverApiUrl && request.url.startsWith(serverApiUrl)))) {
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${environment.ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    });
    return next.handle(request);
  }
}
