import {Component, OnInit} from '@angular/core';
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
  private titleButton = "Concluir Atualizações";
  title = "Perfil";

  constructor(private googleMap:GoogleMapService, private loginService: LoginService, private router: Router, private restUsuario: UtilHttpService) {}

  ngOnInit() {
     this.restUsuario.getUsuario(this.loginService.getEmail())
                    .subscribe( data => this.usuario =  data,                              
                                error => this.redirectPageError(this.errorMessage = <any>error)
                              );
  }

  private onchangeCep(event):void{
	
    if(event === null || event === undefined){
      this.usuario.endereco.localizacao =  '';
       return;
    }

    if (event.length < 8) {
      this.usuario.endereco.localizacao =  '';
      return;
    } else if (event.length > 9) {
      this.usuario.endereco.localizacao =  '';
      return;
    } else if (( event.length === 9 ) && !event.includes('-')) {
      this.usuario.endereco.localizacao =  '';
      return;
    } else if (event.length === 9 && !event.match('[0-9]{5}-[0-9]{3}')) {
      this.usuario.endereco.localizacao =  '';
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
   this.titleButton = "Enviando..."; 
   this.restUsuario.updateUsuario(this.usuario)
                       .subscribe( data =>
                                  { this.usuario = data, 
                                   this.titleButton = "Concluir Atualizações";
                                  },
                                  error => this.redirectPageError(this.errorMessage = <any>error)
                                 );
   }

  private redirectPageError(erro:string):void{
    this.router.navigate(['/home/servico-indisponivel']);
  }

    classesBtnConcluir(): any {
    let cssStyles = {'btn': true,
              'btn-social': true,
              'btn-facebook': true,
              'btn-lg':true,
              'col-xs-12 col-sm-4 col-md-4 col-lg-3' : true,
              'btn-customizado': true
  };
  return cssStyles;

 }

}