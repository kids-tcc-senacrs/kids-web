import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-usuario-inativo',
  templateUrl: './usuario-inativo.component.html',
  styleUrls: ['./usuario-inativo.component.css']
})
export class UsuarioInativoComponent implements OnInit {
  
  private nome:string = null;

  constructor(private loginService: LoginService) { 
    this.nome = this.loginService.getNome();
  }

  ngOnInit() {}

}