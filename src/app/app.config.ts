import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MARKED_OPTIONS, MarkdownModule, MarkdownService } from 'ngx-markdown';
import { CookieModule } from 'ngx-cookie';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient (withInterceptors([authInterceptor])),importProvidersFrom(MarkdownModule.forRoot(),CookieModule.withOptions())
    
  ]
};
