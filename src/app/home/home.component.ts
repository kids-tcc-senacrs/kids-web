import {Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';
import {RestUsuarioService} from '../rest-usuario.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  protected usuario:any = null;
  private nome:string = null;
  protected errorMessage: string = null;

  constructor(protected loginService: LoginService, protected router: Router,protected restUsuario:RestUsuarioService) {
    if(this.loginService.getToken() === null){
      this.router.navigate(['/login']);
    }
  }

  logout():void{
	  this.loginService.logout();
  }

  
  ngOnInit() {
  let contador = 0;
  let timer = setInterval(() => { 
      this.nome = this.loginService.getNome();
      this.usuario = this.loginService.getUsuario();
      if(contador >= 5){
        clearInterval(timer);
      }
      contador++;
    }
  , 1000)
}
   
}