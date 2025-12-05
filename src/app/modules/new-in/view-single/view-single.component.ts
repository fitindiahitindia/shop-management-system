import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.css']
})
export class ViewSingleComponent {
  constructor(private _product:ProductService,private _activatedRoute:ActivatedRoute){

  }
isFullPageLoad:boolean=true;
isCreatePro:boolean=false;
getAllProduct:any=[];
dataFilter:any;
productIdParms:any;
viewPro={
  productName:'',
  productPurchasingPrice:null,
  productSellingPrice:null,
  productQuantity:null,
  productPurchasingDate:'',
  productCategory:''
}

getProductType(){
  this.productIdParms= this._activatedRoute.snapshot.paramMap.get('id');
  this._product.get_SingleProduct(this.productIdParms).subscribe((res:any)=>{
   this.viewPro.productName=res.data.productName;
   this.viewPro.productPurchasingPrice=res.data.productPurchasingPrice;
   this.viewPro.productSellingPrice=res.data.productSellingPrice;
   this.viewPro.productQuantity=res.data.productQuantity;
   this.viewPro.productPurchasingDate=res.data.productPurchasingDate;
   this.viewPro.productCategory=res.data.productCategory;
   this.isFullPageLoad=false;
  },(error)=>{
    alert(error.message)
  })
  
}

ngOnInit(){
   this.getProductType(); 
}

}
