import { AlimentoDTO } from './../../dto/alimento-dto';
import { AlimentoVO } from './../../vo/alimento-vo';
import { CardapioVO } from './../../vo/cardapio-vo';
import { Response } from '@angular/http';
import { CrecheVO } from './../../vo/creche-vo';
import { CardapioDTO } from './../../dto/cardapio-dto';
import { ApiRestGenericaService } from './../../services-internos/api-rest-generica.service';
import { Router } from '@angular/router';
import { CrecheService } from './../../services-internos/creche.service';
import { LoginService } from './../../services-internos/login.service';
import { UtilHttpService } from './../../services-internos/util-http.service';
import { Creche } from './../../model/creche';
import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})

export class CardapioComponent implements OnInit {

  private title = 'Cardápios';
  private messagesError: string[] = null;
  private usuarioLogado:Usuario = null;
  private crecheLogada:Creche;
  private errorMessage: string = null;
  private messageSuccess: string = null;
  private hiddenPesquisa:boolean = false;
  private hiddenCadastroNovo:boolean = true;
  private hiddenCadastroVisualiza:boolean = true;
  private hiddenVisualizaAlimentos:boolean = true;
  private msgListaAvaliacoes:string = 'Pesquisando cardápios ...';
  private API_CARDAPIO:string = 'cardapio/';
  private API_ALIMENTO:string = 'alimento/';
  
  private cardapiosVO:CardapioVO[] = [];
  private alimentosVO:AlimentoVO[] = [];
  
  private alimentosDTO:AlimentoDTO[] = [];
  
  private alimentoVO:AlimentoVO = new AlimentoVO(null,null);
  private cardapioVO:CardapioVO = new CardapioVO(null,null,null,null);
  
  private cardapioDTO:CardapioDTO = new CardapioDTO(null,null,null);
  private alimentoDTO:AlimentoDTO = new AlimentoDTO(null);

  private crechesPorFamiliar: CrecheVO[] = [];
  private msgLIstaCardapios:string = 'Realize um pesquisa!';
  private msgListaCardapiosCreche:string = 'Buscando cardápios...';
  

  private widthBarraProgresso:any = {width:"10%"};
  private widthBarraProgressoTexto:string = "10%";
  private timerBarraProgresso:any = null;

  constructor(private usuarioService:UtilHttpService, 
              private loginService: LoginService, 
              private crecheService:CrecheService,
              private router: Router,
              private apiGenerica: ApiRestGenericaService) {          
}


ngOnInit() {
  this.atualizarStylesProgress();
  this.clearMessages();
  this.usuarioService.get(this.loginService.getEmail()).subscribe( data => this.usuarioLogado =  data,error => this.catchError(this.messagesError = <any>error));
  let timer = setInterval(() => { 
    if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
      if(this.usuarioLogado.tipo === 'CRECHE'){
        this.crecheService.get(this.usuarioLogado).subscribe( data => this.setCrecheLogada(data),error => this.catchError(this.messagesError = <any>error));
      }else if(this.usuarioLogado.tipo === 'FAMILIAR'){
        this.crecheService.getPorFamiliar(this.usuarioLogado).subscribe( data => this.crechesPorFamiliar =  data,error => this.catchError(this.messagesError = <any>error));
        clearInterval(this.timerBarraProgresso);  
        this.widthBarraProgresso = {width:"100%"};
        this.widthBarraProgressoTexto = "100%";   
      }
      clearInterval(timer);
    }
  }, 1000);    
}

setCrecheLogada(creche:Creche){
   this.crecheLogada = creche;
   this.apiGenerica.getById(this.API_CARDAPIO, this.crecheLogada.id).subscribe( data => this.getdados(data) ,error => this.catchError(this.messagesError = <any>error));
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

private catchError(r:Response):void{
  if(r.status === 400 || r.status === 409){
    this.messagesError = r.json().messages;
    console.log('ERRO:' + this.messagesError);
  }else{
    this.router.navigate(['/home/servico-indisponivel']);
  }
}

public alimentos(c:CardapioVO){
    this.cardapioVO = c;
    this.apiGenerica.getById(this.API_ALIMENTO, c.cardapioId).subscribe( data => this.getdadosAlimentos(data) ,error => this.catchError(this.messagesError = <any>error));
}

public remover(c:CardapioVO, index:number){
  this.clearMessages();
  for (var i = 0; i < this.cardapiosVO.length; i++) {
    if(i === index) {
      this.cardapiosVO.splice(index, 1);
    }
  }
  this.apiGenerica.delete(this.API_CARDAPIO, c.cardapioId).subscribe( data => this.getResponseDelete(data) ,error => this.catchError(this.messagesError = <any>error));
}

visualizarCardapio(c:CardapioVO):void{
   this.cardapioVO = c;
   this.alimentos(c);
   this.hiddenPesquisa = true;
   this.hiddenCadastroNovo = true;
   this.hiddenCadastroVisualiza = false;
}

removerAlimento(index:number, a:AlimentoDTO):void{
  this.clearMessages();
  for (var i = 0; i < this.alimentosDTO.length; i++) {
    if(i === index) {
      this.alimentosDTO.splice(index, 1);
    }
  }
}


public pesquisarCardapios():void{
  this.clearMessages();
  if(this.cardapioDTO.crecheId === null){
     this.messagesError = ['Selecione uma creche']; 
  }else{
    this.apiGenerica.getById(this.API_CARDAPIO, this.cardapioDTO.crecheId).subscribe( data => this.getdados(data) ,error => this.catchError(this.messagesError = <any>error));
  }
}

private getResponseDelete(r:Response):void{
  if(r.status === 400 || r.status === 409){//Erro de validação
    this.messagesError = r.json().messages;
  }else if(r.status === 200){//Dados encontrados
    this.alimentosVO = null;
    this.msgLIstaCardapios = "";
    this.messageSuccess = "Cardápio removido com sucesso!";
    //this.apiGenerica.getById(this.API_CARDAPIO, this.cardapioDTO.crecheId).subscribe( data => this.getdados(data) ,error => this.catchError(this.messagesError = <any>error));
    clearInterval(this.timerBarraProgresso);  
    this.widthBarraProgresso = {width:"100%"};
    this.widthBarraProgressoTexto = "100%";   
  }
 }

private getdadosAlimentos(r:Response):void{
  this.hiddenPesquisa = true;
  this.hiddenVisualizaAlimentos = false;
  if(r.status === 400 || r.status === 409){//Erro de validação
    this.messagesError = r.json().messages;
  }else if(r.status === 204){//Não existem dados
    this.alimentosVO = null;
    this.msgLIstaCardapios = "Não existem cardáios cadastrados";
  }else if(r.status === 200){//Dados encontrados
    this.alimentosVO = r.json();
    this.msgLIstaCardapios = "";
    clearInterval(this.timerBarraProgresso);  
    this.widthBarraProgresso = {width:"100%"};
    this.widthBarraProgressoTexto = "100%";   
  }else if(r.status === 201){//Dados cadastrados com sucesso
   this.apiGenerica.getById(this.API_CARDAPIO, this.cardapioDTO.crecheId).subscribe( data => this.getdados(data) ,error => this.catchError(this.messagesError = <any>error));
       this.messageSuccess = "Cardápio cadastrado com sucesso!";
  }
 }

 voltarListaDecardapios():void{
  this.hiddenPesquisa = false;
  this.hiddenVisualizaAlimentos = true;
  this.hiddenCadastroVisualiza = true;
  this.hiddenCadastroNovo = true;
  this.alimentosVO = null;
  this.alimentoVO = null;
 }


private getdados(r:Response):void{
 if(r.status === 400 || r.status === 409){//Erro de validação
   this.messagesError = r.json().messages;
 }else if(r.status === 204){//Não existem dados
   this.cardapiosVO = null;
   this.msgListaCardapiosCreche = "Não existem cardápios para os últimos 7 dias";
   clearInterval(this.timerBarraProgresso);  
   this.widthBarraProgresso = {width:"100%"};
   this.widthBarraProgressoTexto = "100%";   
 }else if(r.status === 200){//Dados encontrados
   this.cardapiosVO = r.json();
   this.msgListaAvaliacoes = "";
   clearInterval(this.timerBarraProgresso);  
   this.widthBarraProgresso = {width:"100%"};
   this.widthBarraProgressoTexto = "100%";   
 }else if(r.status === 201){//Dados cadastrados com sucesso
  this.apiGenerica.getById(this.API_CARDAPIO, this.cardapioDTO.crecheId).subscribe( data => this.getdados(data) ,error => this.catchError(this.messagesError = <any>error));
      this.messageSuccess = "Cardápio cadastrado com sucesso!";
 }
}

private getResponseFromSave(r:Response):void{
  if(r.status === 400 || r.status === 409){//Erro de validação
    this.messagesError = r.json().messages;
  }else if(r.status === 201){//Dados cadastrados com sucesso
   this.apiGenerica.getById(this.API_CARDAPIO, this.cardapioDTO.crecheId).subscribe( data => this.getdados(data) ,error => this.catchError(this.messagesError = <any>error));
   this.messageSuccess = "Cardápio cadastrado com sucesso!";
   this.hiddenCadastroNovo = true;
   this.hiddenPesquisa = false;
  }
 }


public cadastrar():void{
  this.clearMessages();
  this.hiddenPesquisa = true;
  this.hiddenCadastroVisualiza = true;
  this.hiddenCadastroNovo = false;
  this.cardapioDTO = new CardapioDTO(null,null,null);
  this.alimentoDTO = new AlimentoDTO(null);
  this.alimentosDTO = [];
}

public exibirTelaLIstaDeCardapios():void{

}

public salvar():void{
     this.cardapioDTO.crecheId = this.crecheLogada.id;
     this.cardapioDTO.alimentos = this.alimentosDTO;
     this.apiGenerica.save(this.API_CARDAPIO, this.cardapioDTO).subscribe( data => this.getResponseFromSave(data) ,error => this.catchError(this.messagesError = <any>error));
}

public adicionarAlimento():void{
  this.clearMessages();
  if(this.alimentoDTO.nome === null || this.alimentoDTO.nome.trim().length === 0){
    this.messagesError =  ['Preencha os campos obrigatórios'!];
  }else{
    if(this.alimentosDTO === null || this.alimentosDTO === undefined){
      this.alimentosDTO = [];
    }
    this.alimentosDTO.push(this.alimentoDTO);
    this.alimentoDTO = new AlimentoDTO(null);
  }
}

}