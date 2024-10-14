import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; // تأكد من استيراد HttpClientModule

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-left',
        closeButton: true,
        timeOut: 3000,
        progressBar: true,
      }),
      HttpClientModule // استخدم importProvidersFrom لإضافة HttpClientModule بشكل صحيح
    )
  ],
};
