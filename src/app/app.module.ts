import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {Routes, RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { GoogleMapService } from './google-map.service';

//components de terceiros
import { AuthService} from 'angular2-google-login';


import { AppComponent } from './app.component';

//meus components / servicos
import { LoginService } from './login.service';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { UsuarioNaoCadastradoComponent } from './usuario-nao-cadastrado/usuario-nao-cadastrado.component';
import { TemplateUsuarioInativoComponent } from './template-usuario-inativo/template-usuario-inativo.component';
import { PerfilComponent } from './perfil/perfil.component';

const appRoutes: Routes = [
  { path: '',redirectTo: '/',pathMatch: 'full'},
  { path: 'perfil', component: PerfilComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    PerfilUsuarioComponent,
    UsuarioNaoCadastradoComponent,
    TemplateUsuarioInativoComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes) 
  ],
  providers: [AuthService, 
              LoginService,
              GoogleMapService,
              {provide: APP_BASE_HREF, useValue: '/kids'}],
  bootstrap: [AppComponent]
})
export class AppModule {}