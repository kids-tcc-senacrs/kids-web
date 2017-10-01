import { ComunicacaoVO } from './../../vo/comunicacao-vo';
import { ComunicacaoService } from './../../services-internos/comunicacao.service';
import { CrecheVO } from './../../vo/creche-vo';
import { ComunicacaoDTO } from './../../dto/comunicacao-dto';
import { Response } from '@angular/http';
import { CrecheService } from './../../services-internos/creche.service';
import { Router } from '@angular/router';
import { LoginService } from './../../services-internos/login.service';
import { UtilHttpService } from './../../services-internos/util-http.service';
import { Creche } from './../../model/creche';
import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comunicacao',
  templateUrl: './comunicacao.component.html',
  styleUrls: ['./comunicacao.component.css']
})
export class ComunicacaoComponent implements OnInit {

  private title = 'Contato';
  private usuarioLogado:Usuario;
  private crecheLogada:Creche;
  private messageSuccess: string = null;
  private messagesError: string[] = null;
  private widthBarraProgresso:any = {width:"10%"};
  private widthBarraProgressoTexto:string = "10%";
  private timerBarraProgresso:any = null;
  private comunicacao:ComunicacaoDTO = new ComunicacaoDTO(null,null,null,null,null,null);
  private comunicacaoVO:ComunicacaoVO = new ComunicacaoVO(null,null,null,null,null,null,null,null,null,null,null);
  private comunicados:ComunicacaoVO[] = [];
  private tipos: string[] = ['Elogio','Sugestão','Reclamação'];
  private crechesPorFamiliar: CrecheVO[] = [];
  private hiddenEdicao:boolean = false;
  private hiddenVisualizacao:boolean = true;
  private hiddenBtnEnviar:boolean = true;
  private clicouEmVisualizar:boolean = false;
  private clicouEmEditar:boolean = false;

  constructor(private usuarioService:UtilHttpService, 
              private loginService: LoginService, 
              private router: Router,
              private crecheService:CrecheService,
              private comunicacaoService:ComunicacaoService) {    
   }

   ngOnInit() {
    this.atualizarStylesProgress();
    this.clearMessages();
    this.usuarioService.get(this.loginService.getEmail()).subscribe( data => this.usuarioLogado =  data,error => this.catchError(this.messagesError = <any>error));
    let timer = setInterval(() => { 
      if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
        if(this.usuarioLogado.tipo === 'CRECHE'){
          this.crecheService.get(this.usuarioLogado).subscribe( data => this.crecheLogada =  data,error => this.catchError(this.messagesError = <any>error));
          this.comunicacaoService.get(this.usuarioLogado.id, false).subscribe( data => this.setComunicadosEncontrados(data),error => this.catchError(this.messagesError = <any>error));           
        }else if(this.usuarioLogado.tipo === 'FAMILIAR'){
          this.crecheService.getPorFamiliar(this.usuarioLogado).subscribe( data => this.crechesPorFamiliar =  data,error => this.catchError(this.messagesError = <any>error));
          this.comunicacaoService.get(this.usuarioLogado.id, true).subscribe( data => this.setComunicadosEncontrados(data),error => this.catchError(this.messagesError = <any>error));           
        }
        clearInterval(timer);
      }
    }, 1000);    
  }

  enviarComunicacaoFamiliar():void{
    this.clearMessages();
    if('Reclamação' === this.comunicacao.tipo){
      this.comunicacao.tipo = 'RECLAMACAO';
    }else if('Elogio' === this.comunicacao.tipo){
      this.comunicacao.tipo = 'ELOGIO';
    }else if('Sugestão' === this.comunicacao.tipo){
      this.comunicacao.tipo = 'SUGESTAO';
    }
    this.comunicacao.usuarioId = this.usuarioLogado.id;
    this.comunicacaoService.post(this.comunicacao).subscribe( data => this.extractData(data),error => this.catchError(this.messagesError = <any>error));
  }

  enviarComunicacaoCreche():void{
    this.clearMessages();
    this.comunicacao.id = this.comunicacaoVO.comunicacaoId;
    this.comunicacao.usuarioId = this.comunicacaoVO.usuarioId;
    this.comunicacao.descricaoCreche = this.comunicacaoVO.descricaoCreche;
    this.comunicacao.descricaoFamiliar = this.comunicacaoVO.descricaoFamiliar;
    this.comunicacao.crecheId = this.crecheLogada.id;
    this.comunicacao.tipo = this.comunicacaoVO.tipo;
    this.comunicacaoService.put(this.comunicacao).subscribe( data => this.extractData(data),error => this.catchError(this.messagesError = <any>error));
  }
  
  private extractData(res: Response) {
	if(res.status == 200 || res.status == 201){
    this.comunicacao = new ComunicacaoDTO(null,null,null,null,null,null);
    this.clearMessages();
    this.messageSuccess = "Mensagem enviado com sucesso!";

    let timer = setInterval(() => { 
      if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
        if(this.usuarioLogado.tipo === 'CRECHE'){
          this.comunicacaoService.get(this.usuarioLogado.id, false).subscribe( data => this.setComunicadosEncontrados(data),error => this.catchError(this.messagesError = <any>error));           
        }else if(this.usuarioLogado.tipo === 'FAMILIAR'){
          this.comunicacaoService.get(this.usuarioLogado.id, true).subscribe( data => this.setComunicadosEncontrados(data),error => this.catchError(this.messagesError = <any>error));           
        }
        clearInterval(timer);
      }
    }, 1000);    
  }
  }

  private setComunicadosEncontrados(list:ComunicacaoVO[]):void{
    this.comunicados = list;
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

  private clearMessages():void{
    this.messageSuccess = null;
    this.messagesError = null;
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

  visualizarContato(c:ComunicacaoVO):void{
    this.comunicacaoVO = c;
    this.hiddenEdicao = true;
    this.hiddenVisualizacao = false;
    this.clicouEmVisualizar = true;
    this.clicouEmEditar = false;
    this.hiddenBtnEnviar = true;
    console.log('this.hiddenBtnEnviar: ' + this.hiddenBtnEnviar);
  }

  editarContato(c:ComunicacaoVO){
    this.comunicacaoVO = c;
    this.hiddenEdicao = true;
    this.hiddenVisualizacao = true;
    this.clicouEmVisualizar = false;
    this.clicouEmEditar = true;
    this.hiddenBtnEnviar = false;
  }

  exibirTelaPesquisa():void{
    this.hiddenEdicao = false;
    this.hiddenVisualizacao = true;
    this.clicouEmVisualizar = false;
    this.clicouEmEditar = false;    
    this.comunicacao = new ComunicacaoDTO(null,null,null,null,null,null);
    this.comunicacaoVO = new ComunicacaoVO(null,null,null,null,null,null,null,null,null,null,null);
    this.clearMessages();
  }  

}