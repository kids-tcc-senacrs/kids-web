import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Usuario} from './../model/usuario';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';


@Injectable()
export class UtilHttpService {

	private API : string = 'usuario/'
	private URL_REST_USUARIO:string =  environment.HOST_KIDS_CORE + this.API;

	constructor(private http:Http) {}

	public get(email:string):Observable<Usuario>{
		console.log('[KIDS] consumindo API de usuarios GET ...');	
		let url = this.URL_REST_USUARIO + email; 
		let headers = new Headers({ 'Content-Type': 'application/json', 
									'Access-Control-Allow-Origin' : '*', 									
									'Access-Control-Allow-Methods' : '*',
								    'Access-Control-Allow-Credentials' : true});
  		let options = new RequestOptions({ headers: headers });
		return this.http.get(url, options)
						.map(this.extractData)
				 	  .catch(this.handleError);
	}



	public post(usuario:Usuario):Observable<Response>{
		console.log('[KIDS] consumindo API de usuarios POST ...');	
		let url = this.URL_REST_USUARIO; 
		let headers = new Headers({ 'Content-Type': 'application/json'});
  		let options = new RequestOptions({ headers: headers });

		return this.http.post(url, usuario, options)
						.map(this.throwResponse)
				 	  .catch(this.handleError);
	}



	public put(usuario:Usuario):Observable<Response>{
		console.log('[KIDS] consumindo API de usuarios PUT ...');	
		let url = this.URL_REST_USUARIO 
		let headers = new Headers({ 'Content-Type': 'application/json'});
  		let options = new RequestOptions({ headers: headers });
	    return this.http.put(url, usuario, options)
						.map(this.throwResponse)
				 	  .catch(this.handleError);
	}



	private extractData(res: Response) {
		if(res.status == 200 || res.status == 201){
			return res.json();
		}
	}

	private throwResponse(res: Response){
		return res;
	}

	private handleError (res: Response) {
		return Observable.throw(res);
	}
	
}