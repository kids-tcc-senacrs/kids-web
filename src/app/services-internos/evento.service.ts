import { RespostaEventoDTO } from './../dto/resposta-evento-dto';
import { EventoDTO } from './../dto/evento-dto';
import { EventoVO } from './../vo/evento-vo';
import { Usuario } from './../model/usuario';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class EventoService {

  private API : string = 'evento/'
  private URL_DEFAULT:string =  environment.HOST_KIDS_CORE + this.API;

  constructor(private http:Http) {}

  public get(usuario:Usuario, emAberto:boolean):Observable<EventoVO[]>{
	console.log('[KIDS] consumindo API de evento GET ...');	
	let url = this.URL_DEFAULT + usuario.id + '/' + emAberto;
	return this.http.get(url).map(this.extractData).catch(this.handleError);
  }  

  public getEventosByCreche(usuario:Usuario):Observable<EventoVO[]>{
	console.log('[KIDS] consumindo API de evento GET ...');	
	let url = this.URL_DEFAULT + usuario.id;
	return this.http.get(url).map(this.extractData).catch(this.handleError);
  }  

  public put(eventoDTO:EventoDTO):Observable<Response>{
    console.log('[KIDS] consumindo API de evento PUT ...');	
    let url = this.URL_DEFAULT 
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(url, eventoDTO, options).map(this.throwResponse).catch(this.handleError);
  } 

  public post(eventoDTO:EventoDTO):Observable<Response>{
    console.log('[KIDS] consumindo API de evento POST ...');	
    let url = this.URL_DEFAULT 
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, eventoDTO, options).map(this.throwResponse).catch(this.handleError);
  } 

  public postResposta(resposta:RespostaEventoDTO):Observable<Response>{
    console.log('[KIDS] consumindo API de resposta POST ...');	
    let url = environment.HOST_KIDS_CORE + 'resposta/'
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, resposta, options).map(this.throwResponse).catch(this.handleError);
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