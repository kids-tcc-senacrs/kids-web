import { CrecheVO } from './../vo/creche-vo';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { Usuario } from './../model/usuario';
import { Creche } from './../model/creche';

@Injectable()
export class CrecheService {

private API : string = 'creche/'
private URL_REST_USUARIO:string =  environment.HOST_KIDS_CORE + this.API;

constructor(private http:Http) {}

public get(usuario:Usuario):Observable<Creche>{
  console.log('[KIDS] consumindo API de creches POST ...');	
  let url = this.URL_REST_USUARIO; 
  let headers = new Headers({ 'Content-Type': 'application/json'});
  let options = new RequestOptions({ headers: headers });
  return this.http.post(url, usuario, options).map(this.extractData).catch(this.handleError);
}


public getPorFamiliar(usuario:Usuario):Observable<CrecheVO[]>{
  console.log('[KIDS] consumindo API de creches GET ...');	
  let url = this.URL_REST_USUARIO + usuario.id; 
  let headers = new Headers({ 'Content-Type': 'application/json'});
  let options = new RequestOptions({ headers: headers });
  return this.http.get(url, options).map(this.extractData).catch(this.handleError);
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