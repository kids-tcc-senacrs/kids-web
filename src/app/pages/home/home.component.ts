import { AvisoVO } from './../../vo/aviso-vo';
import { AvisoService } from './../../services-internos/aviso.service';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services-internos/login.service';
import {UtilHttpService } from '../../services-internos/util-http.service';
import {Usuario} from '../../model/usuario';
import {Pessoa} from '../../model/pessoa';
import {Endereco} from '../../model/endereco';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  private usuario:Usuario = new Usuario(null,'','','',false, new Pessoa(null, '',new Endereco(null, '','','')));
  protected errorMessage: string = null;
  private rendarizarMenu:boolean = false;
  
  constructor(protected loginService: LoginService, 
               protected router: Router,
               protected restUsuario:UtilHttpService) {
    if(this.loginService.getToken() === null || this.loginService.getToken() === undefined){
      this.router.navigate(['/login']);
    } else {
      this.buscarUsuarioCadastrado(this.loginService.getEmail());      
    }
  }

   logout():void{
	  this.loginService.logout();
  }

  
  ngOnInit() {}
    
  private buscarUsuarioCadastrado(email:string):void{
   this.restUsuario.get(email).subscribe( data => this.redirectPage(data),error => this.redirectPageError(this.errorMessage = <any>error));
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

  public classesMenu():string{
		var x = document.getElementById("navDemo");
		if (x.className.indexOf("w3-show") == -1) {
			x.className += " w3-show";
		} else { 
			x.className = x.className.replace(" w3-show", "");
		}
    return '';
  }

  classesNavDemo(): any {
    
    let cssStyles = null;

    if(this.rendarizarMenu){
      this.rendarizarMenu = false;
      cssStyles = {'w3-bar-block': false,'w3-theme-d2': false,'w3-hide': false, 'w3-hide-large': false, 'w3-large': false,'w3-hide-medium' : false};  
    }else{
      this.rendarizarMenu = true;
      cssStyles = {'w3-bar-block': true,'w3-theme-d2': true,'w3-hide': true, 'w3-hide-large': true, 'w3-large': true,'w3-hide-medium' : true};  
    }
    
    return cssStyles; 
  }

public exibirMenuFamiliares():boolean{
  return !(this.usuario === null || this.usuario === undefined || this.usuario.tipo == 'FAMILIAR');
}

public exibirMenuAvisos():boolean{
  return !(this.usuario === null || this.usuario === undefined || this.usuario.tipo == 'FAMILIAR');
}

 }