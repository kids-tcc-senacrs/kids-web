import { AvisoVO } from './../../vo/aviso-vo';
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
  private avisos:AvisoVO[] = [];

  private widthBarraProgresso:any = {width:"10%"};
  private widthBarraProgressoTexto:string = "10%";
  private timerBarraProgresso:any = null;

  constructor(private usuarioService:UtilHttpService, 
              private loginService: LoginService, 
              private router: Router,
              private crecheService:CrecheService,
              private avisoService:AvisoService) {    
   }

  ngOnInit() {
    this.atualizarStylesProgress();
    this.clearMessages();
    this.usuarioService.get(this.loginService.getEmail()).subscribe( data => this.usuarioLogado =  data,error => this.catchError(this.messagesError = <any>error));
    let timer = setInterval(() => { 
      if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
        if(this.usuarioLogado.tipo === 'CRECHE'){
          this.crecheService.get(this.usuarioLogado).subscribe( data => this.crecheLogada =  data,error => this.catchError(this.messagesError = <any>error));
          this.avisoService.get(this.usuarioLogado).subscribe( data => this.setAvisosEncontradas(data),error => this.catchError(this.messagesError = <any>error));         
        }
        clearInterval(timer);
      }
    }, 1000);    
  }

  private setAvisosEncontradas(listAvisos:AvisoVO[]):void{
    this.avisos = listAvisos;
    clearInterval(this.timerBarraProgresso);  
    this.widthBarraProgresso = {width:"100%"};
    this.widthBarraProgressoTexto = "100%";   
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

    let timer = setInterval(() => { 
      if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
        if(this.usuarioLogado.tipo === 'CRECHE'){
          this.crecheService.get(this.usuarioLogado).subscribe( data => this.crecheLogada =  data,error => this.catchError(this.messagesError = <any>error));
          this.avisoService.get(this.usuarioLogado).subscribe( data => this.avisos =  data,error => this.catchError(this.messagesError = <any>error));         
        }
        clearInterval(timer);
      }
    }, 1000);    
  }
  }
  
  removerAviso(index:number, aviso:AvisoVO):void{
    for (var i = 0; i < this.avisos.length; i++) {
      if(i === index) {
        this.avisos.splice(index, 1);
      }
    }
    this.avisoService.delete(aviso.avisoId).subscribe( data => this.extractDataAposRemover(data) ,error => this.catchError(this.messagesError = <any>error));         
  }

  private extractDataAposRemover(res: Response) {
	if(res.status == 200 || res.status == 201){
    this.aviso = new AvisoDTO(null,null,null,null);
    this.clearMessages();
    this.messageSuccess = "Aviso removido sucesso!";

    let timer = setInterval(() => { 
      if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
        if(this.usuarioLogado.tipo === 'CRECHE'){
          this.crecheService.get(this.usuarioLogado).subscribe( data => this.crecheLogada =  data,error => this.catchError(this.messagesError = <any>error));
          this.avisoService.get(this.usuarioLogado).subscribe( data => this.avisos =  data,error => this.catchError(this.messagesError = <any>error));         
        }
        clearInterval(timer);
      }
    }, 1000);    
  }
  }

  atualizarStylesProgress():void{
    let cssStyles = {};
    let valorATual = 10;
    this.timerBarraProgresso = setInterval(() => { 
      valorATual = valorATual + 10;
      switch(valorATual){
        case 20: this.widthBarraProgresso      = {width:"20%"}
                 this.widthBarraProgressoTexto = "20%" ;break;
        case 30: this.widthBarraProgresso = {width:"30%"}
                 this.widthBarraProgressoTexto = "30%" ;break;
        case 40: this.widthBarraProgresso = {width:"40%"}
                 this.widthBarraProgressoTexto = "40%" ;break;
        case 50: this.widthBarraProgresso = {width:"50%"}
                 this.widthBarraProgressoTexto = "50%" ;break;
        case 60: this.widthBarraProgresso = {width:"60%"}
                 this.widthBarraProgressoTexto = "60%" ;break;
        case 70: this.widthBarraProgresso = {width:"70%"}
                 this.widthBarraProgressoTexto = "70%" ;break;
        case 80: this.widthBarraProgresso = {width:"80%"}
                 this.widthBarraProgressoTexto = "80%" ;break;
        case 90: this.widthBarraProgresso = {width:"90%"}
                 this.widthBarraProgressoTexto = "90%" ;break;
        case 100: this.widthBarraProgresso = {width:"99%"}
                  this.widthBarraProgressoTexto = "99%" ;break;
        default:clearInterval(this.timerBarraProgresso);     
      }
    }, 80);       
  }
}