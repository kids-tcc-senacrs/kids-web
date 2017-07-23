import { Router } from '@angular/router';
import { Contato } from './../../model/contato';
import { Crianca } from './../../model/crianca';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crianca',
  templateUrl: './crianca.component.html',
  styleUrls: ['./crianca.component.css']
})
export class CriancaComponent implements OnInit {
  
  private title = "Crianças";
  
  private contato1:Contato = new Contato(1, 'Luciano Ortiz Silva', 'lucianoortizsilva@gmail.com', '51 821549965', '51 333219985');
  private contato2:Contato = new Contato(2, 'Liziane Ortiz Silva', 'lizianeortizsilva@gmail.com', '51 985454122', '51 332211458');
  private crianca1: Crianca = new Crianca(1,'Mariana da Cruz Ortiz Silva', new Date(),'FEMININO','123456789','foto', this.contato1);
  private crianca2: Crianca = new Crianca(2,'Lucas Portella', new Date(),'MASCULINO','123456789','foto', this.contato2);

  private criancas: Crianca[] = [this.crianca1,this.crianca2];
  
  constructor(private router: Router) { }

  ngOnInit() {
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

}