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
  
  constructor(private usuarioService:UtilHttpService, 
              private loginService: LoginService, 
              private router: Router,
              private eventoService:EventoService,
              private crecheService:CrecheService) {    
   }

  ngOnInit() {
    this.clearMessages();
    this.usuarioService.get(this.loginService.getEmail()).subscribe( data => this.usuarioLogado =  data,error => this.catchError(this.messagesError = <any>error));
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

  private catchError(r:Response):void{
    console.log('aaaaaaaaa' + r.status);
    if(r.status === 400 || r.status === 409){
      console.log('bbbb' + r.json().messages);
      this.messagesError = r.json().messages;
    }else{
      this.router.navigate(['/home/servico-indisponivel']);
    }
  }

  public rejeitarPresenca(e:EventoVO):void{
    console.log('rejeitarPresenca');
  }

  public confirmarPresenca(e:EventoVO):void{
    console.log('confirmarPresenca');
  }

  public salvarEvento():void{
    this.clearMessages();
    let dtFinalJson = JSON.parse(JSON.stringify(this.evento.dtRealizacao));
    let dtFinalAjustada = new Date(dtFinalJson);
    this.evento.dtRealizacao = dtFinalAjustada;
    this.evento.crecheId = this.crecheLogada.id;
    this.eventoService.post(this.evento).subscribe( data => this.extractData(data) ,error => this.catchError(this.messagesError = <any>error));         
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

}