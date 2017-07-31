import { UtilHttpService } from './../../services-internos/util-http.service';
import { LoginService } from './../../services-internos/login.service';
import { Usuario } from './../../model/usuario';
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
  private errorMessage: string = null;
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
  private usuarioLogado: Usuario; 

  constructor(private googleMap:GoogleMapService, 
              private criancaService:CriancaService, 
              private router: Router,
              private loginService: LoginService,
              private usuarioService:UtilHttpService) {}
  
  ngOnInit() {
    this.usuarioService.get(this.loginService.getEmail()).subscribe( data => this.usuarioLogado = data ,error => this.redirectPageError(this.errorMessage = <any>error));
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

  private redirectPageError(erro:string):void{
    this.router.navigate(['/home/servico-indisponivel']);
  }  

}