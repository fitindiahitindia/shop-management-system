import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-money-transfer',
  templateUrl: './add-money-transfer.component.html',
  styleUrls: ['./add-money-transfer.component.css']
})
export class AddMoneyTransferComponent {
constructor(private _product:ProductService){

  }

color:ThemePalette="accent"
isFullPageLoad:boolean=false
isCreatePro:boolean=false;
getAllProduct:any=[];
dataFilter:any;
isError="";
category:any[] = [];
createPro={
  senderName:'',
  receiverName:'',
  amount:null,
  charges:null,
  refId:'',
}

// getCategoryHtm(val:any){
//   this.createPro.productCategory=val.value;
// }
addmt(form:any):void{
  this.isError = '';

    if(form.invalid) {
      this.isError = 'Please fill all required fields!';
      return;
    }
    
  this.isFullPageLoad=true
  this._product.moneyTCreate(this.createPro).subscribe((res:any)=>{
    if(res.data){
    this.isFullPageLoad=false
    this.isCreatePro=true;
    setTimeout(() => {
      this.isCreatePro = false;
    }, 3000);

  }},(error)=>{
    this.isError=error.error.message
    this.isFullPageLoad=false
  })
   this.createProEmpty();
}

createProEmpty(){
  this.createPro.senderName='';
  this.createPro.receiverName='';
  this.createPro.amount=null;
  this.createPro.charges=null;
  this.createPro.refId='';
}

getProductType(){
  this._product.get_product().subscribe((res:any)=>{
   this.getAllProduct=res.data;
  })
}
getCategroy(){
  this._product.get_Categroy().subscribe((res:any)=>{
    this.category = res.data
  })
}
gettype(){
  let catType=[];
  for(let i=0;i<this.getAllProduct.length;i++){
    catType.push(this.getAllProduct[i].type);
  }
  let unquie = catType.filter((item:any,i:any,catType:any)=>{return catType.indexOf(item)==i});
  return unquie;
}


ngOnInit(){
   this.getProductType(); 
   this.dataFilter=this.gettype();
   this.getCategroy()
}
ngDoCheck(){
  this.dataFilter=this.gettype();
}

}

