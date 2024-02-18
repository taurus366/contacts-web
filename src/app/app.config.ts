import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  HttpClientXsrfModule,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http'; // Import HttpClientModule
import { routes } from './app.routes';
import {AppHttpInterceptor} from "./shared/app-http-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter(routes, withDebugTracing()),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    importProvidersFrom(
      HttpClientXsrfModule.withOptions({
      cookieName:'JSESSIONID',
      headerName:'XSRF-TOKEN'
    }))
  ]
};
