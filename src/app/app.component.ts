import { Component,OnInit, NgZone} from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';
import {Observable} from 'rxjs/Observable';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css'], 
  providers:[AuthService]
})
export class AppComponent implements OnInit {

private autenticado: boolean = false

constructor(private loginService: LoginService) {}

ngOnInit() {
  AppGlobals.GOOGLE_CLIENT_ID = '359998324820-m1dblqglo4c4v4qtbcat59mmma0fjb1d.apps.googleusercontent.com';  
}

classesBtnLogin(): any {
  let valores = {'btn': true,'btn-lg': true,'btn-block': true,'btn-social': true,'btn-google': true,'col-md-offset-9': true,'btn-posicao': true}
  return valores;
}

login():void{
  console.log('[KIDS] iniciando autenticação com conta google...');
  this.loginService.login();
  setInterval(() => { 
    if(!this.autenticado){
       this.autenticado = this.loginService.getToken() == null ? false : true;
    }
  }, 1000);
}

logout():void{
  this.autenticado = false;
  this.loginService.logout();
}

onclickPerfil():void{}

}