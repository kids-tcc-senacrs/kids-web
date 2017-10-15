import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiRestGenericaService {

  private URL_DEFAULT:string =  environment.HOST_KIDS_CORE;
  
    constructor(private http:Http) {}

    public getById(api:string, id:number):Observable<Response>{
      console.log('[KIDS] consumindo API ' +  api  +  ' GET ...');	
      let url = this.URL_DEFAULT + api + id;
      return this.http.get(url).map(this.throwResponse).catch(this.handleError);
    }
    
    public save(api:string, obj:any):Observable<Response>{
      console.log('[KIDS] consumindo API ' +  api  +  ' POST ...');		
      let url = this.URL_DEFAULT + api; 
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      return this.http.post(url, obj, options).map(this.throwResponse).catch(this.handleError);
    }

    public upload(api:string, obj:any):Observable<Response>{
      console.log('[KIDS] consumindo API ' +  api  +  ' POST ...');		
      let url = this.URL_DEFAULT + api; 
      return this.http.post(url, obj).map(this.throwResponse).catch(this.handleError);
    }

    public delete(api:string, id:number):Observable<Response>{
      console.log('[KIDS] consumindo API' + api + ' DELETE ...');	
      let url = this.URL_DEFAULT + api + id; 
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      return this.http.delete(url, options).map(this.throwResponse).catch(this.handleError);
    }

    private throwResponse(res: Response){
      return res;
    }

    private handleError (res: Response) {
	    return Observable.throw(res);
  }
  
}