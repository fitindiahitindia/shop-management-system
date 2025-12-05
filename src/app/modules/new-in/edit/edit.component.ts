import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  color:ThemePalette="accent"
  apiLoader:boolean = false;
  isFullPageLoad:boolean=true;
  category:any[] = [];
  getProductData:any=[]; 
  selectedValue:any;
  productIdParms:any;
  isError:boolean=false;
  isEditButtonDisabled:boolean=false;
  constructor(private _product:ProductService,private _activatedRoute:ActivatedRoute, private _snackbar:SnackbarService){}
  getProduct(){
    this.productIdParms = this._activatedRoute.snapshot.paramMap.get('id');

  this.productIdParms && this._product.get_SingleProduct(this.productIdParms)
    .subscribe({
      next: (res: any) => {
        this.getProductData = res.data;
        this.selectedValue = res.data.type;

        this.isFullPageLoad = false;   // ✔ loader stop here
      },
      error: () => {
        this.isFullPageLoad = false;   // ✔ stop even in error
      }
    });
  }
  getCategroy(){
    this._product.get_Categroy().subscribe((res:any)=>{
      this.category = res.data
    })
  }
  editProduct(data:any){
    this.apiLoader=true;
    
    const finalData={
      ...data,
      productCategory:this.selectedValue
    }
    this._product.update_SingleProduct(this.productIdParms,finalData).subscribe((res:any)=>{
      this._snackbar.openSnackBar("Updated product successfully", "X");
      this.apiLoader = false;
    },(error)=>{
      this.isError = error.error;
      this.apiLoader=false;
    })
  }
  productType(event:any){
    this.selectedValue=event.value
  }
  ngOnInit(){
    this.getProduct();
    this.getCategroy()
  }
}
