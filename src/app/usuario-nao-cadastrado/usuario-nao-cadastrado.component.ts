import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-usuario-nao-cadastrado',
  templateUrl: './usuario-nao-cadastrado.component.html',
  styleUrls: ['./usuario-nao-cadastrado.component.css']
})
export class UsuarioNaoCadastradoComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {}

  logout():void{
    this.loginService.logout();
  }

}