import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
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
  productName:'',
  productPurchasingPrice:null,
  productSellingPrice:null,
  productQuantity:null,
  productPurchasingDate:'',
  productCategory:''
 
}

getCategoryHtm(val:any){
  this.createPro.productCategory=val.value;
}
createProduct(form:any):void{
  this.isError = '';

    if(form.invalid) {
      this.isError = 'Please fill all required fields!';
      return;
    }
    
  this.isFullPageLoad=true
  this._product.createProduct(this.createPro).subscribe((res:any)=>{
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
  this.createPro.productName='';
  this.createPro.productPurchasingPrice=null;
  this.createPro.productSellingPrice=null;
  this.createPro.productQuantity=null;
  this.createPro.productPurchasingDate='';
  // this.createPro.productCategory='';
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
