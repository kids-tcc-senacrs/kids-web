import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {Routes, RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

//components de terceiros
import { AuthService} from 'angular2-google-login';

//meus servicos
import { LoginService } from './login.service';

import { AppComponent } from './app.component';

//meus components
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { LoginComponent } from './login/login.component';
import { UsuarioNaoCadastradoComponent } from './usuario-nao-cadastrado/usuario-nao-cadastrado.component';
import { TemplateUsuarioInativoComponent } from './template-usuario-inativo/template-usuario-inativo.component';
import { PerfilComponent } from './perfil/perfil.component';

const appRoutes: Routes = [
 { path: 'perfil', component: PerfilComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PerfilUsuarioComponent,
    LoginComponent,
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
              {provide: APP_BASE_HREF, useValue: '/kids'}],
  bootstrap: [AppComponent]
})
export class AppModule {}