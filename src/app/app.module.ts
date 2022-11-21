import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RocketAnimationComponent } from './rocket-countdown/animation/rocket.animation';
import { CountDownClockComponent } from './rocket-countdown/count.down.clock';
import { RocketPageComponent } from './rocket-countdown/rocket.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RocketPageComponent,
    RocketAnimationComponent,
    CountDownClockComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
