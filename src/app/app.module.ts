import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthService} from 'angular2-google-login';

//meus servicos
import { LoginService } from './login.service';

import { AppComponent } from './app.component';

//meus components
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AuthService, LoginService],////coloquei aqui pq toda aplicacao ira usar
  bootstrap: [AppComponent]
})
export class AppModule { }