import { Component, OnInit } from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';
import {Observable} from 'rxjs/Observable';
import { LoginService } from '../login.service';
import { RestUsuarioService } from '../rest-usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService, RestUsuarioService]
})
export class LoginComponent implements OnInit {

  private exibirTemplateUsuarioNaoPossuiCadastro: boolean = false;
  private exibirTemplateUsuarioTipoFamiliar: boolean = false;
  private exibirTemplateUsuarioTipoCreche: boolean = false;
  private autenticado: boolean = false;
  private usuario:any= null;
  
  constructor(private loginService: LoginService, private restUsuario:RestUsuarioService) {}

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
       if(this.loginService.getEmail() != null){
          this.restUsuario.getUsuario(this.loginService.getEmail())
                          .subscribe(data => this.usuario = data,
                                     error=> alert(error),);
          this.exibirTemplateUsuarioTipoFamiliar = this.usuario != null && 'FAMILIAR' === this.usuario.tipo;
          this.exibirTemplateUsuarioTipoCreche= this.usuario != null && 'CRECHE' === this.usuario.tipo;
          this.exibirTemplateUsuarioNaoPossuiCadastro = this.usuario != null && this.usuario.id === null;
          
          this.autenticado = this.usuario != null && this.loginService.getToken() != null ? true : false;
          
          console.log('this.exibirTemplateUsuarioTipoFamiliar........' + this.exibirTemplateUsuarioTipoFamiliar);
          console.log('this.exibirTemplateUsuarioTipoCreche..........' + this.exibirTemplateUsuarioTipoCreche);
          console.log('this.exibirTemplateUsuarioNaoPossuiCadastro...' + this.exibirTemplateUsuarioNaoPossuiCadastro);

          console.log('BUCETAAAAAAAAAAAAAAAAAAAA: ' + this.autenticado);


       }
    }
  }, 1000);
}

  logout():void{
    this.autenticado = false;
    this.loginService.logout();
  }

}