import { Component, OnInit } from '@angular/core';
import { GoogleMapService } from '../google-map.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private cep:string = null;
  private endereco:any = {};
  private logradouro:string;
  private errorMessage: string = null;

  constructor(private googleMap:GoogleMapService) { }

  ngOnInit() {}

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
	}
  
  this.googleMap.getEndereco(event)
                .subscribe(data => 
                          {this.endereco = data
                           this.logradouro = this.endereco.results[0].formatted_address;
                          }, 
                          error => this.errorMessage = <any>error,);
  }

}