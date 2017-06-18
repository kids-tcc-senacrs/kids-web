import { Component,OnInit, NgZone} from '@angular/core';
import {AuthService, AppGlobals} from 'angular2-google-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css']
})
export class AppComponent implements OnInit {

constructor() {
  AppGlobals.GOOGLE_CLIENT_ID = '359998324820-m1dblqglo4c4v4qtbcat59mmma0fjb1d.apps.googleusercontent.com';  
}

ngOnInit() {}

}