import { DiarioService } from './../../services-internos/diario.service';
import { DiarioVO } from './../../vo/diario-vo';
import { DiarioDTO } from './../../dto/diario-dto';
import { CrecheService } from './../../services-internos/creche.service';
import { Creche } from './../../model/creche';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { LoginService } from './../../services-internos/login.service';
import { UtilHttpService } from './../../services-internos/util-http.service';
import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css']
})
export class DiarioComponent implements OnInit {

  private title = 'Diário';
  private usuarioLogado:Usuario;
  private crecheLogada:Creche;
  private tipoDiarioSelecionado:string;
  private tipoDiarioSelecionadoAndRenomeado:string;
  private messagesError: string[] = null;
  private diarioDTO:DiarioDTO=null;
  private diariosVO:DiarioVO[];
  private ultimaNotaSelecionada:string;
  private titleButtonSalvar:string = "Salvar";
  private tipos: string[] = ['Não Avaliado','POUCO', 'NORMAL', 'MUITO'];
  private messageSuccess: string = null;

  constructor(private usuarioService:UtilHttpService, 
              private loginService: LoginService, 
              private crecheService:CrecheService,
              private diarioService:DiarioService,
              private router: Router) {    
   }

  ngOnInit() {
    this.usuarioService.get(this.loginService.getEmail()).subscribe( data => this.usuarioLogado =  data,error => this.catchError(this.messagesError = <any>error));
    let timer = setInterval(() => { 
      if(this.usuarioLogado !== null && this.usuarioLogado !== undefined){
        if(this.usuarioLogado.tipo === 'CRECHE'){
           this.crecheService.get(this.usuarioLogado).subscribe( data => this.crecheLogada =  data,error => this.catchError(this.messagesError = <any>error));
        }
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

  private exibirTipoDiario(tipo:string):void{
    this.clearMessages();
    this.tipoDiarioSelecionado = tipo;    
    this.renomearTipo();
    
    if(this.usuarioLogado.tipo === 'CRECHE'){
      this.diarioDTO = new DiarioDTO(null,null,this.crecheLogada.id,this.tipoDiarioSelecionado,null);
      this.diarioService.get(this.diarioDTO, 'CRECHE', null).subscribe( data => this.diariosVO =  data,error => this.catchError(this.messagesError = <any>error));
    }else if(this.usuarioLogado.tipo === 'FAMILIAR'){
      this.diarioDTO = new DiarioDTO(null,null,null,this.tipoDiarioSelecionado,null);
      this.diarioService.get(this.diarioDTO, 'FAMILIAR', this.usuarioLogado.id).subscribe( data => this.diariosVO =  data,error => this.catchError(this.messagesError = <any>error));
    }
    
  }

  renomearTipo():void{
    if('REFEICAO_CAFE_MANHA' === this.tipoDiarioSelecionado){
      this.tipoDiarioSelecionadoAndRenomeado = 'Café da Manhã';
    }else if('REFEICAO_CAFE_TARDE' === this.tipoDiarioSelecionado){
      this.tipoDiarioSelecionadoAndRenomeado = 'Café da Tarde';
    }else if('REFEICAO_ALMOCO' === this.tipoDiarioSelecionado){
      this.tipoDiarioSelecionadoAndRenomeado = 'Almoço';
    }else if('REFEICAO_JANTA' === this.tipoDiarioSelecionado){
      this.tipoDiarioSelecionadoAndRenomeado = 'Janta';
    }else if('EVACUACAO' === this.tipoDiarioSelecionado){
      this.tipoDiarioSelecionadoAndRenomeado = 'Evacuação';
    }else if('SONO' === this.tipoDiarioSelecionado){
      this.tipoDiarioSelecionadoAndRenomeado = 'Sono';
    }
  }


classesTableLine(sexo:string): any {
 let cssStyles = {};
    if(sexo === 'MASCULINO'){
      cssStyles = {'text-masculino': true, 'table-line-text':true, 'quebrar-texto':true, 'texto-centralizado':true};
    }else{
      cssStyles = {'text-feminino': true,'table-line-text':true, 'quebrar-texto':true, 'texto-centralizado':true};
    }
  return cssStyles; 
}

setNota(diario:DiarioVO, notaDiario:string){
    this.clearMessages();
    diario.nota = notaDiario;    
}

isChecked(diario:DiarioVO, notaAtual:string):boolean{
  if(diario.nota == notaAtual){
    return true;
  }else{
    return false;
  }
}

getNameRadioButton(index:number):string{
  return "" + index + "";
}

salvar():void{
    this.titleButtonSalvar = "Enviando..."; 
    let diariosDTO:DiarioDTO[] = [];
    for (var i = 0; i < this.diariosVO.length; i++) {
      let diarioVO:DiarioVO = this.diariosVO[i];
      let diarioDTO:DiarioDTO = new DiarioDTO(diarioVO.diarioId, diarioVO.criancaId, this.crecheLogada.id, this.tipoDiarioSelecionado, diarioVO.nota);
      diariosDTO.push(diarioDTO);
    }
    this.diarioService.post(diariosDTO).subscribe( data => this.catchResponse(data),res => this.catchError(res));
    this.titleButtonSalvar = "Atualizar";                                     
    this.clearMessages();
  }

  private clearMessages():void{
      this.messageSuccess = null;
      this.messagesError = null;
  }

 private catchResponse(diariosSalvos:DiarioVO[]):void{
   this.diariosVO =diariosSalvos;
   this.messageSuccess = "Diário atualizado com sucesso!";    
 }

}