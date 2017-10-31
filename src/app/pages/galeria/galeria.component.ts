import { GaleriaVO } from './../../vo/galeria-vo';
import { Response } from '@angular/http';
import { ApiRestGenericaService } from './../../services-internos/api-rest-generica.service';
import { Router } from '@angular/router';
import { CrecheService } from './../../services-internos/creche.service';
import { LoginService } from './../../services-internos/login.service';
import { UtilHttpService } from './../../services-internos/util-http.service';
import { Creche } from './../../model/creche';
import { Usuario } from './../../model/usuario';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html', 
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  private title = 'Galeria de fotos';
  private messagesError: string[] = null;
  private usuarioLogado:Usuario = null;
  private crecheLogada:Creche;
  private errorMessage: string = null;
  private messageSuccess: string = null;
  private hiddenPesquisa:boolean = false;
  private hiddenCadastroNovo:boolean = true;
  private widthBarraProgresso:any = {width:"10%"};
  private widthBarraProgressoTexto:string = "10%";
  private timerBarraProgresso:any = null;
  private galeria:GaleriaVO = new GaleriaVO(null);

  private API_GALERIA:string = 'galeria/';
  public imgUploaded: string;
  private galerias:GaleriaVO[] = [];
  
  constructor(private usuarioService:UtilHttpService, 
              private loginService: LoginService, 
              private crecheService:CrecheService,
              private router: Router,
              private apiGenerica: ApiRestGenericaService,
              private elem: ElementRef) {          
  }

  public uploadImage(): void {
    console.log('1º DEIXA VISIVEL O SPINNER.GIF');
    this.elem.nativeElement.querySelector('#spinner').style.visibility='visible';

    console.log('2º PEGA O ARQUIVO DE #selectFile');
    let files = this.elem.nativeElement.querySelector('#selectFile').files;

    console.log('3º CRIA UM OBJETO DO TIPO FormData();');
    let formData = new FormData();
    let file = files[0];  
    
    let nomeImagem = this.crecheLogada.id + 'param___descricao' + this.galeria.descricao + 'param_tipo' + file.type;
    
    formData.append('file', file, nomeImagem);//file = DEVE SER EXATAMENTE O MESMO NOME DO PARAMETRO DA API(JAVA/REST)

    console.log('4º CONSUMIR API DE GALERIA DE FOTOS');
    this.apiGenerica.upload(this.API_GALERIA, formData).subscribe(res=> this.dataLoaded(res),error => this.catchError(this.messagesError = <any>error));
  }

  private dataLoaded(data: any): void {
    console.log('5º UPLOAD REALIZADO COM SUCESSO');
    this.imgUploaded = data._body;
    this.galeria = new GaleriaVO(null);
    this.refreshList();
  }

  private getGalerias(r: Response): void {
    if(r.status === 200){
      this.galerias = r.json();
      console.log(this.galerias[0].imagem);
    }
    clearInterval(this.timerBarraProgresso);  
    this.widthBarraProgresso = {width:"100%"};
    this.widthBarraProgressoTexto = "100%";   
    this.elem.nativeElement.querySelector('#spinner').style.visibility='hidden';
  }
  
  private refreshList(): void {
    this.apiGenerica.getById(this.API_GALERIA, this.usuarioLogado.id).subscribe(res=> this.getGalerias(res));
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
          this.refreshList();
        }
        clearInterval(timer);
      }
    }, 1000);    
  }


  setCrecheLogada(creche:Creche){
    this.crecheLogada = creche;
    this.refreshList();
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
      this.elem.nativeElement.querySelector('#spinner').style.visibility='hidden';
    }else{
      this.router.navigate(['/home/servico-indisponivel']);
    }
  }
 
  removerFoto(index:number, galeria:GaleriaVO):void{
    for (var i = 0; i < this.galerias.length; i++) {
      if(i === index) {
        this.galerias.splice(index, 1);
      }
    }
  }

}