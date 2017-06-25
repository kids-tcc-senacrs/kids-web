import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services-internos/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuario-ativo',
  templateUrl: './usuario-ativo.component.html',
  styleUrls: ['./usuario-ativo.component.css']
})
export class UsuarioAtivoComponent implements OnInit {

  private nome:string = null;

  constructor(private loginService: LoginService,private router: Router) { 
    this.nome = this.loginService.getNome();
    if(this.loginService.getToken() === null || this.loginService.getToken() === undefined){
      this.router.navigate(['/login']);
    }
  }
  
  ngOnInit() {}

}