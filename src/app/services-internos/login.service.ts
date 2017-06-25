import {Injectable,OnInit, NgZone} from '@angular/core';
import {AuthService, AppGlobals} from 'angular2-google-login';
import {UtilHttpService} from './util-http.service';
import {Router} from '@angular/router';

@Injectable()
export class LoginService implements OnInit{

  private token: string;
  private nome: string;
  private email: string;
  private imageURL: string; 
  private usuario:any = null;
  private errorMessage: string = null;
  private solicitouAutenticacaoGoogle : boolean = false; 

  constructor(private auth: AuthService, private zone: NgZone, private router: Router, private restUsuario:UtilHttpService) { 
    console.log('[KIDS] serviço de login iniciado...');
    if(!this.solicitouAutenticacaoGoogle){
      console.log('[KIDS] aguardando autenticação com conta google...');
      setTimeout(() => { this.login() }, 1000);
      this.solicitouAutenticacaoGoogle = true;
    }
  }
  
  ngOnInit() {}

  login() {
    this.auth.authenticateUser((result) => {
      this.zone.run(() => {
      this.token = localStorage.getItem('token');
      this.imageURL = localStorage.getItem('image');
      this.nome = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
      console.log('[KIDS] usuario autenticado com sucesso...');
      this.router.navigate(['/home']);
      });
    });
  }

  logout() {
    console.log('[KIDS] realizando logout...');
    this.token = null;
    this.imageURL = null;
    this.nome = null;
    this.email = null;
    let scopeReference = this;
    this.auth.userLogout(function () {
      localStorage.removeItem('token');
      localStorage.removeItem('image');
      localStorage.removeItem('name');
      localStorage.removeItem('email'); 
    });
  }

  public getNome():string{
    return this.nome;
  }

  public getEmail():string{
    return this.email;
  }

  public getImageURL():string{
    return this.imageURL;
  }

  public getToken():string{
    return this.token;
  }

  public getUsuario():any{
    return this.usuario;
  }

  public getErrorMessage():string{
    return this.errorMessage;  
  }

}