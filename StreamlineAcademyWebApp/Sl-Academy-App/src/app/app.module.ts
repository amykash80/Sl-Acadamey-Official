import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './Services/interceptor.service';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { IsActivePipe } from './Pipes/is-active.pipe';


@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
       multi: true
    },
    provideHotToastConfig()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
