import { AvisoVO } from './../../vo/aviso-vo';
import { UtilHttpService } from './../../services-internos/util-http.service';
import { Endereco } from './../../model/endereco';
import { Pessoa } from './../../model/pessoa';
import { Usuario } from './../../model/usuario';
import { AvisoService } from './../../services-internos/aviso.service';
import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services-internos/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuario-ativo',
  templateUrl: './usuario-ativo.component.html',
  styleUrls: ['./usuario-ativo.component.css']
})
export class UsuarioAtivoComponent implements OnInit {

  private nome:string = null;
  private usuario:Usuario = new Usuario(null,'','','',false, new Pessoa(null, '',new Endereco(null, '','','')));
  protected errorMessage: string = null;
  private avisos:AvisoVO[] = [];

  constructor(private loginService: LoginService,private router: Router, private avisoService:AvisoService, private usuarioService:UtilHttpService) { 
    this.nome = this.loginService.getNome();
    if(this.loginService.getToken() === null || this.loginService.getToken() === undefined){
      this.router.navigate(['/login']);
    } else {
      this.buscarUsuarioCadastrado(this.loginService.getEmail());      
    }
  }
  
  ngOnInit() {
    let timer = setInterval(() => { 
      if(this.usuario !== null && this.usuario !== undefined){
        if(this.usuario.tipo === 'FAMILIAR'){
          this.avisoService.get(this.usuario).subscribe( data => this.avisos =  data,error => this.redirectPageError(this.errorMessage = <any>error));         
        }
        clearInterval(timer);
      }
    }, 1000);    
  }

  private buscarUsuarioCadastrado(email:string):void{
   this.usuarioService.get(email).subscribe( data => this.redirectPage(data),error => this.redirectPageError(this.errorMessage = <any>error));
  }

  private redirectPage(usuario:any):void{
    this.usuario = usuario;
    if(this.usuario === null || this.usuario === undefined){
      this.router.navigate(['/usuario-nao-cadastrado']);
    }else if(this.usuario.ativo){
       this.router.navigate(['/home/usuario-ativo']);
    }else if(!this.usuario.ativo){
       this.router.navigate(['/home/usuario-inativo']);
    }
  }
  
  private redirectPageError(erro:string):void{
    this.router.navigate(['/home/servico-indisponivel']);
  }  

 classesTableLine(tipo:string): any {
    let cssStyles = {};
    if(tipo === 'INFORMACAO'){
      cssStyles = {'fa': true, 'fa-info-circle':true, 'aviso-informacao':true};
    }else{
      cssStyles = {'fa': true, 'fa-times-circle':true, 'aviso-cancelamento':true};
    }
  return cssStyles; 
}

}