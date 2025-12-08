import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { DrawerService } from 'src/app/services/drawer.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  headerTitle = window.innerWidth > 768 ? "Shop Management System" : "SMS";
  constructor(private _product:ProductService,private Router:Router,private drawerService: DrawerService){
  }
  sideBarOpen=true;
  async logout(){
   if(this.Router.url.slice(1,6) == "user"){
    await this._product.removeUserLoginToken("userlogintoken");
   const isToken =await this._product.getUserLoginToken();
   await localStorage.removeItem("checkout");
   await localStorage.removeItem("userProfile");
    if(isToken==null){
      this.Router.navigate(["/"])
      this._product.refresh();
    }
   }else{
    await this._product.removeUserLoginToken("adminlogintoken");
    const isToken =await this._product.getAdminLoginToken();
     if(isToken==null){
       this.Router.navigate(["/"])
       this._product.refresh();
     }
   }
   
  }
  sidebar(){
    if(window.innerWidth > 768){
      this.sideBarOpen = true;
    }else{
      this.sideBarOpen=false;
      
    }
  }
  
  ngAfterViewInit() {
  this.drawerService.setDrawer(this.drawer);
  }

  ngOnInit(){
    this.sidebar();
  }
}
