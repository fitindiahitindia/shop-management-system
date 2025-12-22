import { Component, ElementRef, ViewChild } from '@angular/core';
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
createPro:any={
  productName:'',
  productQuantity:null,
  productCategory:'',
  productPurchasingPrice:null,
  productSellingPrice:null,
  productPurchasingDate:'',
 
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
  //  this.startCamera()
}
ngDoCheck(){
  this.dataFilter=this.gettype();
}



selectedFile!: File;
  previewUrl: string | any = null;

uploadProductImage(event:any){
 this.selectedFile = event.target.files[0];
 if(this.selectedFile.type=='image/png' || this.selectedFile.type=='image/jpeg' || this.selectedFile.type=='image/jpg'){
    // ==== Local Preview Code ====
    const reader = new FileReader();
    console.log(reader)
    reader.onload = () => {
      this.previewUrl = reader.result; // base64
    };
    reader.readAsDataURL(this.selectedFile);
  }else{
    alert('Please select a valid image file');
  }
}
isImage(url: string | null): boolean {
  if (!url) return false;
  return url.startsWith('data:image');
}


createProduct2(form:any):void{
 const preparedFormData = this.validationAndReadyForm();
 console.log(preparedFormData)
  this.isFullPageLoad=true
  this._product.createProduct(preparedFormData).subscribe((res:any)=>{
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

validationAndReadyForm(){
  
  if(!this.selectedFile){
  alert("Please select an image file!");
  return;
}

  for (let key in this.createPro) {
  if (this.createPro[key] === '' || this.createPro[key] === null || this.createPro[key] === undefined) {
    alert(key + ' is empty');
    return;
  }
}
  const formData = new FormData();
 formData.append("file", this.selectedFile);
 formData.append("productName", this.createPro.productName);
 formData.append("productPurchasingPrice", String(this.createPro.productPurchasingPrice));
 formData.append("productSellingPrice", String(this.createPro.productSellingPrice));
 formData.append("productQuantity", String(this.createPro.productQuantity));
 formData.append("productPurchasingDate", this.createPro.productPurchasingDate);
 formData.append("productCategory", this.createPro.productCategory);
  return formData;
}


 @ViewChild('video') video!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;

  capturedImage: string | null = null;
  stream!: MediaStream;
  useFrontCamera = true;



  startCamera() {
    const constraints = {
      video: {
        facingMode: this.useFrontCamera ? 'user' : 'environment'
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        this.stream = stream;
        this.video.nativeElement.srcObject = stream;
      })
      .catch(err => {
        console.error('Camera error:', err);
      });
  }

  switchCamera() {
    this.useFrontCamera = !this.useFrontCamera;
    this.stopCamera();
    this.startCamera();
  }

  capture() {
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    this.capturedImage = canvas.toDataURL('image/png');
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }

  ngOnDestroy() {
    this.stopCamera();
  }

}

