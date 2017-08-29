import { FamiliaService } from './../../services-internos/familia.service';
import { CriancaFamiliaVO } from './../../vo/crianca-familia-vo';
import { Familia } from './../../model/familia';
import { CriancaFamilia } from './../../model/crianca-familia';
import { Contato } from './../../model/contato';
import { Endereco } from './../../model/endereco';
import { Pessoa } from './../../model/pessoa';
import { Response } from '@angular/http';
import { Creche } from './../../model/creche';
import { Usuario } from './../../model/usuario';
import { Router } from '@angular/router';
import { CrecheService } from './../../services-internos/creche.service';
import { CriancaService } from './../../services-internos/crianca.service';
import { LoginService } from './../../services-internos/login.service';
import { UtilHttpService } from './../../services-internos/util-http.service';
import { Crianca } from './../../model/crianca';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css']
})
export class FamiliaComponent implements OnInit {
  
  private title = 'Vincular usuários com crianças';
  private criancas: Crianca[] = null;
  private usuarioLogado:Usuario = null;
  private crecheLogada:Creche;
  private messagesError: string[] = null;
  private messageSuccess: string = null;
  private pessoa:Pessoa = new Pessoa(null, null, new Endereco());
  private criancaFamilia = null;
  private criancaFamiliaList:CriancaFamilia[] = null;
  private criancaFamiliaVO:CriancaFamiliaVO = new CriancaFamiliaVO(null,'','','',true)
  private hiddenCadastro:boolean = true;
  private hiddenPesquisa:boolean = false;
  private filtro:string;
  private parentescos: string[] = ['PAI', 'MÃE', 'TIO', 'TIA', 'VÔ', 'VÓ', 'PADRINHO', 'MADRINHA', 'PRIMO', 'PRIMA', 'IRMÃO', 'IRMÃ', 'AMIGO', 'AMIGA', 'OUTROS'];
  private titleButtonAddFamiliar:string = 'Add e Salvar';
  private titleButtonDeleteVinculo:string = 'Remover';
  private titleButtonSalvar:string = 'Salvar';
  private titleBtnVoltar:string = 'Voltar';

  constructor(private usuarioService:UtilHttpService, 
              private loginService: LoginService, 
              private criancaService:CriancaService,
              private crecheService:CrecheService,
              private familiaService:FamiliaService,
              private router: Router) {
   }

  ngOnInit() {
    let crianca:Crianca = new Crianca(null,null,null,null,null,this.pessoa,new Contato(), new Creche(), null, null);
    let familia:Familia = new Familia(null, new Pessoa(null,null));
    this.criancaFamilia =new CriancaFamilia(null,crianca,familia,null,null);

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

editar(c:Crianca):void{
    this.criancaFamilia.crianca = c;
    this.familiaService.get(this.criancaFamilia.crianca).subscribe( data => this.criancaFamiliaList =  data,error => this.catchError(this.messagesError = <any>error));
    this.hiddenCadastro = false;
    this.hiddenPesquisa = true;
}

exibirTelaPesquisa():void{
    this.clearMessages();
    this.hiddenCadastro = true;
    this.hiddenPesquisa = false;
    this.criancaFamilia =  new CriancaFamilia(null,null,null,null,null);
  }

  private clearMessages():void{
      this.messageSuccess = null;
      this.messagesError = null;
  }

  vincularFamiliar():void{
    this.clearMessages();
    if(this.criancaFamiliaVO.nome === null  ||
       this.criancaFamiliaVO.email === null ||
      this.criancaFamiliaVO.nome.trim().length === 0  ||
       this.criancaFamiliaVO.email.trim().length === 0 ||
       this.criancaFamiliaVO.parentesco === null || 
       this.criancaFamiliaVO.parentesco === undefined || 
       this.criancaFamiliaVO.parentesco === ''
       ){
       this.messagesError =  ['Para vincular um familiar, preencha todos os campos'!];
    }else{
      this.clearMessages();
      this.titleButtonSalvar = "Enviando..."; 
      this.criancaFamiliaVO.criancaId = this.criancaFamilia.crianca.id;
      this.criancaFamiliaVO.ativo = true;
      this.familiaService.post(this.criancaFamiliaVO).subscribe( data => this.catchResponse(data),res => this.catchError(res));   
      this.titleButtonSalvar = "Salvar";    
      this.messageSuccess = "Familiar vinculado com sucesso!";                                    
    }
  }

  removerVinculo(index:number, id:number):void{
    this.clearMessages();
    for (var i = 0; i < this.criancaFamiliaList.length; i++) {
      if(i === index) {
        this.criancaFamiliaList.splice(index, 1);
        this.familiaService.delete(id)
                           .subscribe( data => this.catchResponseCode(data),
                                        res => this.catchError(res));   
      }
    }
  }

 private catchResponseCode(result:Response):void{
     this.messageSuccess = "Vinculo de familiar removido com sucesso!";                                    
 }

  private catchResponse(result:CriancaFamilia[]):void{
    this.criancaFamiliaList = result;
    this.criancaFamiliaVO.nome = null;
    this.criancaFamiliaVO.email = null;
    this.criancaFamiliaVO.parentesco = null;
  }
  

  listarCriancas():void{
    this.hiddenCadastro = true;
    this.hiddenPesquisa = false; 
  }

}