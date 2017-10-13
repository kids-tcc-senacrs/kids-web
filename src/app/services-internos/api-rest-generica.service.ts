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

    public getById(api:string, obj:number):Observable<Response>{
      console.log('[KIDS] consumindo API ' +  api  +  ' GET ...');	
      let url = this.URL_DEFAULT + api + obj;
      return this.http.get(url).map(this.throwResponse).catch(this.handleError);
    }  

    private throwResponse(res: Response){
      return res;
    }

    private handleError (res: Response) {
	    return Observable.throw(res);
  }
  
}