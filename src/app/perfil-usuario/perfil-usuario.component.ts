import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  private foto:string = null;
  private nome:string = null;
  private email:string = null;

  constructor(private loginService: LoginService) { 
    this.foto = this.loginService.getImageURL();
    this.nome = this.loginService.getNome();
    this.email = this.loginService.getEmail();
  }

  ngOnInit() {}

}