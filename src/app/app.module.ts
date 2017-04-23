import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';
import { AgmCoreModule } from "angular2-google-maps/core";

import { AppComponent } from './app.component';
import { FoursquaresService } from './common/foursquares.service';
import { GeolocationService } from './common/geolocation.service';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';

const globalOptions = {
    apiEndPoint: 'https://api.foursquare.com/v2/venues/search?v=20161016&client_id=GAIF242BR5EOLB0FEPFQLNM2ZN0SHMUFMAEWJUIC13YKXTHD&client_secret=YWTXODR0IFO1VZJR2FZD4E1GBZ1PQ1ZLKFOWVRASYJO5Q4TT',
    googleKey:'AIzaSyC_GQr26OpoDYg_QJgL8QUPClxCquMIt0M'
};

@NgModule({
  declarations: [
    AppComponent,
    GooglemapsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC_GQr26OpoDYg_QJgL8QUPClxCquMIt0M",
      libraries: ["places"]
    }),
  ],
  providers: [
    FoursquaresService,
    GeolocationService, 
    { provide: 'global_options', useValue: globalOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
