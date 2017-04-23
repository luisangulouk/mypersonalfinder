import { Component, OnInit, ViewChild, Input, EventEmitter } from '@angular/core';
import { FoursquaresService } from '../app/common/foursquares.service';
import { GeolocationService } from '../app/common/geolocation.service';
import { Observable } from 'rxjs/Observable';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('mapContainer') public mapContainer: ModalDirective;
  public places:any;
  public coords={lat:0,lng:0};
  public errorMessage:any;
  public twitter_url:string='https://twitter.com/intent/tweet';
  public selectedVenue={name:'',map:''};

  constructor(public FoursquaresService: FoursquaresService){}

  ngOnInit(){}

  getLocationOnMap(longitude:number, latitude:number, size:string):string{
    let staticMap = 'https://maps.googleapis.com/maps/api/staticmap';
    staticMap += `?center=${latitude},${longitude}&size=${size}`;
    staticMap += '&zoom=14&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794';
    staticMap += '&markers=color:green%7Clabel:G%7C40.711614,-74.012318';
    staticMap += '&markers=color:red%7Clabel:C%7C40.718217,-73.998284';
    staticMap += '&key=AIzaSyC_GQr26OpoDYg_QJgL8QUPClxCquMIt0M';

    return staticMap;
  }

  findPlacesNearBy():void{
    this.FoursquaresService.getPlacesByLL(this.coords.lng, this.coords.lat).subscribe(
      res => {
        this.places=res.response.venues;
      }
    );
  }

  getMapLocation(coords){
    this.coords = coords;
  }

  followOnTwitter(twitter_acc){
    this.twitter_url += '?screen_name=@' + twitter_acc;
  }

  public showChildModal(name,lat,lng):void {
    this.selectedVenue.name=name;
    this.selectedVenue.map = this.getLocationOnMap(lng,lat,'250x400');
    this.mapContainer.show();
  }
 
  public hideChildModal():void {
    this.mapContainer.hide();
  }

}
