import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF,CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

//components de terceiros
import { AuthService } from 'angular2-google-login';
import { GoogleMapService } from './services-externos/google-map.service';



//meus components / servicos
import { LoginService } from './services-internos/login.service';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { UsuarioNaoCadastradoComponent } from './pages/usuario-nao-cadastrado/usuario-nao-cadastrado.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { UsuarioInativoComponent } from './pages/usuario-inativo/usuario-inativo.component';
import { UsuarioAtivoComponent } from './pages/usuario-ativo/usuario-ativo.component';
import { ServicoIndisponivelComponent } from './pages/servico-indisponivel/servico-indisponivel.component';
import { BarraTituloComponent } from './util/barra-titulo/barra-titulo.component';
import { UtilHttpService } from './services-internos/util-http.service';
import { CriancaService } from './services-internos/crianca.service';
import { CriancaComponent } from './pages/crianca/crianca.component';
import { CriancaWizardComponent } from './pages/crianca-wizard/crianca-wizard.component';

const routes: Routes = [
    { path: '',       redirectTo: 'login',pathMatch: 'full'},
    { path: 'login',   component: LoginComponent},
    { path: 'usuario-nao-cadastrado',component: UsuarioNaoCadastradoComponent},
    { path: 'home',    component: HomeComponent,
      children: [
                  { path: 'usuario-inativo',component: UsuarioInativoComponent },
                  { path: 'usuario-ativo',component: UsuarioAtivoComponent },
                  { path: 'servico-indisponivel',component: ServicoIndisponivelComponent },
                  { path: 'perfil',  component: PerfilComponent},
                  { path: 'crianca',  component: CriancaComponent}, 
                  { path: 'crianca-wizard',  component: CriancaWizardComponent}                  
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
    LoginComponent,
    HomeComponent,
    PaginaNaoEncontradaComponent,
    UsuarioInativoComponent,
    UsuarioAtivoComponent,
    ServicoIndisponivelComponent,
    BarraTituloComponent,
    CriancaComponent,
    CriancaWizardComponent    
  ],
  imports: [
    CommonModule,
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
              CriancaService,
              {provide: APP_BASE_HREF, useValue: '/kids'}],
  bootstrap: [AppComponent]
})
export class AppModule {}