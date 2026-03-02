import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClient} from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),             
    importProvidersFrom(HttpClient)  
  ]
})
.catch(err => console.error(err));