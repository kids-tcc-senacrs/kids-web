import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

//components de terceiros
import { AuthService} from 'angular2-google-login';

//meus servicos
import { LoginService } from './login.service';

import { AppComponent } from './app.component';

//meus components
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { UsuarioNaoCadastradoComponent } from './usuario-nao-cadastrado/usuario-nao-cadastrado.component';
import { TemplateUsuarioInativoComponent } from './template-usuario-inativo/template-usuario-inativo.component';
import { HomeConteudoLeftComponent } from './home/home-conteudo-left/home-conteudo-left.component';
import { HomeConteudoCenterComponent } from './home/home-conteudo-center/home-conteudo-center.component';
import { HomeConteudoRightComponent } from './home/home-conteudo-right/home-conteudo-right.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilUsuarioComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    UsuarioNaoCadastradoComponent,
    TemplateUsuarioInativoComponent,
    HomeConteudoLeftComponent,
    HomeConteudoCenterComponent,
    HomeConteudoRightComponent        
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  providers: [AuthService, LoginService],////coloquei aqui pq toda aplicacao ira usar
  bootstrap: [AppComponent]
})
export class AppModule { }