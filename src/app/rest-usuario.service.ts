import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';


@Injectable()
export class RestUsuarioService {

	private URL_REST_USUARIO:string = 'http://localhost:8080/usuario/';

	constructor(private http:Http) {}

	public getUsuario(email:string):Observable<Response>{
		console.log('[KIDS] consultando serviço API de usuarios ...');	
		let url = this.URL_REST_USUARIO + email; 
		return this.http.get(url)
						.map((response:Response) => response.json())
						.do(data => console.log(JSON.stringify(data)))
						.catch(this.error);
	}

	private error(error:Response){
		let message = error.status;
		return Observable.throw(message);
	} 
	
}