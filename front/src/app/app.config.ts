import {
  ApplicationConfig,
  InjectionToken,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { PrefixTitleStrategyService } from './services/prefix-title-strategy.service';

export const TITLE_PREFIX = new InjectionToken<string>('TITLE_PREFIX');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: TitleStrategy,
      useClass: PrefixTitleStrategyService,
    },
    { provide: TITLE_PREFIX, useValue: 'Gestion Stock' },
  ],
};
