import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { product2 } from 'src/app/interface/product2.interface';
import { response } from 'src/app/interface/response.interface';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
export interface PeriodicElement {
  name: string;
  position: number;
  duration: number;
  action:string;
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor(private _product:ProductService,private _snackbar:SnackbarService){}
  isLoader:boolean=false;
  products: any[] = [];
  totalRecords = 0;    // total items in DB
  pageSize = 5;       // page size
  currentPage = 1;
  
  loadProducts(page: number, limit: number) {
    this.isLoader=true;
    this._product.getProducts(page, limit).subscribe((res: any) => {
      this.products = res.data;
      this.totalRecords = res.total;  // backend sends total items
      this.isLoader=false;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;  // Angular uses 0-based index

    this.loadProducts(this.currentPage, this.pageSize);
  }

  removeProduct(id:string){
    let removeConfirm=confirm("Are you sure delete product");
    if(removeConfirm==true){
    this.isLoader=true;
    this._product.removeSingleProduct(id).subscribe(async()=>{
     await this.loadProducts(this.currentPage, this.pageSize);
      this._snackbar.openSnackBar("Product deleted successfully", "X");
      this.isLoader=false;
    },(error)=>{
      if(error.status===404){
        this._snackbar.openSnackBar("This product has already deleted.", "X");
      }else{
        this._snackbar.openSnackBar(error.error.message, "X");
        this.isLoader=false;
      }
    })
    }   
  }

 
  ngOnInit(){
    this.loadProducts(this.currentPage, this.pageSize);
  }
 
}
