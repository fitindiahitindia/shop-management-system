import { Component, NgZone } from '@angular/core';
import { ProductService } from './services/product.service';
import { DialogService } from './services/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SMS';
  constructor(private _product:ProductService, public _dialog:DialogService,private ngZone: NgZone,private router:Router){
  }
  reloadUser(){
    this._product.reloadUser();
  }
  
  ngOnInit(){
    
  }
 
}
