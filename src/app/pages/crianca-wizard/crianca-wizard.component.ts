import {Response} from '@angular/http';
import { Router } from '@angular/router';
import { CriancaService } from './../../services-internos/crianca.service';
import { GoogleMapService } from './../../services-externos/google-map.service';
import { Contato } from './../../model/contato';
import { Endereco } from './../../model/endereco';
import { Crianca } from './../../model/crianca';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crianca-wizard',
  templateUrl: './crianca-wizard.component.html',
  styleUrls: ['./crianca-wizard.component.css']
})
export class CriancaWizardComponent implements OnInit {
  
  private title = "Cadastrar Criança";
  private titleButtonAnterior = "Anterior";
  private titleButtonProximo = "Próximo";
  private titleButtonSalvar = "Salvar";
  private messagesError: string[] = null;
  private messageSuccess: string = null;
  private resultGoogleMap:any;
  private crianca:Crianca = new Crianca(null,null,null,null,null,null,new Endereco(),new Contato());
  private sexos: string[] = ['Masculino','Feminino'];
  private hiddenPasso1: boolean = false;
  private hiddenPasso2: boolean = true;
  private hiddenPasso3: boolean = true;
  private hiddenPasso4: boolean = true;
  private hiddenPasso5: boolean = true;
    
  constructor(private googleMap:GoogleMapService, private criancaService:CriancaService, private router: Router) {}
  ngOnInit() {}

  private clearMessages():void{
      this.messageSuccess = null;
      this.messagesError = null;
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

  salvar():void{
    this.clearMessages();
    this.titleButtonSalvar = "Enviando..."; 
    this.criancaService.post(this.crianca).subscribe( data => this.catchResponse(data),res => this.catchError(res));
    this.titleButtonSalvar = "Salvar";                                     
  }
   
  private catchResponse(r:Response):void{
    if(r.status === 200){
      this.messageSuccess = 'Criança cadastrada com sucesso';    
    }
  }

  private catchError(r:Response):void{
    if(r.status === 400 || r.status === 409){
      this.messagesError = r.json().messages;
      console.log(this.messagesError);
    }else{
      this.router.navigate(['/home/servico-indisponivel']);
    }
    this.titleButtonSalvar = "Salvar";
  }

}