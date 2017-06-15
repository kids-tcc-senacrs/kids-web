import { Component, OnInit, Renderer } from '@angular/core';
import { LoginService } from '../login.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private nome:string;
  private foto:string;
  public usuario:any;

  constructor(private loginService: LoginService, private app:AppComponent) { 
    this.nome = this.loginService.getNome();
    this.foto = this.loginService.getImageURL();
    this.usuario = this.app.usuario;
  }

  ngOnInit() {}
  
}