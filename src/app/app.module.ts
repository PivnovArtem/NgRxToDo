import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActionReducer, StoreModule} from '@ngrx/store';

import { AppComponent } from './app.component';
import { CarsFormComponent } from './cars-form/cars-form.component';
import { CarComponent } from './car/car.component';
import { carsReducer } from './redux/cars.reducer';
import {CarsService} from './cars.service';
import {HttpModule} from '@angular/http';
import {EffectsModule} from '@ngrx/effects';
import {CarsEffect} from './redux/cars.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { storeLogger } from 'ngrx-store-logger';
import { AppState } from './redux/app.state';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';
import {DragDropModule} from 'primeng/dragdrop';
import {PanelModule} from 'primeng/panel';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';


export function logger(reducer: ActionReducer<AppState>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];


@NgModule({
  declarations: [
    AppComponent,
    CarsFormComponent,
    CarComponent
  ],
  imports: [
    StoreModule.forRoot({carPage: carsReducer},
      {metaReducers}
      ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    BrowserModule,
    AccordionModule,
    DragDropModule,
    PanelModule,
    FormsModule,
    TableModule,
    BrowserAnimationsModule,
    HttpModule,
    EffectsModule.forRoot([CarsEffect]),
  ],
  providers: [CarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
