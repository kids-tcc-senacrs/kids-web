import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import {LoginService} from '../../services-internos/login.service';
import {UtilHttpService } from '../../services-internos/util-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-nao-cadastrado',
  templateUrl: './usuario-nao-cadastrado.component.html',
  styleUrls: ['./usuario-nao-cadastrado.component.css']
})

export class UsuarioNaoCadastradoComponent implements OnInit {

 constructor(private loginService: LoginService, private router: Router, private utilHttp:UtilHttpService) {
   if(this.loginService.getToken() === null || this.loginService.getToken() === undefined){
      this.router.navigate(['/login']);
    }
 }

 ngOnInit() {}

 onClickTipoFamiliar():void{
    let tipo = 'FAMILIAR'
    this.save(tipo);
  }

  onClickTipoCreche():void{
    let tipo = 'CRECHE'
    this.save(tipo);
  }
  
  logout():void{
	  this.loginService.logout();
  }

  private save(tipo:string):void{
    let nome = this.loginService.getNome();
    let email = this.loginService.getEmail();
    let usuario:any = {nome:nome,email:email,tipo:tipo};

    if(usuario.tipo === 'CRECHE'){
      usuario.ativo = true;
    }

    this.utilHttp.post(usuario).subscribe( data => this.router.navigate(['/home']),
                                                 error => this.router.navigate(['/home/servico-indisponivel']));
  } 

  classesBtnCreche(): any {
    let cssStyles = {'btn': true,
              'btn-social': true,
              'btn-facebook': true,
              'col-sm-offset-2': true,
              'col-md-offset-2': true,
              'col-lg-offset-3': true,
              'btn-lg':true,
              'col-xs-12 col-sm-4 col-md-4 col-lg-3' : true,
              'btn-customizado': true
};
  return cssStyles; 
  }

  classesBtnFamiliar(): any {
    let cssStyles = {'btn': true,
              'btn-social': true,
              'btn-google': true,
              'col-sm-offset-1': true,
              'col-md-offset-1': true,
              'col-lg-offset-1': true,
              'btn-lg':true,
              'col-xs-12 col-sm-4 col-md-4 col-lg-3' : true,
              'btn-customizado': true,
              'btn-familiar':true
            };
  return cssStyles; 
  }

}