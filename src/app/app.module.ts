import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { FoursquaresService } from '../app/common/foursquares.service';
import { GeolocationService } from '../app/common/geolocation.service';

const globalOptions = {
    apiEndPoint: 'https://api.foursquare.com/v2/venues/search?v=20161016&client_id=GAIF242BR5EOLB0FEPFQLNM2ZN0SHMUFMAEWJUIC13YKXTHD&client_secret=YWTXODR0IFO1VZJR2FZD4E1GBZ1PQ1ZLKFOWVRASYJO5Q4TT',
    googleKey:'AIzaSyC_GQr26OpoDYg_QJgL8QUPClxCquMIt0M'
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot()
  ],
  providers: [
    FoursquaresService,
    GeolocationService, 
    { provide: 'global_options', useValue: globalOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
