import {Component, OnInit} from '@angular/core';
import {GoogleMapService} from '../google-map.service';
import {LoginService} from '../login.service';
import {RestUsuarioService} from '../rest-usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private cep:string = '';
  private endereco:any = {};
  private logradouro:string;
  private errorMessage: string = null;
  private usuario:any;

  constructor(private googleMap:GoogleMapService, 
              private loginService: LoginService,
              private router: Router, 
              private restUsuario: RestUsuarioService) {}

  ngOnInit() {
    this.usuario = this.loginService.getUsuario();
  }

  onchangeCep(event):void{
	
	if (event.length < 8) {
		return;
	} else if (event.length > 9) {
		return;
	} else if (( event.length === 9 ) && !event.includes('-')) {
		return;
	} else if (event.length === 9 && !event.match('[0-9]{5}-[0-9]{3}')) {
		return;
	} else if (event.length === 8 && event.includes('-')) {
		return;
	}
	
  if (event.length === 9) {
		var cepSplitted = event.split('-');
		event = cepSplitted[0] + cepSplitted[1];
    this.cep = event;
	}
  
  this.googleMap.getEndereco(event)
                .subscribe(data => 
                          {this.endereco = data
                           this.logradouro = this.endereco.results[0].formatted_address;
                          }, 
                          error => this.errorMessage = <any>error,);
  }

  atualizarPerfil():void{
    alert('em desenvolvimento');
    /*
    let endereco:any = {logradouro:this.logradouro, cep:this.cep};
    let usuario:any = {  id:this.usuario.id, 
                       nome:this.usuario.nome, 
                      email:this.usuario.email, 
                       tipo:this.usuario.tipo, 
                      ativo:this.usuario.ativo,
                   telefone:this.usuario.telefone,
                  endereco: endereco};
    
    this.restUsuario.updateUsuario(this.usuario).subscribe(res => this.usuario = res);
    
    this.router.navigate(['/home'])
    */
  }

}