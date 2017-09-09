import { AvisoService } from './../../services-internos/aviso.service';
import { AvisoDTO } from './../../dto/aviso-dto';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Creche } from './../../model/creche';
import { CrecheService } from './../../services-internos/creche.service';
import { LoginService } from './../../services-internos/login.service';
import { UtilHttpService } from './../../services-internos/util-http.service';
import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.css']
})
export class AvisoComponent implements OnInit {

  private title = 'Avisos';
  private usuarioLogado:Usuario;
  private crecheLogada:Creche;
  private messageSuccess: string = null;
  private messageSuccessUpdate: string = null;
  private messagesError: string[] = null;
  private aviso:AvisoDTO = new AvisoDTO(null,null,null,null);
  private tipos: string[] = ['Cancelamento','Informação'];

  constructor(private usuarioService:UtilHttpService, 
              private loginService: LoginService, 
              private router: Router,
              private crecheService:CrecheService,
              private avisoService:AvisoService) {    
   }

  ngOnInit() {
    this.clearMessages();
    this.usuarioService.get(this.loginService.getEmail()).subscribe( data => this.usuarioLogado =  data,error => this.catchError(this.messagesError = <any>error));
    let timer = setInterval(() => { 
      if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
        if(this.usuarioLogado.tipo === 'CRECHE'){
          this.crecheService.get(this.usuarioLogado).subscribe( data => this.crecheLogada =  data,error => this.catchError(this.messagesError = <any>error));
        }
        clearInterval(timer);
      }
    }, 1000);    
  }

  private clearMessages():void{
      this.messageSuccess = null;
      this.messagesError = null;
      this.messageSuccessUpdate = null;
  }

  private catchError(r:Response):void{
    if(r.status === 400 || r.status === 409){
      this.messagesError = r.json().messages;
    }else{
      this.router.navigate(['/home/servico-indisponivel']);
    }
  }

  salvar():void{
    this.aviso.crecheId = this.crecheLogada.id;
    if(this.aviso.tipo == 'Informação'){
      this.aviso.tipo = 'INFORMACAO';
    }else{
      this.aviso.tipo = 'CANCELAMENTO';
    }
    this.avisoService.post(this.aviso).subscribe( data => this.extractData(data) ,error => this.catchError(this.messagesError = <any>error));         
  }
  
  private extractData(res: Response) {
    console.log('resposta do server: ' + res.status);
	if(res.status == 200 || res.status == 201){
    this.aviso = new AvisoDTO(null,null,null,null);
    this.clearMessages();
    this.messageSuccess = "Aviso Cadastrado com sucesso!";
	}
}

}
