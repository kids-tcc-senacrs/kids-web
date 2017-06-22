import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {Router} from '@angular/router';
import {UtilHttpService} from '../util-http.service';

@Component({
  selector: 'app-usuario-inativo',
  templateUrl: './usuario-inativo.component.html',
  styleUrls: ['./usuario-inativo.component.css']
})
export class UsuarioInativoComponent implements OnInit {
  
  
  protected usuario:any = null;
  protected errorMessage: string = null;
  private usuarioJson: string = null;

  constructor(protected loginService: LoginService, protected router: Router,protected utilHttp:UtilHttpService) {
    if(this.loginService.getToken() === null || this.loginService.getToken() === undefined){
      this.router.navigate(['/pagina-acesso-negado']);
    }else{
      this.buscarUsuarioCadastrado(this.loginService.getEmail());      
    }
  }

  ngOnInit() {}

  private buscarUsuarioCadastrado(email:string):void{
    this.utilHttp.getUsuario(email)
                    .subscribe( data => this.usuarioJson = JSON.stringify(data),
                               error => this.redirectPageError(this.errorMessage = <any>error)
                              );
    
  }

  private redirectPageError(erro:string):void{
    this.router.navigate(['/home/servico-indisponivel']);
  }  

}