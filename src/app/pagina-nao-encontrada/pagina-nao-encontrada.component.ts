import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.css']
})
export class PaginaNaoEncontradaComponent implements OnInit {

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