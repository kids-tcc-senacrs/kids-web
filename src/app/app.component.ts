import { Component,OnInit, NgZone} from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';
import { NgIf } from '@angular/common';
import { LoginService } from './login.service';
import { RestUsuarioService } from './rest-usuario.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css'], 
  providers:[AuthService, RestUsuarioService]
})
export class AppComponent implements OnInit {

private autenticado: boolean = false;
private usuario:any;
private nome:string;

constructor(private loginService: LoginService, private restUsuario:RestUsuarioService) {}

ngOnInit() {
  AppGlobals.GOOGLE_CLIENT_ID = '359998324820-m1dblqglo4c4v4qtbcat59mmma0fjb1d.apps.googleusercontent.com';  
}

classesBtnLogin(): any {
  let cssStyles = {'btn': true,'btn-lg': true,'btn-block': true,'btn-social': true,'btn-google': true,'col-md-offset-9': true,'btn-posicao': true};
  return cssStyles; 
}

login():void{
  console.log('[KIDS] iniciando autenticação com conta google ...');
  this.loginService.login();
  this.buscarUsuarioCadastrado();
}

private buscarUsuarioCadastrado():void{
	let timer = setInterval(() => { 
		if(this.isUsuarioAutenticado()){
			let email = this.loginService.getEmail();
			if(email != null){
				this.restUsuario.getUsuario(email).subscribe(usuario => this.usuario = usuario);
				this.autenticado = true;
				this.nome = this.loginService.getNome();
				clearInterval(timer);
			}
		}else{
			console.log('[KIDS] aguarde um momento, autenticando com conta google ...');
		}
	}, 1000);
}

private isUsuarioAutenticado():boolean{
  return this.loginService.getToken() != undefined && this.loginService.getToken() != null;
}  
  
}