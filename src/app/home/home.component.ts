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

  ngOnInit() {
    this.nome = this.loginService.getNome();
  }
  
}