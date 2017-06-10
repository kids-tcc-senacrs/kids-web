import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }