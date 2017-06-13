import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Usuario} from './model/Usuario';


@Injectable()
export class RestUsuarioService {

  private URL_REST_USUARIO:string = 'http://localhost:8080/usuario/';

  constructor(private http:Http) {}

   public getUsuario(email:string):Observable<Response>  {
   
   let url = this.URL_REST_USUARIO + email; 
   
   return this.http.get(url)
                   .map(res    => res.json())
                   .catch(erro => {throw new Error('cuuuuuuuuuuuuuuuuu');});
  }

}