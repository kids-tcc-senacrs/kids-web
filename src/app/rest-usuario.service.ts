import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestUsuarioService {

  private URL_REST_USUARIO:string = 'http://localhost:8080/usuario/';

  constructor(private http:Http) {}

   public getUsuario(email:string):any  {
    let url = this.URL_REST_USUARIO + email; 
   return this.http.get(url).map(res => res.json());
  }

}