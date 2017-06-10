import { Injectable,OnInit, NgZone } from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';

@Injectable()
export class LoginService implements OnInit{

  private token: string;
  private nome: string;
  private email: string;
  private imageURL: string; 
  private solicitouAutenticacaoGoogle : boolean = false; 

  constructor(private auth: AuthService, private zone: NgZone) { 
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

}