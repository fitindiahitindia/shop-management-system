import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {
  
  constructor(
    public dialogRef: MatDialogRef<BillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  , private _product:ProductService) { }

  print() {
    window.print();
  }

  closeDialog() {
    this.dialogRef.close();
  }
  
 leftLogo:string="";
 rightLogo:string="";
 getLogo(){
 if(this.leftLogo=="" && this.rightLogo==""){
  let first = this._product.getAdminInfo().shopName.split(" ");
  this.leftLogo=first[0].charAt(0);
  this.rightLogo =first[1].charAt(0);
 }
 
}
  ngOnInit(){ 
    this.getLogo()
  }
}
