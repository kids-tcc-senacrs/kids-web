import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { UtilHttpService } from './../../services-internos/util-http.service';
import { CrecheService } from './../../services-internos/creche.service';
import { GoogleMapService } from './../../services-externos/google-map.service';
import { LoginService } from './../../services-internos/login.service';
import { CriancaService } from './../../services-internos/crianca.service';
import { Medicamento } from './../../model/medicamento';
import { Pessoa } from './../../model/pessoa';
import { Creche } from './../../model/creche';
import { Usuario } from './../../model/usuario';
import { Contato } from './../../model/contato';
import { Crianca } from './../../model/crianca';
import { Endereco } from './../../model/endereco';

@Component({
  selector: 'app-crianca',
  templateUrl: './crianca.component.html',
  styleUrls: ['./crianca.component.css']
})
export class CriancaComponent implements OnInit {
  
  private title = 'Crianças';
  private titleCadastro = 'Cadastrar Criança';
  private titleButtonAddMedicamento = 'Adicionar Medicamento';
  private titleButtonAnterior = 'Anterior';
  private titleButtonProximo = 'Próximo';
  private titleButtonSalvar = 'Salvar';
  private titleBtnVoltar  = 'Voltar';
  
  private hiddenPasso1: boolean = false;
  private hiddenPasso2: boolean = true;
  private hiddenPasso3: boolean = true;
  private hiddenPasso4: boolean = true;
  private hiddenPasso5: boolean = true;
  private hiddenCadastro:boolean = true;
  private hiddenPesquisa:boolean = false;

  private criancas: Crianca[] = null;
  private messagesError: string[] = null;
  private usuarioLogado:Usuario = null;
  private crecheLogada:Creche;
  private errorMessage: string = null;
  private messageSuccess: string = null;
  private filtro:string;
  private resultGoogleMap:any;
  private medicamento: Medicamento = new Medicamento(null,'','','',new Date);
  //private medicamentos: Medicamento[] = [null];
  private crianca:Crianca = new Crianca(null,null,null,null,null,new Pessoa(),new Endereco(),new Contato(), new Creche(), null);
  private sexos: string[] = ['Masculino','Feminino'];

  constructor(private usuarioService:UtilHttpService, 
              private loginService: LoginService, 
              private criancaService:CriancaService,
              private crecheService:CrecheService,
              private router: Router,
              private googleMap:GoogleMapService) {
    this.hiddenCadastro = true;
    this.hiddenPesquisa = false;
   }

   
   
  ngOnInit() {
  this.criarCriancaFake();////////////FAKE

    this.usuarioService.get(this.loginService.getEmail()).subscribe( data => this.usuarioLogado =  data,error => this.catchError(this.messagesError = <any>error));
    let timer = setInterval(() => { 
      if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
        this.criancaService.get(this.usuarioLogado).subscribe( data => this.criancas =  data,error => this.catchError(this.messagesError = <any>error));
        if(this.usuarioLogado.tipo === 'CRECHE'){
           this.crecheService.get(this.usuarioLogado).subscribe( data => this.crecheLogada =  data,error => this.catchError(this.messagesError = <any>error));
        }
        clearInterval(timer);
      }

    }, 1000);    
  }  
  
  
  
  exibirTelaCadastro():void{
    this.hiddenCadastro = false;
    this.hiddenPesquisa = true;

  }

  
  
  exibirTelaPesquisa():void{
    this.hiddenCadastro = true;
    this.hiddenPesquisa = false;
  }

  
  
   private catchError(r:Response):void{
    if(r.status === 400 || r.status === 409){
      this.messagesError = r.json().messages;
    }else{
      this.router.navigate(['/home/servico-indisponivel']);
    }
  }

  
  
  classesTableLine(sexo:string): any {
    let cssStyles = {};
    if(sexo === 'MASCULINO'){
      cssStyles = {'text-masculino': true, 'table-line-text':true};
    }else{
      cssStyles = {'text-feminino': true,'table-line-text':true};
    }
  return cssStyles; 
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



/**
   * 
   * @param proximoPasso numero do passo para ser direcionado.
   * 
   */
  private proximoPasso(proximoPasso:number):void{
    switch(proximoPasso){
         case 1 : this.hiddenPasso1 = false;
                  this.hiddenPasso2 = true; 
                  break;
         case 2 : this.hiddenPasso1 = true;
                  this.hiddenPasso2 = false; 
                  this.hiddenPasso3 = true; 
                  break;
         case 3 : this.hiddenPasso2 = true;
                  this.hiddenPasso3 = false; 
                  this.hiddenPasso4 = true; 
                  break;         
         case 4 : this.hiddenPasso3 = true;
                  this.hiddenPasso4 = false; 
                  this.hiddenPasso5 = true; 
                  break;                  
         case 5 : this.hiddenPasso4 = true;
                  this.hiddenPasso5 = false; 
                  break;                           
    }
  }

  
  
    /**
   * 
   * @param event cep
   * 
   */
  private onchangeCep(event):void{
    if(event === null || event === undefined){
      this.crianca.endereco.localizacao =  '';
       return;
    }
    if (event.length < 8) {
      this.crianca.endereco.localizacao =  '';
      return;
    } else if (event.length > 9) {
      this.crianca.endereco.localizacao =  '';
      return;
    } else if (( event.length === 9 ) && !event.includes('-')) {
      this.crianca.endereco.localizacao =  '';
      return;
    } else if (event.length === 9 && !event.match('[0-9]{5}-[0-9]{3}')) {
      this.crianca.endereco.localizacao =  '';
      return;
    }
    if (event.length === 8) {
    this.googleMap.getEndereco(this.crianca.endereco.cep)
    .subscribe(data => {this.resultGoogleMap = data
                        if(this.resultGoogleMap.status === 'OK'){
						   this.crianca.endereco.localizacao = this.resultGoogleMap.results[0].formatted_address;
						}else{
						   this.crianca.endereco.localizacao = 'localização não encontrada para o Cep informado!';
						}}, 
						error => this.messagesError = <any>error,);
    }

  }

  
  
  onfocusCep(){
    this.clearMessages();
  }

  
  
  onfocusLogradouro(){
    this.clearMessages();
  }

  
  
  private clearMessages():void{
      this.messageSuccess = null;
      this.messagesError = null;
  }

  
  
  salvar():void{
    this.clearMessages();
    this.titleButtonSalvar = "Enviando..."; 
    this.crianca.creche = this.crecheLogada;
    this.criancaService.post(this.crianca).subscribe( data => this.catchResponse(data),res => this.catchError(res));
    this.titleButtonSalvar = "Salvar";                                     
  }

     
  private catchResponse(r:Response):void{
    if(r.status === 200){
      this.messageSuccess = 'Criança cadastrada com sucesso';    
    }
  }
  
  setSexo(sexo:string):void{
    this.crianca.sexo = sexo;
  }

  adicionarMedicamento():void{
    console.log('MEDICAMENTO ADICIONADO');
    console.log('NOME: ' + this.medicamento.nome);
    console.log('DOSAGEM: ' + this.medicamento.dosagem);
    console.log('INTERVALO HORAS: ' + this.medicamento.intervaloHoras);
    console.log('DATA FINAL: ' + this.medicamento.dtFinal);
    if(this.crianca.medicamentos === null || this.crianca.medicamentos === undefined){
       this.crianca.medicamentos = [];
    }
    this.crianca.medicamentos.push(this.medicamento);
    this.medicamento = new Medicamento(null,'','','',null);
  }


  private criarCriancaFake():void{
      this.crianca.pessoa.nome = 'Mariana Da Cruz Ortiz Silva';  
      this.crianca.matricula = '123456789';
      this.crianca.sexo = 'FEMININO';
      this.crianca.dtNascimento = new Date();

      this.crianca.contato.responsavel = 'Luciano Ortiz Silva';
      this.crianca.contato.email = 'lucianoortizsilva@gmail.com';
      this.crianca.contato.fonePrincipal = '51 9 8107 4804';
      this.crianca.contato.foneOutro = '51 3333 3333';
      
      this.crianca.endereco.cep = '91720090';
      this.crianca.endereco.logradouro = 'Rua Professor Carvalho Freitas, 115 casa 10';
      this.crianca.endereco.localizacao = 'Porto Alegre - RS';
      
  }

}