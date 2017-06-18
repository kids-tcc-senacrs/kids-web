import {Injectable,OnInit, NgZone} from '@angular/core';
import {AuthService, AppGlobals} from 'angular2-google-login';
import {RestUsuarioService} from './rest-usuario.service';
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

  constructor(private auth: AuthService, private zone: NgZone, private router: Router, private restUsuario:RestUsuarioService) { 
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
      this.buscarUsuarioCadastrado(this.email);
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

  private buscarUsuarioCadastrado(email:string):void{
    this.restUsuario.getUsuario(email)
                    .subscribe( data => this.redirectPage(data),
                               error => this.redirectPageError(this.errorMessage = <any>error)
                              );
    
  }

  private redirectPage(usuario:any):void{
    this.usuario = usuario;
    if(this.usuario === null || this.usuario === undefined){
       this.router.navigate(['/home/usuario-nao-cadastrado']);
    }else if(this.usuario.ativo){
       this.router.navigate(['/home/usuario-ativo']);
    }else if(!this.usuario.ativo){
       this.router.navigate(['/home/usuario-inativo']);
    }
  }

  private redirectPageError(erro:string):void{
    this.router.navigate(['/home/servico-indisponivel']);
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