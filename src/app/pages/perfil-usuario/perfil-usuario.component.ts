import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../model/Usuario';
import {LoginService} from '../../services-internos/login.service';
import {UtilHttpService } from '../../services-internos/util-http.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  private foto:string = null;
  private nome:string = null;
  private email:string = null;
  private usuario:Usuario = null;

  constructor(private loginService: LoginService,  private utilHttp: UtilHttpService) { 
    this.foto = this.loginService.getImageURL();
    this.nome = this.loginService.getNome();
    this.email = this.loginService.getEmail();
  }

  ngOnInit() {
    this.utilHttp.get(this.loginService.getEmail())
                     .subscribe( data => this.usuario =  data);
  }

  private redirectPage(usuario:Usuario):void{
    this.usuario = usuario;
  }
  
}