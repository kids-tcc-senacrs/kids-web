import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { UtilHttpService } from './util-http.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Usuario } from './../model/usuario';
import { Crianca } from './../model/crianca';

@Injectable()
export class CriancaService {

private API : string = 'crianca/'
private URL_REST_USUARIO:string =  environment.HOST_KIDS_CORE + this.API;

constructor(private http:Http) {}

public get(usuario:Usuario):Observable<Crianca[]>{
	console.log('[KIDS] consumindo API de criancas GET ...');	
	let url = this.URL_REST_USUARIO + usuario.id; 
	return this.http.get(url).map(this.extractData).catch(this.handleError);
}



public post(crianca:Crianca):Observable<Response>{
	console.log('[KIDS] consumindo API de criancas POST ...');	
	let url = this.URL_REST_USUARIO; 
	let headers = new Headers({ 'Content-Type': 'application/json'});
	let options = new RequestOptions({ headers: headers });
	return this.http.post(url, crianca, options).map(this.throwResponse).catch(this.handleError);
}



private extractData(res: Response) {
	if(res.status == 200 || res.status == 201){
		return res.json();
	}
}



private handleError (res: Response) {
	return Observable.throw(res);
}



private throwResponse(res: Response){
	return res;
}

}