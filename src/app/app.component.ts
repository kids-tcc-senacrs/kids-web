import { Component,OnInit, NgZone} from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css'], 
  providers:[AuthService]
})
export class AppComponent implements OnInit {
  
private token: string;
private nome: string;
private email: string;
private imageURL: string;  
private solicitouAutenticacaoGoogle : boolean = false;

constructor(private auth: AuthService, private zone: NgZone) { }

  ngOnInit() {
    AppGlobals.GOOGLE_CLIENT_ID = '359998324820-m1dblqglo4c4v4qtbcat59mmma0fjb1d.apps.googleusercontent.com';  
  }
  
  ngAfterViewChecked() {
    if(!this.solicitouAutenticacaoGoogle){
      console.log('[KIDS] - solicitando autenticação com conta google...');
      setTimeout(() => { this.login() }, 100);
      this.solicitouAutenticacaoGoogle = true;
    }
  }

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
    console.log('[KIDS] - realizando logout...');
    let scopeReference = this;
    this.auth.userLogout(function () {
      localStorage.removeItem('token');
      localStorage.removeItem('image');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    });
  }

classesBtnLogin(): any {
  let valores = {
    'btn': true,
    'btn-lg': true,
    'btn-block': true,
    'btn-social': true,
    'btn-google': true,
    'col-md-offset-9': true,
    'btn-posicao': true
  }
  return valores;
}

onclickPerfil():void{}

}