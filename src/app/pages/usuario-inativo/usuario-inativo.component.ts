import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services-internos/login.service';
import {UtilHttpService } from '../../services-internos/util-http.service';
import {Usuario} from '../../model/usuario';

@Component({
  selector: 'app-usuario-inativo',
  templateUrl: './usuario-inativo.component.html',
  styleUrls: ['./usuario-inativo.component.css']
})
export class UsuarioInativoComponent implements OnInit {
  
  
  protected usuario:Usuario = null;
  protected errorMessage: string = null;

  constructor(protected loginService: LoginService, protected router: Router,protected utilHttp:UtilHttpService) {
    if(this.loginService.getToken() === null || this.loginService.getToken() === undefined){
      this.router.navigate(['/login']);
    }else{
      this.buscarUsuarioCadastrado(this.loginService.getEmail());      
    }
  }

  ngOnInit() {}
  private buscarUsuarioCadastrado(email:string):void{
    this.utilHttp.get(email)
                    .subscribe( data => this.usuario = data,
                               error => this.redirectPageError(this.errorMessage = <any>error)
                              );
  }

  private redirectPageError(erro:string):void{
    this.router.navigate(['/home/servico-indisponivel']);
  }  

}