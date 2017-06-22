import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pagina-acesso-negado',
  templateUrl: './pagina-acesso-negado.component.html',
  styleUrls: ['./pagina-acesso-negado.component.css']
})
export class PaginaAcessoNegadoComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    this.redirectToLogin();
  }

  private redirectToLogin():void{
    let contador:number = 0;
    let timer = setInterval(() => { 
      if(contador > 0){
        clearInterval(timer);
        this.router.navigate(['/login']);      
      }else{
        contador++; 
      }    
    }, 4000);
  }

}
