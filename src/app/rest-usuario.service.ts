import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';


@Injectable()
export class RestUsuarioService {

	private API : string = 'usuario/'
	private URL_REST_USUARIO:string =  environment.HOST_KIDS_CORE + this.API;

	constructor(private http:Http) {}

	public getUsuario(email:string):Observable<Response>{
		console.log('[KIDS] consultando serviço API de usuarios ...');	
		let url = this.URL_REST_USUARIO + email; 
		return this.http.get(url)
						.map(this.extractData)
				 	  .catch(this.handleError);
					
	}

	private extractData(res: Response) {
		if(res.status == 200){
			return res.json();
		}else{
			console.log('HTTP CODE' + res.status);
		}
	}

	private handleError (error: Response | any) {
		return Observable.throw('Serviço temporariamente indisponível!');
	}

}