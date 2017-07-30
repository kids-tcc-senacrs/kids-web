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
  private messagesError: string[] = null;
  private messageSuccess: string = null;
  private crianca:Crianca = new Crianca(null,null,null,null,null,null,null);
  private sexos: string[] = ['Masculino','Feminino'];
  
  constructor() {}
  ngOnInit() {}

  onfocus(){
    this.clearMessages();
  }

  private clearMessages():void{
      this.messageSuccess = null;
      this.messagesError = null;
  }

}