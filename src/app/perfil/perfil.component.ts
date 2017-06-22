import {Component, OnInit} from '@angular/core';
import {GoogleMapService} from '../google-map.service';
import {LoginService} from '../login.service';
import {UtilHttpService} from '../util-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private cep:string;
  private telefone:string;
  private complemento:string;
  private logradouro:string;
  private endereco:any={};
  private errorMessage: string = null;
  private usuario:any;
  private enderecoJson:string;

  constructor(private googleMap:GoogleMapService, 
              private loginService: LoginService,
              private router: Router, 
              private restUsuario: UtilHttpService) {

                console.log('construtor do perfil');
              }

  ngOnInit() {
    console.log('init do perfil');
     this.restUsuario.getUsuario(this.loginService.getEmail())
                    .subscribe( data => this.usuario = data,
                               error => this.redirectPageError(this.errorMessage = <any>error)
                              );
  }

  private onchangeCep(event):void{
	
    if (event.length < 8) {
      return;
    } else if (event.length > 9) {
      return;
    } else if (( event.length === 9 ) && !event.includes('-')) {
      return;
    } else if (event.length === 9 && !event.match('[0-9]{5}-[0-9]{3}')) {
      return;
    } //else if (event.length === 8 && event.includes('-')) {
      //return;
    //}
    
    if (event.length === 8) {
    
     // var cepSplitted = event.split('-');
    
     // event = cepSplitted[0] + cepSplitted[1];
      console.log('CCCCCCCCCCCC' + event);
      this.cep = event;
      console.log('DDDDDDDDDDDD' + this.cep);
    

    this.googleMap.getEndereco(event)
                  .subscribe(data => 
                            {this.endereco = data
                             if(this.endereco.status === 'OK'){
                              this.logradouro = this.endereco.results[0].formatted_address
                              this.enderecoJson = JSON.stringify(data)
                             }else{
                              this.logradouro = 'endereço não encontrado!'
                              this.enderecoJson = ''
                             }   
                            }, 
                            error => this.errorMessage = <any>error,);
    }
  }

  private onblurTelefone(event):void{
    this.telefone = event;
  }

  private onchangeComplemento(event):void{
    this.complemento = event;
  }
    

  private atualizarPerfil():void{

  alert('ba: ' + this.cep.length);

    let endereco:any = {logradouro:this.logradouro,
                       complemento:this.complemento,
                              cep:this.cep};

    let usuario:any = {  id:this.usuario.id, 
                       nome:this.usuario.nome, 
                      email:this.usuario.email, 
                       tipo:this.usuario.tipo, 
                      ativo:this.usuario.ativo,
                   telefone:this.telefone,
                  endereco: endereco};
    
   this.restUsuario.updateUsuario(usuario)
                   .subscribe( data => this.usuario = data,
                              error => this.redirectPageError(this.errorMessage = <any>error)
                             );
   }

  private redirectPage(usuario:any):void{
    this.usuario = usuario;
    this.router.navigate(['/home']);
  }

  private redirectPageError(erro:string):void{
    this.router.navigate(['/home/servico-indisponivel']);
  }

}