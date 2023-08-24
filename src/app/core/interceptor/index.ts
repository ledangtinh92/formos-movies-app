import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {RequestInterceptor} from "./request-Interceptor";
import {ErrorInterceptor} from "./error-interceptor";

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  }
];
