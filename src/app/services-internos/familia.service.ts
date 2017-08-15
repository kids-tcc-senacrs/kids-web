import { CriancaFamiliaVO } from './../vo/crianca-familia-vo';
import { environment } from './../../environments/environment';
import { CriancaFamilia } from './../model/crianca-familia';
import { Crianca } from './../model/crianca';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()
export class FamiliaService {

private API : string = 'familia/'
private URL_DEFAULT:string =  environment.HOST_KIDS_CORE + this.API;

constructor(private http:Http) {}

public get(crianca:Crianca):Observable<CriancaFamilia[]>{
  console.log('[KIDS] consumindo API de familia GET ...');	
  let url = this.URL_DEFAULT + crianca.id; 
  let headers = new Headers({ 'Content-Type': 'application/json'});
  let options = new RequestOptions({ headers: headers });
  return this.http.get(url, options).map(this.extractData).catch(this.handleError);
}


public post(vo:CriancaFamiliaVO):Observable<CriancaFamilia[]>{
	console.log('[KIDS] consumindo API de familia POST ...');	
	let url = this.URL_DEFAULT; 
	let headers = new Headers({ 'Content-Type': 'application/json'});
	let options = new RequestOptions({ headers: headers });
	return this.http.post(url, vo, options).map(this.extractData).catch(this.handleError);
}

public delete(criancaFamiliaId:number):Observable<Response>{
	console.log('[KIDS] consumindo API de familia DELETE ...');	
	let url = this.URL_DEFAULT + criancaFamiliaId; 
	let headers = new Headers({ 'Content-Type': 'application/json'});
	let options = new RequestOptions({ headers: headers });
	return this.http.delete(url, options).map(this.extractResponse).catch(this.handleError);
}

private extractData(res: Response) {
	if(res.status == 200 || res.status == 201){
		return res.json();
	}
}

private extractResponse(res: Response) {
	return res;
}

private handleError (res: Response) {
	return Observable.throw(res);
}

}