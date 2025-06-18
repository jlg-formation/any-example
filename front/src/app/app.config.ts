import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  InjectionToken,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { routes } from './app.routes';
import { authenticationInterceptor } from '../app/interceptors/authentication.interceptor';
import { PrefixTitleStrategyService } from './services/prefix-title-strategy.service';

export const TITLE_PREFIX = new InjectionToken<string>('TITLE_PREFIX');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    provideZonelessChangeDetection(),
    {
      provide: TitleStrategy,
      useClass: PrefixTitleStrategyService,
    },
    {
      provide: TITLE_PREFIX,
      useValue: 'Gestion Stock',
    },
  ],
};
