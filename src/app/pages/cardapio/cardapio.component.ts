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
  private msgListaAvaliacoes:string = 'Pesquisando cardápios ...';
  private API_CARDAPIO:string = 'cardapio/';
  private cardapiosVO:CardapioVO[] = [];
  private cardapioDTO:CardapioDTO = new CardapioDTO(null,null,null);
  private crechesPorFamiliar: CrecheVO[] = [];
  private msgLIstaCardapios:string = 'Realize um pesquisa!';
  

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
        this.crecheService.get(this.usuarioLogado).subscribe( data => this.crecheLogada =  data,error => this.catchError(this.messagesError = <any>error));
        //buscar os cardapios da creche
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
  
}

public pesquisarCardapios():void{
  this.clearMessages();
  if(this.cardapioDTO.crecheId === null){
     this.messagesError = ['Selecione uma creche']; 
  }else{
    this.apiGenerica.getById(this.API_CARDAPIO, this.cardapioDTO.crecheId).subscribe( data => this.getdados(data) ,error => this.catchError(this.messagesError = <any>error));
  }
}

private getdados(r:Response):void{
  console.log('http status: ' + r.status);      
 if(r.status === 400 || r.status === 409){//Erro de validação
   this.messagesError = r.json().messages;
 }else if(r.status === 204){//Não existem dados
   this.cardapiosVO = null;
   this.msgLIstaCardapios = "Não existem cardáios cadastrados";
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

}