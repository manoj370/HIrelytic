import { HttpUrls } from './../shared/HttpUrls';
import { Injectable,Inject } from '@angular/core';
//import { ReferJob } from '../models/resume';
import { HttpClient } from '@angular/common/http';
//import { JobPosting, FunctionalArea, Department } from '../models/jobposting';
//import { hire } from '../models/user';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpHeaders,HttpParams } from '@angular/common/http';
//import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/Rx';
// import { Data } from '../tenant-login/tenant-login.component';
import { environment } from '../../environments/environment'
@Injectable()
export class QuestionBankService
{
    headers: Headers;
    options: RequestOptions;
    _baseUrl:any;
    requested : any;
    //dev
    //public downloadURL=`http://${this._window.location.hostname}`+environment.downloadURL;
    //prod
    //public downloadURL=`http://${this._window.location.hostname}:9090/jobplanet-admin/readTheExcelSheetForQuestionBankAndPersist`;
   constructor(private http: Http, @Inject(Window) private _window: Window)
   {
       this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
       this.headers.append('Access-Control-Allow-Origin', '*');

       this.options = new RequestOptions({ headers: this.headers });
       //dev url
       //this._baseUrl=`http://${this._window.location.hostname}`+environment._baseQbUrl;
       //prod url
       //this._baseUrl=`http://${this._window.location.hostname}:9090`;
   }

    // getSubjectList():Observable<any>
    // {
    //     let tenantId= sessionStorage.getItem('tenantId');
    //     return this.http.get(HttpUrls.GET_SUBJECT_LIST+'/'+tenantId).map((response: Response) => <any>response.json());
    // }
    // getTopicList(subject:any):Observable<any>
    // {
    //     let tenantId= sessionStorage.getItem('tenantId');
    //     return this.http.get(HttpUrls.GET_TOPIC_LIST+'/'+tenantId+'/'+subject).map((response: Response) => <any>response.json());
    // }
    // downloadFile()
    // {
    //     let tenantId= sessionStorage.getItem('tenantId');
    //     let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    //     headers.append('Access-Control-Allow-Origin', '*');
    //     let options = new RequestOptions({ headers: headers });

    //     return this.http.get(HttpUrls.DOWNLOAD_QUESTION_BANK,{

    //         headers: headers,
    //         responseType: ResponseContentType.Blob
    //     }).map(res => new Blob([res.json()],{ type: 'application/vnd.ms-excel' }));


    // }
    // getQuestionsList():Observable<any>
    // {
    //     const headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Access-Control-Allow-Origin', '*')
    //     const options = new RequestOptions({ headers: headers });
    //     // this.requested = new Data();
    //     this.requested.tenantId=sessionStorage.getItem('tenantId');
    //     //console.log(this.requested)
    //     return this.http.post(HttpUrls.GET_QUESTION_BANK_LIST,this.requested,options)
    //         .map((response: Response) => <any>response.json()).catch((error: any) => {
    //             return Observable.throw(error);

    //         });;

    // }


    // onlineExamUrl(id: number): Observable<any> {
    //     const candidate = id;
    //     return this.http.get(this._baseUrl + '/verify/' + candidate)
    //         .map((response: Response) => <any>response.json()).catch(this.handleError);
    // }
    // private handleError(error: Response) {
    //     //console.error(error);
    //     return Observable.throw(error.json().error || 'Server error');
    // }
    // getQuestionsForExam(examinerId:number):Observable<any> {

    //     return this.http.get(HttpUrls.GET_QUESTIONS+ examinerId).map((response: Response) => <any>response.json());
    //     }
    //     saveAllAnswers(finalData:any):Observable<any>
    //     {
    //         const headers = new Headers();
    //         headers.append('Content-Type', 'application/json');
    //         headers.append('Access-Control-Allow-Origin', '*')
    //         const options = new RequestOptions({ headers: headers });
    //         return this.http.post(HttpUrls.GET_QUESTION_FOR_EXAM,finalData,options).map((response: Response) => <any>response.json());
    //     }
}
