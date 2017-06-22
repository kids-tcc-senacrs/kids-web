import {Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';
import {UtilHttpService } from '../util-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  protected usuario:any = null;
  protected nome:string = null;
  protected errorMessage: string = null;

  constructor(protected loginService: LoginService, protected router: Router,protected restUsuario:UtilHttpService) {
    if(this.loginService.getToken() === null || this.loginService.getToken() === undefined){
      this.router.navigate(['/pagina-acesso-negado']);
    }else if(this.usuario === null || this.usuario === undefined){
      this.buscarUsuarioCadastrado(this.loginService.getEmail());      
    }
  }

   logout():void{
	  this.loginService.logout();
  }

  
  ngOnInit() {}

  private buscarUsuarioCadastrado(email:string):void{
    this.restUsuario.getUsuario(email)
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