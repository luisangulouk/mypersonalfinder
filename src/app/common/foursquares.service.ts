import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs.operators';

@Injectable()
export class FoursquaresService {

    public result = {};

    constructor(
        private http: Http,
        @Inject('global_options') private options: any) { }

    getPlacesByLL(longitude:number,latitude:number) {

        let url = `${this.options.apiEndPoint}&ll=${latitude}%2C${longitude}&query=coffee&intent=checkin`;
        return this.http.get(url)
            .map(this.result = this.extractData)
            .catch(this.handleError);
    }

    getPlacesByName(name:string) {

        let url = `${this.options.apiEndPoint}&near=${name}&query=coffee%2Cpub%2Cshop&redius=200&intent=browse`;
        return this.http.get(url)
            .map(this.result = this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(response: any) {
        console.error(response);
        return Observable.throw(response);
    }
}
