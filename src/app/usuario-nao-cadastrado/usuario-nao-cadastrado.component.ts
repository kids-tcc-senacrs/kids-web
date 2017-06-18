import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HomeComponent } from '../home/home.component';
import { RestUsuarioService } from '../rest-usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuario-nao-cadastrado',
  templateUrl: './usuario-nao-cadastrado.component.html',
  styleUrls: ['./usuario-nao-cadastrado.component.css']
})

export class UsuarioNaoCadastradoComponent extends HomeComponent {

 constructor(loginService: LoginService, router: Router, restUsuario:RestUsuarioService) {
    super(loginService,router,restUsuario);
 }

 ngOnInit() {}

 onClickTipoFamiliar():void{
    let nome = this.loginService.getNome();
    let email = this.loginService.getEmail();
    let tipo = 'FAMILIAR'
    let usuario:any = {nome:nome,email:email,tipo:tipo};
    this.restUsuario.saveUsuario(usuario)
                                .subscribe(data => this.router.navigate(['/home/usuario-inativo']),
 										                       error => this.errorMessage = <any>error);
  }

  onClickTipoCreche():void{
    let nome = this.loginService.getNome();
    let email = this.loginService.getEmail();
    let tipo = 'CRECHE'
    let usuario:any = {nome:nome,email:email,tipo:tipo};
    
    this.restUsuario.saveUsuario(usuario)
                                .subscribe( data => this.router.navigate(['/home/usuario-ativo']),
                                           error => this.errorMessage = <any>error);
  }

}