import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  constructor(private _product: ProductService,private _snackbar: SnackbarService){}
  isFullPageLoad:boolean=true;
  apiLoader:boolean=false;
  color:ThemePalette="accent"
  productCategory:any[] = []
  message=""
  isUpdate:boolean = false;
  categoryName=""
  editId=""
  categoryObj:any = {
    categoryName:"",
  }
  uploadError=""
  onCategory(category:any){
    this.categoryObj.categoryName = category.categoryName
    this.createCategory(this.categoryObj)
    category.resetForm()
  }
  createCategory(category:any){
    this.apiLoader=true;
    this._product.create_Category(category).subscribe((res:any)=>{
      this._snackbar.openSnackBar("Add category successfully", "X");
      this.apiLoader=false;
      this.categoryObj.categoryName=""
      this.getCategory()
      setTimeout(() => {
      }, 3000);
      },(error:any)=>{
       this.uploadError = error.error
      })
  }
  getCategory(){
    this.isFullPageLoad=true;
    this._product.get_Categroy().subscribe((res:any)=>{
      this.productCategory = res.data
      this.isFullPageLoad=false
    },(error)=>{
     this.uploadError = error.error
    })
  } 
  updateCategory(){
    this.apiLoader=true;
   this._product.edit_Category(this.editId,this.categoryObj).subscribe((res:any)=>{
    this._snackbar.openSnackBar("Update category successfully", "X");
    this.apiLoader=false;
    this.isUpdate = false;
    this.categoryObj.categoryName = null;
    this.getCategory()
  })}

  remove(id:string){
    this.apiLoader=true;
    const confirm=window.confirm("Are you sure delete this category")
    if(confirm){
    this._product.remove_Category(id).subscribe((res:any)=>{
      this._snackbar.openSnackBar("Delete category successfully", "X");
      this.apiLoader=false;
      this.getCategory()
    })}else{
      this.apiLoader=false;
    }
  }

  edit(item:any){
    this.isUpdate = true
    this.categoryObj.categoryName = item.categoryName
    this.editId= item._id;
  }

  onUpdateCategory(){
    this.updateCategory()
  }

  
  ngOnInit(){
   this.getCategory();
   let objlocalstorage = new MylocalStorage();
  }
  
 
}

interface BasicCar{
 
}
class MylocalStorage{  

  getAllLocalStorage():any{
    let bucket = [];
    for(let i=0;i<localStorage.length;i++){
      bucket[i]=localStorage.key(i)
    }
    return bucket
  }

  getLocalStorage(tokenName:string){
    let getToken=JSON.parse(localStorage.getItem(tokenName)!);
    if(getToken){
      return getToken;
    }else{
      return null
    }
  }
  isLocalStorageToken(tokenName:string){
    const getalllocalstorage = this.getAllLocalStorage();
    return getalllocalstorage.filter((val:string,i:number)=>{
      return val === tokenName;
    })
  }
  
  setLocalStorage(tokenName:string,value:object){
    try {
      if(this.isLocalStorageToken(tokenName).length <= 0){
        localStorage.setItem(tokenName,JSON.stringify(value));
        console.log("local storage token successfully set")
      }else{
        console.log("Token key is already exist")
      }
    } catch (error) {
        console.log('Something went wrong while set localstorage: '+error)
    } 
  }
  deleteLocalStorage(){
    localStorage.clear();
  }
}
class randomIdGenerator{
  private length:number = 0;
  constructor(length:number){
    this.length = length;
  }
  generateId(){
   let len = "";
   for(let i=0;i<this.length;i++){
    len +=9
   }
  return Math.floor(Math.random() * parseInt(len));
  }
}
