import { AvisoDTO } from './../dto/aviso-dto';
import { AvisoVO } from './../vo/aviso-vo';
import { Usuario } from './../model/usuario';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AvisoService {

  private API : string = 'aviso/'
  private URL_DEFAULT:string =  environment.HOST_KIDS_CORE + this.API;

  constructor(private http:Http) {}

  public get(usuario:Usuario):Observable<AvisoVO[]>{
	console.log('[KIDS] consumindo API de aviso GET ...');	
	let url = this.URL_DEFAULT + usuario.id;
	return this.http.get(url).map(this.extractData).catch(this.handleError);
  }  
  
  public post(avisoDTO:AvisoDTO):Observable<Response>{
    console.log('[KIDS] consumindo API de aviso POST ...');	
    let url = this.URL_DEFAULT 
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, avisoDTO, options).map(this.throwResponse).catch(this.handleError);
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