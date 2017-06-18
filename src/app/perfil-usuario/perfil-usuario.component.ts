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
  private usuario:any = null;

  constructor(private loginService: LoginService) { 
    this.foto = this.loginService.getImageURL();
    this.nome = this.loginService.getNome();
    this.email = this.loginService.getEmail();
  }

  ngOnInit() {
    let contador = 0;
    let timer = setInterval(() => { 
        this.usuario  = this.loginService.getUsuario();
        if(contador >= 5){
          clearInterval(timer);
        }
        contador++;
      }
    , 1000)
  }

}