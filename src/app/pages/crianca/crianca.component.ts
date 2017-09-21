import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Alergia } from './../../model/alergia';
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
  private titleButtonAddMedicamento = 'Adicionar';
  private titleButtonAddAlergia = 'Adicionar';
  private titleButtonDeleteMedicamento = 'Remover';
  private titleButtonDeleteAlergia = 'Remover';
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
  private medicamento: Medicamento = new Medicamento(null,'','','',null);
  private alergia: Alergia = new Alergia(null, '');
  private pessoa:Pessoa = new Pessoa(null, null, new Endereco());
  private crianca:Crianca = new Crianca(null,null,null,null,null,this.pessoa,new Contato(), new Creche(), null, null);
  private sexos: string[] = ['MASCULINO','FEMININO'];

  public uploader:FileUploader = new FileUploader({url: ''});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  private widthBarraProgresso:any = {width:"10%"};
  private widthBarraProgressoTexto:string = "10%";
  private timerBarraProgresso:any = null;
  
  public fileOverBase(e:any):void {
    console.log('a' + e);
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    console.log('b' + e);
    this.hasAnotherDropZoneOver = e;
  }

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
    this.atualizarStylesProgress();
    this.prepararLabelButton();
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
  
  private setCriancasEncontradas(c:Crianca[]):void{
    this.criancas = c;
    clearInterval(this.timerBarraProgresso);  
    this.widthBarraProgresso = {width:"100%"};
    this.widthBarraProgressoTexto = "100%";   
  }

  prepararLabelButton():void{
    if(this.crianca.id === null || this.crianca.id === undefined){
      this.titleButtonSalvar = "Salvar";                                       
    }else{
      this.titleButtonSalvar = "Atualizar";                                       
    }

  }
  
  exibirTelaCadastro():void{
    this.hiddenCadastro = false;
    this.hiddenPesquisa = true;
  }

  
  
  exibirTelaPesquisa():void{
    this.hiddenCadastro = true;
    this.hiddenPesquisa = false;
    this.crianca = new Crianca(null,null,null,null,null,this.pessoa,new Contato(), new Creche(), null, null);
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
      cssStyles = {'text-masculino': true, 'table-line-text':true, 'quebrar-texto':true};
    }else{
      cssStyles = {'text-feminino': true,'table-line-text':true, 'quebrar-texto':true};
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
    this.clearMessages();
  }

  
  
    /**
   * 
   * @param event cep
   * 
   */
  private onchangeCep(event):void{
    if(event === null || event === undefined){
      this.crianca.pessoa.endereco.localizacao =  '';
       return;
    }
    if (event.length < 8) {
      this.crianca.pessoa.endereco.localizacao =  '';
      return;
    } else if (event.length > 9) {
      this.crianca.pessoa.endereco.localizacao =  '';
      return;
    } else if (( event.length === 9 ) && !event.includes('-')) {
      this.crianca.pessoa.endereco.localizacao =  '';
      return;
    } else if (event.length === 9 && !event.match('[0-9]{5}-[0-9]{3}')) {
      this.crianca.pessoa.endereco.localizacao =  '';
      return;
    }
    if (event.length === 8) {
    this.googleMap.getEndereco(this.crianca.pessoa.endereco.cep)
    .subscribe(data => {this.resultGoogleMap = data
                        if(this.resultGoogleMap.status === 'OK'){
						   this.crianca.pessoa.endereco.localizacao = this.resultGoogleMap.results[0].formatted_address;
						}else{
						   this.crianca.pessoa.endereco.localizacao = 'localização não encontrada para o Cep informado!';
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
    //this.crianca.foto = this.uploader;
    this.clearMessages();
    this.titleButtonSalvar = "Enviando..."; 
    this.crianca.creche = this.crecheLogada;    
    if(this.crianca.id === null || this.crianca.id === undefined){
      this.criancaService.post(this.crianca).subscribe( data => this.catchResponse(data),res => this.catchError(res));
    }else{
      this.criancaService.put(this.crianca).subscribe( data => this.catchResponse(data),res => this.catchError(res));
    }
    this.titleButtonSalvar = "Atualizar";                                     
  }

     
  private catchResponse(c:Crianca):void{
      if(this.crianca.id === null || this.crianca.id === undefined){
        this.messageSuccess = 'Criança cadastrada com sucesso';    
      }else{
        this.messageSuccess = 'Criança atualizada com sucesso';     
      }
      let dtNascimentoJson =  JSON.parse(JSON.stringify(c.dtNascimento));
      c.dtNascimento = new Date(dtNascimentoJson.year + '-' + dtNascimentoJson.month + '-' + dtNascimentoJson.dayOfMonth);
      this.ajustarDatasDosMedicamentos(c);
      this.crianca = c;
      this.titleCadastro = 'Atualizar Criança';
  }
  
  ajustarDatasDosMedicamentos(c:Crianca):void{
    if(c.medicamentos !== null && c.medicamentos !== undefined){
      for (var i = 0; i < c.medicamentos.length; i++) {
        let medicamento = c.medicamentos[i];
        let dtFinalJson = JSON.parse(JSON.stringify(medicamento.dtFinal));
        let dtFinalAjustada = new Date(dtFinalJson.year + '-' + dtFinalJson.month + '-' + dtFinalJson.dayOfMonth);
        c.medicamentos[i].dtFinal = dtFinalAjustada;
      }
    }
  }

  adicionarMedicamento():void{
    if(this.medicamento.nome.trim().length === 0 ||
       this.medicamento.dosagem.trim().length === 0 ||
       this.medicamento.intervaloHoras.trim().length === 0 || 
       this.medicamento.dtFinal === null){
       this.messagesError =  ['Para adicionar um medicamento, preencha todos os campos'!];
    }else{
      if(this.crianca.medicamentos === null || this.crianca.medicamentos === undefined){
        this.crianca.medicamentos = [];
      }
      this.crianca.medicamentos.push(this.medicamento);
      this.medicamento = new Medicamento(null,'','','',null);
    }
  }

  removerMedicamento(index:number):void{
    for (var i = 0; i < this.crianca.medicamentos.length; i++) {
      if(i === index) {
        this.crianca.medicamentos.splice(index, 1);
      }
    }
  }

  adicionarAlergia():void{
    if(this.alergia.descricao.trim().length === 0){
       this.messagesError =  ['Para adicionar uma alergia, preencha a descrição'!];
    }else{
      if(this.crianca.alergias === null || this.crianca.alergias === undefined){
        this.crianca.alergias = [];
      }
      this.crianca.alergias.push(this.alergia);
      this.alergia = new Alergia(null,null);
    }
  }

  removerAlergia(index:number):void{
    for (var i = 0; i < this.crianca.alergias.length; i++) {
      if(i === index) {
        this.crianca.alergias.splice(index, 1);
      }
    }
  }
  
  editar(c:Crianca):void{
    let dtNascimentoJson = JSON.parse(JSON.stringify(c.dtNascimento));
    let dtNascimentoAjustada = new Date(dtNascimentoJson.year + '-' + dtNascimentoJson.month + '-' + dtNascimentoJson.dayOfMonth);
    c.dtNascimento = dtNascimentoAjustada;
    if(c.medicamentos !== null){
      for (var i = 0; i < c.medicamentos.length; i++) {
        let dtFinal = JSON.parse(JSON.stringify(c.medicamentos[i].dtFinal));
        let dtFinalAjustada = new Date(dtFinal.year + '-' + dtFinal.month + '-' + dtFinal.dayOfMonth);        
        c.medicamentos[i].dtFinal = dtFinalAjustada;
      }
    }
    this.crianca = c;
    this.exibirTelaCadastro();
  }

  uploadFoto():void{
    console.log("upload foto");
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