import { DiarioDTO } from './../dto/diario-dto';
import { Observable } from 'rxjs';
import { DiarioVO } from './../vo/diario-vo';
import { Http, Response } from '@angular/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class DiarioService {

private API : string = 'diario/'
private URL_DEFAULT:string =  environment.HOST_KIDS_CORE + this.API;

constructor(private http:Http) {}

public get(dto:DiarioDTO, tipoUsuario:string, usuarioId:number):Observable<DiarioVO[]>{
	console.log('[KIDS] consumindo API de diarios GET ...');	
	let url = null;
	if(tipoUsuario === 'CRECHE'){
		url = this.URL_DEFAULT + dto.crecheId + '/' + dto.tipo 
	}else{
        url = this.URL_DEFAULT + usuarioId + '/' + dto.tipo + '/' + true
	}
	return this.http.get(url).map(this.extractData).catch(this.handleError);
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