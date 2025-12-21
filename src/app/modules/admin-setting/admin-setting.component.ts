import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
interface ADMINPASSWORD{
  oldpassword:string,
  newpassword:string,
  confirmpassword:string
}
@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.css']
})
export class AdminSettingComponent {
 constructor(private _product:ProductService,private _snackbar: SnackbarService){}
 isLoader:boolean = true;
 ispopupStatus:boolean=false;
 popupMsg="";
 isError:boolean=false ;
 isErrorMsg=""
 adminPassword:ADMINPASSWORD = {
  oldpassword:"",
  newpassword:"",
  confirmpassword:"",
}
adminProfile = {
  shopId:"",
  shopName:"",
  ownerName:"",
  mobileNo:"",
  address:"",
  email:"",
}
isLoaderSubmit:boolean = false;
onChangePassword(form:any){
   if (form.invalid) {
    return;
  }
  this.isLoaderSubmit = true;
  this.adminPassword.oldpassword = btoa(form.value.oldpassword+`_${Date.now()}`);
  this.adminPassword.newpassword = btoa(form.value.newpassword+`_${Date.now()}`);
  this.adminPassword.confirmpassword = btoa(form.value.confirmpassword+`_${Date.now()}`);
  this._product.update_AdminPsw(this.adminPassword).subscribe((res:any)=>{
    form.resetForm();
    this.isLoaderSubmit = false;
    this._snackbar.openSnackBar("Password changed successfully", "X");
  },(err)=>{
    this.isLoaderSubmit = false;
    this._snackbar.openSnackBar(err.error.message, "X");
  })
}

EmptyAllFields(){
      this.adminPassword.oldpassword="";
      this.adminPassword.newpassword="";
      this.adminPassword.confirmpassword="";
}

getAdminProfile(){
  this._product.get_AdminProfile().subscribe((res:any)=>{
    this.adminProfile.shopId = res.data.shopId
    this.adminProfile.shopName = res.data.shopName
    this.adminProfile.ownerName = res.data.ownerName
    this.adminProfile.mobileNo = res.data.mobileNo
    this.adminProfile.address = res.data.address
    this.adminProfile.email = res.data.email
    this.isLoader=false;

  })
}

ngOnInit(){
  this.getAdminProfile()
}

}
