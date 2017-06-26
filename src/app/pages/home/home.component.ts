import {Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services-internos/login.service';
import {UtilHttpService } from '../../services-internos/util-http.service';
import {Usuario} from '../../model/usuario';
import {Endereco} from '../../model/endereco';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  private usuario:Usuario = new Usuario(null,'','','','',false, new Endereco(null, '', '', ''));
  protected errorMessage: string = null;

  constructor(protected loginService: LoginService, protected router: Router,protected restUsuario:UtilHttpService) {
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
    this.restUsuario.get(email)
                    .subscribe( data => this.redirectPage(data),
                               error => this.redirectPageError(this.errorMessage = <any>error)
                              );
    
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

 }