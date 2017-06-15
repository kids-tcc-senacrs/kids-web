import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
//import {HTTP_PROVIDERS } from '@angular/http';

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

@NgModule({
  declarations: [
    AppComponent,
    PerfilUsuarioComponent,
    MenuComponent,
    LoginComponent,
    UsuarioNaoCadastradoComponent,
    TemplateUsuarioInativoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  providers: [AuthService, 
              LoginService,
              {provide: APP_BASE_HREF, useValue: '/kids'}],
  bootstrap: [AppComponent]
})
export class AppModule {}