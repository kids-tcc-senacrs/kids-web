import { ComunicacaoVO } from './../vo/comunicacao-vo';
import { ComunicacaoDTO } from './../dto/comunicacao-dto';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ComunicacaoService {

  private API : string = 'comunicacao/'
  private URL_DEFAULT:string =  environment.HOST_KIDS_CORE + this.API;

  constructor(private http:Http) {}  

  public post(comunicacao:ComunicacaoDTO):Observable<Response>{
    console.log('[KIDS] consumindo API de comunicacao POST ...');	
    let url = this.URL_DEFAULT 
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, comunicacao, options).map(this.throwResponse).catch(this.handleError);
  }

  public get(usuarioId:number, familiar:boolean):Observable<ComunicacaoVO[]>{
    console.log('[KIDS] consumindo API de comunicacao GET ...');	
    let url = this.URL_DEFAULT + usuarioId + '/' + familiar;
    console.log('URL:' + url);
    return this.http.get(url).map(this.extractData).catch(this.handleError);
  }  

  private throwResponse(res: Response){
  	return res;
  }

  private extractData(res: Response) {
    if(res.status == 200 || res.status == 201){
      return res.json();
   }
  }

  private handleError (res: Response) {
    return Observable.throw(res);
  }

}