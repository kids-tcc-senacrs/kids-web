import { UtilHttpService } from './../../services-internos/util-http.service';
import { Usuario } from './../../model/usuario';
import { LoginService } from './../../services-internos/login.service';
import { Component, OnInit } from '@angular/core';
import {Response} from '@angular/http';
import { Router } from '@angular/router';
import { CriancaService } from './../../services-internos/crianca.service';
import { Contato } from './../../model/contato';
import { Crianca } from './../../model/crianca';

@Component({
  selector: 'app-crianca',
  templateUrl: './crianca.component.html',
  styleUrls: ['./crianca.component.css']
})
export class CriancaComponent implements OnInit {
  
  private title = "Crianças";
  private criancas: Crianca[] = null;
  private usuarioLogado:Usuario = null;
  private messagesError: string[] = null;
  private filtro:string;

  constructor(private usuarioService:UtilHttpService, private loginService: LoginService, private criancaService:CriancaService,private router: Router) { }

  ngOnInit() {
    this.usuarioService.get(this.loginService.getEmail()).subscribe( data => this.usuarioLogado =  data,error => this.catchError(this.messagesError = <any>error));
    let timer = setInterval(() => { 
      if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
        this.criancaService.get(this.usuarioLogado).subscribe( data => this.criancas =  data,error => this.catchError(this.messagesError = <any>error));
        clearInterval(timer);
      }

    }, 1000);    
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
    let nomeCompleto:string[] = v.nome.split(' '); 
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

}