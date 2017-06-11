import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';

//components de terceiros
import { AuthService} from 'angular2-google-login';

//meus servicos
import { LoginService } from './login.service';

import { AppComponent } from './app.component';

//meus components
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { TipoUsuarioComponent } from './tipo-usuario/tipo-usuario.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilUsuarioComponent,
    TipoUsuarioComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'perfil',component : PerfilUsuarioComponent}
      ]
    )
  ],
  providers: [AuthService, LoginService],////coloquei aqui pq toda aplicacao ira usar
  bootstrap: [AppComponent]
})
export class AppModule { }