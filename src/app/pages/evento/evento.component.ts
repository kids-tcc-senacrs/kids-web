import { RespostaEventoDTO } from './../../dto/resposta-evento-dto';
import { CrecheService } from './../../services-internos/creche.service';
import { Creche } from './../../model/creche';
import { EventoDTO } from './../../dto/evento-dto';
import { EventoVO } from './../../vo/evento-vo';
import { EventoService } from './../../services-internos/evento.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { LoginService } from './../../services-internos/login.service';
import { UtilHttpService } from './../../services-internos/util-http.service';
import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  private title = 'Eventos';
  private usuarioLogado:Usuario;
  private messagesError: string[] = null;
  private titleButtonSalvar:string = "Salvar";
  private messageSuccess: string = null;
  private messageSuccessUpdate: string = null;
  private eventos:EventoVO[] = [];
  private evento:EventoDTO = new EventoDTO(null,null,'','',null,null);
  private status: string[] = ['Previsto','Cancelado', 'Realizado'];
  private crecheLogada:Creche;

  private widthBarraProgresso:any = {width:"10%"};
  private widthBarraProgressoTexto:string = "10%";
  private timerBarraProgresso:any = null;
  
  constructor(private usuarioService:UtilHttpService, 
              private loginService: LoginService, 
              private router: Router,
              private eventoService:EventoService,
              private crecheService:CrecheService) {    
   }

  ngOnInit() {
    this.atualizarStylesProgress();
    this.clearMessages();
    this.usuarioService.get(this.loginService.getEmail()).subscribe( data => this.usuarioLogado =  data,error => this.catchError(this.messagesError = <any>error));
    let timer = setInterval(() => { 
      if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
        if(this.usuarioLogado.tipo === 'FAMILIAR'){
          this.eventoService.get(this.usuarioLogado, true).subscribe( data => this.setEventosEncontrados(data) ,error => this.catchError(this.messagesError = <any>error));         
        }else if(this.usuarioLogado.tipo === 'CRECHE'){
          this.eventoService.getEventosByCreche(this.usuarioLogado).subscribe( data => this.setEventosEncontrados(data),error => this.catchError(this.messagesError = <any>error));         
          this.crecheService.get(this.usuarioLogado).subscribe( data => this.crecheLogada =  data,error => this.catchError(this.messagesError = <any>error));
        }
        clearInterval(timer);
      }
    }, 1000);    
  }

  private setEventosEncontrados(listEventos:EventoVO[]):void{
    this.eventos = listEventos;
    clearInterval(this.timerBarraProgresso);  
    this.widthBarraProgresso = {width:"100%"};
    this.widthBarraProgressoTexto = "100%";   
  }

  private catchError(r:Response):void{
    if(r.status === 400 || r.status === 409){
      this.messagesError = r.json().messages;
    }else{
      this.router.navigate(['/home/servico-indisponivel']);
    }
  }

  public rejeitarPresenca(e:EventoVO):void{
    let resposta = new RespostaEventoDTO(e.eventoId, e.criancaId, this.usuarioLogado.id, 'REJEITADO');
    this.eventoService.postResposta(resposta).subscribe( data => this.extractDataRejeitada(data) ,error => this.catchError(this.messagesError = <any>error));         
  }

 private extractDataConfirmado(res: Response) {
	if(res.status == 200 || res.status == 201){
    this.evento = new EventoDTO(null,null,'','',null,null);
    this.clearMessages();
    this.messageSuccess = "Presença Confirmada!";

    let timer = setInterval(() => { 
      if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
        if(this.usuarioLogado.tipo === 'FAMILIAR'){
          this.eventoService.get(this.usuarioLogado, true).subscribe( data => this.eventos =  data,error => this.catchError(this.messagesError = <any>error));         
        }else if(this.usuarioLogado.tipo === 'CRECHE'){
          this.eventoService.getEventosByCreche(this.usuarioLogado).subscribe( data => this.eventos =  data,error => this.catchError(this.messagesError = <any>error));         
          this.crecheService.get(this.usuarioLogado).subscribe( data => this.crecheLogada =  data,error => this.catchError(this.messagesError = <any>error));
        }
        clearInterval(timer);
      }
    }, 1000);    
	}
}

private extractDataRejeitada(res: Response) {
	if(res.status == 200 || res.status == 201){
    this.evento = new EventoDTO(null,null,'','',null,null);
    this.clearMessages();
    this.messageSuccess = "Presença Rejeitada!";

    let timer = setInterval(() => { 
      if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
        if(this.usuarioLogado.tipo === 'FAMILIAR'){
          this.eventoService.get(this.usuarioLogado, true).subscribe( data => this.eventos =  data,error => this.catchError(this.messagesError = <any>error));         
        }else if(this.usuarioLogado.tipo === 'CRECHE'){
          this.eventoService.getEventosByCreche(this.usuarioLogado).subscribe( data => this.eventos =  data,error => this.catchError(this.messagesError = <any>error));         
          this.crecheService.get(this.usuarioLogado).subscribe( data => this.crecheLogada =  data,error => this.catchError(this.messagesError = <any>error));
        }
        clearInterval(timer);
      }
    }, 1000);    
	}
}


  public confirmarPresenca(e:EventoVO):void{
    let resposta = new RespostaEventoDTO(e.eventoId, e.criancaId, this.usuarioLogado.id, 'CONFIRMADO');
    this.eventoService.postResposta(resposta).subscribe( data => this.extractDataConfirmado(data) ,error => this.catchError(this.messagesError = <any>error));         
  }

  public salvarEvento():void{
    this.clearMessages();
    let dtFinalJson = JSON.parse(JSON.stringify(this.evento.dtRealizacao));
    let dtFinalAjustada = new Date(dtFinalJson);
    this.evento.dtRealizacao = dtFinalAjustada;
    this.evento.crecheId = this.crecheLogada.id;
    this.eventoService.post(this.evento).subscribe( data => this.extractData(data) ,error => this.catchError(this.messagesError = <any>error));         

    let timer = setInterval(() => { 
      if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
        if(this.usuarioLogado.tipo === 'FAMILIAR'){
          this.eventoService.get(this.usuarioLogado, true).subscribe( data => this.eventos =  data,error => this.catchError(this.messagesError = <any>error));         
        }else if(this.usuarioLogado.tipo === 'CRECHE'){
          this.eventoService.getEventosByCreche(this.usuarioLogado).subscribe( data => this.eventos =  data,error => this.catchError(this.messagesError = <any>error));         
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

  atualizarEvento(e:EventoVO):void{
    this.clearMessages();
    let evento = new EventoDTO(e.eventoId, 0, e.eventoNome,'nao aguento mais', e.dtRealizacao, e.eventoStatus);
    this.eventoService.put(evento).subscribe( data => this.extractDataUpdate(data) ,error => this.catchError(this.messagesError = <any>error));         
  }

  private extractData(res: Response) {
	if(res.status == 200 || res.status == 201){
    this.evento = new EventoDTO(null,null,'','',null,null);
    this.clearMessages();
    this.messageSuccess = "Evento Cadastrado com sucesso!";
	}
}

    private extractDataUpdate(res: Response) {
      if(res.status == 200 || res.status == 201){
        this.evento = new EventoDTO(null,null,'','',null,null);
        this.clearMessages();
        this.messageSuccessUpdate = "Evento atualizado com sucesso!";
      }
    }

  isChecked(e:EventoVO, statusAtual:string):boolean{
  if(e.eventoStatus == statusAtual){
    return true;
  }else{
    return false;
  }
}

setStatus(e:EventoVO, status:string){
    this.clearMessages();
    e.eventoStatus = status;
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