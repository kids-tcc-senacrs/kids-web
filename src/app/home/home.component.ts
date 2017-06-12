import { Component, OnInit, Renderer } from '@angular/core';
import { LoginService } from '../login.service';
import { RestUsuarioService } from '../rest-usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RestUsuarioService]
})
export class HomeComponent implements OnInit {

  private nome:string;
  private foto:string;
  private hiddenComponentUsuarioNaoCadastrado: boolean = true;
  private hiddenTemplateUsuarioInativo: boolean = true;
  private usuario:any= {ativo:true};

  constructor(private loginService: LoginService, private restUsuario:RestUsuarioService) { 
    this.nome = this.loginService.getNome();
    this.foto = this.loginService.getImageURL();
    this.restUsuario.getUsuario(this.loginService.getEmail()).subscribe(data => this.usuario = data, error=> alert(error),);
  }

  ngOnInit() {}
  
  ngDoCheck() {
    this.hiddenComponentUsuarioNaoCadastrado =  undefined != this.usuario.id;
    this.hiddenTemplateUsuarioInativo = this.usuario.ativo;
  }

}