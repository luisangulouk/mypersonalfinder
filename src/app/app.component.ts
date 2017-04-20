import { Component, OnInit, ViewChild } from '@angular/core';
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
  public currentLocation={ 
    latitude:0, 
    longitude:0 
  }
  public errorMessage:any;
  public location:any;
  public staticMap:string='';
  public twitter_url:string='https://twitter.com/intent/tweet';
  public selectedVenue={
    name:'',
    map:''
  }
  public user_message:string='';
  public geolocation:boolean=true;

  constructor(public FoursquaresService: FoursquaresService, 
              public GeolocationService: GeolocationService){}

  ngOnInit(){

  }

  getLocationOnMap(longitude:number, latitude:number, size:string):string{
    let staticMap = 'https://maps.googleapis.com/maps/api/staticmap';
    staticMap += `?center=${latitude},${longitude}&size=${size}`;
    staticMap += '&zoom=14&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794';
    staticMap += '&markers=color:green%7Clabel:G%7C40.711614,-74.012318';
    staticMap += '&markers=color:red%7Clabel:C%7C40.718217,-73.998284';
    staticMap += '&key=AIzaSyC_GQr26OpoDYg_QJgL8QUPClxCquMIt0M';

    return staticMap;
  }

  findMyLocation(){
      this.GeolocationService.getLocation({enableHighAccuracy:false}).subscribe(
      res=>{
        this.geolocation=true;
        this.currentLocation.longitude = res.coords.longitude;
        this.currentLocation.latitude = res.coords.latitude;
        this.staticMap = this.getLocationOnMap(this.currentLocation.longitude,this.currentLocation.latitude,'800x300');
        this.findPlacesNearBy({longitude:this.currentLocation.longitude,latitude:this.currentLocation.latitude});        
      },
      error=>{
        console.log(error);
        this.geolocation=false;
        this.user_message=error;
      }
    );
  }

  findPlacesNearBy(place):void{

    if(place.longitude){
      this.FoursquaresService.getPlacesByLL(place.longitude, place.latitude).subscribe(
        res => {
          this.places=res.response.venues;
        }
      );
    }else{
      this.FoursquaresService.getPlacesByName(place.name).subscribe(
        res => {
          this.places=res.response.venues;
        }
      );      
    }
  }

  followOnTwitter(twitter_acc){
    this.twitter_url += '?screen_name=@' + twitter_acc;
  }

  public showChildModal(name,lat,lng):void {
    this.selectedVenue.name=name;
    this.selectedVenue.map=this.getLocationOnMap(lng,lat,'250x400');
    this.mapContainer.show();
  }
 
  public hideChildModal():void {
    this.mapContainer.hide();
  }

}
