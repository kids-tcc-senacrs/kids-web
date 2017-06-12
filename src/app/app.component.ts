import { Component,OnInit, NgZone} from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';
import { NgIf } from '@angular/common';
import {Observable} from 'rxjs/Observable';
import { LoginService } from './login.service';
import { RestUsuarioService } from './rest-usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css'], 
  providers:[AuthService, RestUsuarioService]
})
export class AppComponent implements OnInit {

private autenticado: boolean = false;
private usuario:any= {};

constructor(private loginService: LoginService, private restUsuario:RestUsuarioService) {}

ngOnInit() {
  AppGlobals.GOOGLE_CLIENT_ID = '359998324820-m1dblqglo4c4v4qtbcat59mmma0fjb1d.apps.googleusercontent.com';  
}

classesBtnLogin(): any {
  let cssStyles = {'btn': true,'btn-lg': true,'btn-block': true,'btn-social': true,'btn-google': true,'col-md-offset-9': true,'btn-posicao': true};
  return cssStyles; 
}

login():void{
  console.log('[KIDS] iniciando autenticação com conta google...');
  this.autenticado = false;
  setInterval(() => { 
    if(!this.autenticado){
       if(this.loginService.getEmail() != null){
          this.restUsuario.getUsuario(this.loginService.getEmail()).subscribe(data => this.usuario = data,error=> alert(error),);
       }
       this.autenticado = this.loginService.getToken() != null;
    }
  }, 3000);
}

}