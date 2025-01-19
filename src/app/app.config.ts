import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import '@angular/common/locales/global/pl';
import {provideHttpClient, withFetch} from "@angular/common/http";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import customParseFormat from "dayjs/plugin/customParseFormat";


dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideHttpClient(withFetch()), provideRouter(routes), provideClientHydration(),
    {provide: LOCALE_ID, useValue: "pl-PL"}]
};
