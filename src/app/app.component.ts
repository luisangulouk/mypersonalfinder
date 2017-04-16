import { Component, OnInit, OnChanges } from '@angular/core';
import { FoursquaresService } from '../app/common/foursquares.service';
import { GeolocationService } from '../app/common/geolocation.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public places:any;
  public currentLocation={ 
    latitude:0, 
    longitude:0 
  }
  public errorMessage:any;
  public location:any;
  public staticMap:string='https://maps.googleapis.com/maps/api/staticmap';

  constructor(public FoursquaresService: FoursquaresService, 
              public GeolocationService: GeolocationService){}

  ngOnInit(){

    this.GeolocationService.getLocation({enableHighAccuracy:false}).subscribe(
      res=>{
        this.currentLocation.longitude = res.coords.longitude;
        this.currentLocation.latitude = res.coords.latitude;
        this.getLocationOnMap(this.currentLocation.longitude,this.currentLocation.latitude);
      }
    );
  }

  getLocationOnMap(longitude:number, latitude:number):void{
    this.staticMap += `?center=${latitude},${longitude}`;
    this.staticMap += '&zoom=14&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794';
    this.staticMap += '&markers=color:green%7Clabel:G%7C40.711614,-74.012318';
    this.staticMap += '&markers=color:red%7Clabel:C%7C40.718217,-73.998284';
    this.staticMap += '&key=AIzaSyC_GQr26OpoDYg_QJgL8QUPClxCquMIt0M';
  }

  findPlacesNearBy(longitude:number, latitude:number):void{

    console.log(longitude,latitude);

    this.FoursquaresService.getPlaces(longitude, latitude).subscribe(
      res => {
        console.log(res);
        this.places=res.response.venues}
    );

  }

}
