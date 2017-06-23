import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule } from '@angular/forms';
import {GoogleMapService} from '../google-map.service';
import {LoginService} from '../login.service';
import {UtilHttpService} from '../util-http.service';
import {Router} from '@angular/router';
import {Usuario} from '../model/Usuario';
import {Endereco} from '../model/Endereco';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  
  private resultGoogleMap:any;
  private errorMessage: string = null;
  private usuario:Usuario = new Usuario(null,'','','','',false, new Endereco(null, '', '', ''));

  constructor(private googleMap:GoogleMapService, private loginService: LoginService, private router: Router, private restUsuario: UtilHttpService) {}

  ngOnInit() {
     this.restUsuario.getUsuario(this.loginService.getEmail())
                    .subscribe( data => this.usuario =  data,                              
                                error => this.redirectPageError(this.errorMessage = <any>error)
                              );
  }

  private onchangeCep(event):void{
	
    if(event === null || event === undefined){
       return;
    }

    if (event.length < 8) {
      return;
    } else if (event.length > 9) {
      return;
    } else if (( event.length === 9 ) && !event.includes('-')) {
      return;
    } else if (event.length === 9 && !event.match('[0-9]{5}-[0-9]{3}')) {
      return;
    }
    
    if (event.length === 8) {

    this.googleMap.getEndereco(this.usuario.endereco.cep)
                  .subscribe(data => 
                            {this.resultGoogleMap = data
                             if(this.resultGoogleMap.status === 'OK'){
                              this.usuario.endereco.localizacao = this.resultGoogleMap.results[0].formatted_address;
                             }else{
                              this.usuario.endereco.localizacao = 'localização não encontrada!';
                             }   
                            }, 
                            error => this.errorMessage = <any>error,);
    }

  }

  private atualizarPerfil():void{
   this.restUsuario.updateUsuario(this.usuario)
                       .subscribe( data => this.redirectPage(data),
                                  error => this.redirectPageError(this.errorMessage = <any>error)
                                 );
   }

  private redirectPage(usuario:Usuario):void{
    this.usuario = usuario;
    this.router.navigate(['/home']);
  }

  private redirectPageError(erro:string):void{
    this.router.navigate(['/home/servico-indisponivel']);
  }

    classesBtnConcluir(): any {
    let cssStyles = {'btn': true,
              'btn-social': true,
              'btn-facebook': true,
              'col-sm-offset-2': true,
              'col-md-offset-2': true,
              'col-lg-offset-3': true,
              'btn-lg':true,
              'col-xs-12 col-sm-4 col-md-4 col-lg-3' : true,
              'btn-customizado': true
  };
  return cssStyles;

    }

}