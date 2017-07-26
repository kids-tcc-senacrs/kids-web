import { Usuario } from './../model/usuario';
import { Crianca } from './../model/crianca';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()
export class CriancaService {

  private API : string = 'crianca/'
	private URL_REST_USUARIO:string =  environment.HOST_KIDS_CORE + this.API;

  constructor(private http:Http) {}

  public get(usuario:Usuario):Observable<Crianca[]>{
		console.log('[KIDS] consumindo API de criancas GET ...');	
		let url = this.URL_REST_USUARIO; 
		let headers = new Headers({ 'Content-Type': 'application/json'});
  	let options = new RequestOptions({ headers: headers });
		
    return this.http.post(url, usuario, options)
						.map(this.extractData)
				 	  .catch(this.handleError);
	}

  private extractData(res: Response) {
    console.log('HTTP STATUSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS' + res.status);
		if(res.status == 200 || res.status == 201){
			return res.json();
		}else{
			console.log('HTTP CODE NAO ESPERADO' + res.status);
		}
	}

	private handleError (res: Response) {
		return Observable.throw(res);
	}

}