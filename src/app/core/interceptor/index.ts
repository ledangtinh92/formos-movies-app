import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {RequestInterceptor} from "./request-Interceptor";

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true,
  }
];
