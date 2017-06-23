import {Component, OnInit} from '@angular/core';
import {AuthService, AppGlobals} from 'angular2-google-login';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  login():void{
    console.log('[KIDS] iniciando autenticação com conta google ...');
    this.loginService.login();
  }

  classesBtnLogin(): any {
    let cssStyles = {'btn': true,
              'btn-social': true,
              'btn-google': true,
              'col-sm-offset-8 col-md-offset-8 col-lg-offset-9': true,
              'col-xs-12 col-sm-4 col-md-4 col-lg-3' : true};
  return cssStyles; 
  }

}