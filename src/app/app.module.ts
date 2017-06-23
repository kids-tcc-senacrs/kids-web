import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { GoogleMapService } from './google-map.service';
import { UtilHttpService } from './util-http.service';

//components de terceiros
import { AuthService } from 'angular2-google-login';


import { AppComponent } from './app.component';

//meus components / servicos
import { LoginService } from './login.service';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { UsuarioNaoCadastradoComponent } from './usuario-nao-cadastrado/usuario-nao-cadastrado.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DefaultComponent } from './default/default.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { UsuarioInativoComponent } from './usuario-inativo/usuario-inativo.component';
import { UsuarioAtivoComponent } from './usuario-ativo/usuario-ativo.component';
import { ServicoIndisponivelComponent } from './servico-indisponivel/servico-indisponivel.component';
import { PaginaAcessoNegadoComponent } from './pagina-acesso-negado/pagina-acesso-negado.component';

const routes: Routes = [
    { path: '',       redirectTo: 'login',pathMatch: 'full'},
    { path: 'login',   component: LoginComponent},
    { path: 'usuario-nao-cadastrado',component: UsuarioNaoCadastradoComponent},
    { path: 'pagina-acesso-negado', component: PaginaAcessoNegadoComponent},
    
    { path: 'home',    component: HomeComponent,
      children: [
                  { path: 'usuario-inativo',component: UsuarioInativoComponent },
                  { path: 'usuario-ativo',component: UsuarioAtivoComponent },
                  { path: 'servico-indisponivel',component: ServicoIndisponivelComponent },
                  { path: 'perfil',  component: PerfilComponent}
                ]
    },
    { path: '**',      component: PaginaNaoEncontradaComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PerfilUsuarioComponent,
    UsuarioNaoCadastradoComponent,
    PerfilComponent,
    DefaultComponent,
    LoginComponent,
    HomeComponent,
    PaginaNaoEncontradaComponent,
    UsuarioInativoComponent,
    UsuarioAtivoComponent,
    ServicoIndisponivelComponent,
    PaginaAcessoNegadoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    RouterModule.forRoot(routes) 
  ],
  providers: [AuthService, 
              LoginService,
              GoogleMapService,
              UtilHttpService,
              {provide: APP_BASE_HREF, useValue: '/kids'}],
  bootstrap: [AppComponent]
})
export class AppModule {}