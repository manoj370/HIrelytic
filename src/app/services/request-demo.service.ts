import { Injectable } from '@angular/core';
import { HttpUrls } from './../shared/HttpUrls';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { DataclientService } from './dataclient.service';
@Injectable({
  providedIn: 'root'
})
export class RequestDemoService {

  constructor(private _http: Http,private dataClient:DataclientService) { }
  postRequestForDemo(demoObj) {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // const options = new RequestOptions({ headers: headers });
    // return this._http.post(HttpUrls.POST_REQUEST_DEMO ,demoObj)
}
getViewRequestDemo()
{
   return this.dataClient.get(HttpUrls.GET_REQUEST_DEMO);
}
}
