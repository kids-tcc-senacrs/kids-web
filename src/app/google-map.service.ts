import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()
export class GoogleMapService {

	constructor(private http:Http) {}

	public getEndereco(cep:string):Observable<Response>{
		console.log('[KIDS] serviço google map ...');
		let url = environment.API_GOOGLE_MAP_CEP + cep + '&sensor=false';
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