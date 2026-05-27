import {
ApplicationConfig,
provideBrowserGlobalErrorListeners,
provideZoneChangeDetection
} from '@angular/core';

import { provideRouter } from '@angular/router';

import {
provideHttpClient,
withInterceptors
} from '@angular/common/http';

import { jwtInterceptor } from './interceptors/jwt-interceptor';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {
provideToastr
}
from 'ngx-toastr';

export const appConfig: ApplicationConfig = {

providers: [

provideBrowserGlobalErrorListeners(),

provideZoneChangeDetection({
eventCoalescing: true
}),

provideRouter(routes),

provideHttpClient(
withInterceptors([
jwtInterceptor
])
),
provideAnimationsAsync(),

provideToastr({

timeOut:3000,

positionClass:
'toast-bottom-right',

preventDuplicates:true

}),
]

};