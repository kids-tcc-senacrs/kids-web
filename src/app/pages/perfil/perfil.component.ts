import {Response} from '@angular/http';
import {Component, OnInit} from '@angular/core';
import {GoogleMapService} from '../../services-externos/google-map.service';
import {LoginService} from '../../services-internos/login.service';
import {UtilHttpService } from '../../services-internos/util-http.service';
import {Router} from '@angular/router';
import {Usuario} from '../../model/usuario';
import {Endereco} from '../../model/endereco';
import {Pessoa} from './../../model/pessoa';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private usuario:Usuario = new Usuario(null,'','','',false, new Pessoa(null, '', new Endereco(null, '','','')));

  private resultGoogleMap:any;
  private titleButton = "Concluir Atualizações";
  private title = "Perfil";
  private messagesError: string[] = null;
  private messageSuccess: string = null;

  constructor(private googleMap:GoogleMapService, private loginService: LoginService, private router: Router, private restUsuario: UtilHttpService) {}
  


  ngOnInit() {
     this.restUsuario.get(this.loginService.getEmail()).subscribe( data => this.usuario = data,                                                                                                    
                                                                  error => this.catchError(this.messagesError = <any>error)
                                                                 );
  }

  private onchangeCep(event):void{

    if(event === null || event === undefined){
      this.usuario.pessoa.endereco.localizacao =  '';
       return;
    }
    if (event.length < 8) {
      this.usuario.pessoa.endereco.localizacao =  '';
      return;
    } else if (event.length > 9) {
      this.usuario.pessoa.endereco.localizacao =  '';
      return;
    } else if (( event.length === 9 ) && !event.includes('-')) {
      this.usuario.pessoa.endereco.localizacao =  '';
      return;
    } else if (event.length === 9 && !event.match('[0-9]{5}-[0-9]{3}')) {
      this.usuario.pessoa.endereco.localizacao =  '';
      return;
    }
    if (event.length === 8) {

    this.googleMap.getEndereco(this.usuario.pessoa.endereco.cep)
    .subscribe(data => {this.resultGoogleMap = data
                        if(this.resultGoogleMap.status === 'OK'){
						   this.usuario.pessoa.endereco.localizacao = this.resultGoogleMap.results[0].formatted_address;
						}else{
						   this.usuario.pessoa.endereco.localizacao = 'localização não encontrada para o Cep informado!';
						}}, 
						error => this.messagesError = <any>error,);
    }

  }

  onfocusCep(){
    this.clearMessages();
  }

  onfocusLogradouro(){
    this.clearMessages();
  }

  onfocusTelefone(){
    this.clearMessages();
  }

  private atualizarPerfil():void{
   this.clearMessages();
   this.titleButton = "Enviando..."; 
   this.restUsuario.put(this.usuario)
                       .subscribe( data => this.catchResponse(data),
                                    res => this.catchError(res));
   }

  private catchResponse(r:Response):void{
    if(r.status === 200){
      this.titleButton = "Concluir Atualizações";
      this.messageSuccess = 'Perfil atualizado com sucesso';    
    }
  }

  private catchError(r:Response):void{
    if(r.status === 400 || r.status === 409){
      this.messagesError = r.json().messages;
    }else{
      this.router.navigate(['/home/servico-indisponivel']);
    }
    this.titleButton = "Concluir Atualizações";
  }

  private clearMessages():void{
      this.messageSuccess = null;
      this.messagesError = null;
  } 

}