import { AvaliacaoDTO } from './../../dto/avaliacao-dto';
import { ApiRestGenericaService } from './../../services-internos/api-rest-generica.service';
import { AvaliacaoVO } from './../../vo/avaliacao-vo';
import { Endereco } from './../../model/endereco';
import { Pessoa } from './../../model/pessoa';
import { Contato } from './../../model/contato';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { CrecheService } from './../../services-internos/creche.service';
import { CriancaService } from './../../services-internos/crianca.service';
import { LoginService } from './../../services-internos/login.service';
import { UtilHttpService } from './../../services-internos/util-http.service';
import { Creche } from './../../model/creche';
import { Usuario } from './../../model/usuario';
import { Crianca } from './../../model/crianca';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  private title = 'Avaliações';
  private criancas: Crianca[] = null;
  private avaliacoesVO: AvaliacaoVO[]= [];
  private messagesError: string[] = null;
  private usuarioLogado:Usuario = null;
  private crecheLogada:Creche;
  private errorMessage: string = null;
  private messageSuccess: string = null;
  private hiddenPesquisa:boolean = false;
  private hiddenAvaliacoes:boolean = true;
  private hiddenCadastroNovo:boolean = true;
  private hiddenButtonSalvar:boolean = true;
  private hiddenButtonNovo:boolean = false;
  private msgListaAvaliacoes:string = 'Pesquisando avaliações ...';
  private avaliacaoDTO:AvaliacaoDTO = new AvaliacaoDTO(null,null,null);
  private API_AVALIACAO:string = 'avaliacao/';

  private filtro:string;
  private pessoa:Pessoa = new Pessoa(null, null, new Endereco());
  private pessoaCreche:Pessoa = new Pessoa(null, null, new Endereco());
  private creche:Creche = new Creche(null,this.pessoaCreche);
  private crianca:Crianca = new Crianca(null,null,null,null,null,this.pessoa,new Contato(), this.creche, null, null);

  private widthBarraProgresso:any = {width:"10%"};
  private widthBarraProgressoTexto:string = "10%";
  private timerBarraProgresso:any = null;

  constructor(private usuarioService:UtilHttpService, 
              private loginService: LoginService, 
              private criancaService:CriancaService,
              private crecheService:CrecheService,
              private router: Router,
              private apiGenerica: ApiRestGenericaService) {          
}

  ngOnInit() {
    this.atualizarStylesProgress();
    this.usuarioService.get(this.loginService.getEmail()).subscribe( data => this.usuarioLogado =  data,error => this.catchError(this.messagesError = <any>error));
    let timer = setInterval(() => { 
      if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
        this.criancaService.get(this.usuarioLogado).subscribe(data => this.setCriancasEncontradas(data) , error => this.catchError(this.messagesError = <any>error));
        if(this.usuarioLogado.tipo === 'CRECHE'){
           this.crecheService.get(this.usuarioLogado).subscribe( data => this.crecheLogada =  data,error => this.catchError(this.messagesError = <any>error));
        }
        clearInterval(timer);
      }

    }, 1000);    
  }  

  avaliacoes(c:Crianca):void{
    this.crianca = c;
    this.apiGenerica.getById(this.API_AVALIACAO, this.crianca.id).subscribe( data => this.getdados(data) ,error => this.catchError(this.messagesError = <any>error));
    this.exibirTelaAvaliacoes();
  }

  exibirTelaAvaliacoes():void{
    this.hiddenAvaliacoes = false;
    this.hiddenPesquisa = true;
    this.hiddenButtonNovo = false;
  }

  private getdados(r:Response):void{
     console.log('http status: ' + r.status);      
    if(r.status === 400 || r.status === 409){//Erro de validação
      this.messagesError = r.json().messages;
    }else if(r.status === 204){//Não existem dados
      this.avaliacoesVO = null;
      this.msgListaAvaliacoes = "Não existem avaliações cadastradas";
    }else if(r.status === 200){//Dados encontrados
      this.avaliacoesVO = r.json();
      this.msgListaAvaliacoes = "";
      clearInterval(this.timerBarraProgresso);  
      this.widthBarraProgresso = {width:"100%"};
      this.widthBarraProgressoTexto = "100%";   
    }else if(r.status === 201){//Dados cadastrados com sucesso
         this.apiGenerica.getById(this.API_AVALIACAO, this.crianca.id).subscribe( data => this.getdados(data) ,error => this.catchError(this.messagesError = <any>error));
         this.messageSuccess = "Avaliação cadastrada com sucesso!";
         this.hiddenCadastroNovo = true;
         this.hiddenButtonNovo = false;  
         this.hiddenButtonSalvar = true;
    }
  }

  private catchError(r:Response):void{
    if(r.status === 400 || r.status === 409){
      this.messagesError = r.json().messages;
    }else{
      this.router.navigate(['/home/servico-indisponivel']);
    }
  }

  private setCriancasEncontradas(c:Crianca[]):void{
    this.criancas = c;
    clearInterval(this.timerBarraProgresso);  
    this.widthBarraProgresso = {width:"100%"};
    this.widthBarraProgressoTexto = "100%";   
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


listar(){
  if(this.criancas === null || 
     this.criancas === undefined || 
     this.criancas.length === 0 || 
     this.filtro === undefined || 
     this.filtro === null ||
     this.filtro.trim() === ''){
    return this.criancas;
  }
  return this.criancas.filter((v) => {
    let nomeCompleto:string[] = v.pessoa.nome.split(' '); 
    let primeiroNome = nomeCompleto[0];
    let letrasDigitadasNoFiltro:string[] = this.filtro.split('');
    let nomeEntrado = false;
    for (var index = 0; index < letrasDigitadasNoFiltro.length; index++) {
      if(primeiroNome.length >= letrasDigitadasNoFiltro.length){
        var letraDoNome = primeiroNome[index].trim().toLocaleUpperCase();
        if(this.filtro.charAt(index).trim().toLocaleUpperCase() == letraDoNome){
          nomeEntrado = true;
        }else{
          nomeEntrado = false;
        }
      }
    }
    return nomeEntrado;
  });
}

classesTableLine(sexo:string): any {
  let cssStyles = {};
  if(sexo === 'MASCULINO'){
    cssStyles = {'text-masculino': true, 'table-line-text':true, 'quebrar-texto':true};
  }else{
    cssStyles = {'text-feminino': true,'table-line-text':true, 'quebrar-texto':true};
  }
return cssStyles; 
}

private clearMessages():void{
  this.messageSuccess = null;
  this.messagesError = null;
}

exibirTelaPesquisa():void{
this.clearMessages(); 
this.hiddenAvaliacoes = true;
this.hiddenCadastroNovo = true;
this.hiddenPesquisa = false;
this.hiddenButtonSalvar = true;
this.avaliacoesVO = null;
this.avaliacaoDTO = new AvaliacaoDTO(null,null,null);
}


cadastrar():void{
  this.avaliacaoDTO = new AvaliacaoDTO(null,null,null);
  this.hiddenPesquisa = true;
  this.hiddenAvaliacoes = false;
  this.hiddenCadastroNovo = false;
  this.hiddenButtonNovo = true;
  this.hiddenButtonSalvar = false;
}

salvar():void{
  this.avaliacaoDTO.crecheId = this.crecheLogada.id;
  this.avaliacaoDTO.criancaId = this.crianca.id;
  this.apiGenerica.save(this.API_AVALIACAO, this.avaliacaoDTO).subscribe( data => this.getdados(data) ,error => this.catchError(this.messagesError = <any>error));
}

}