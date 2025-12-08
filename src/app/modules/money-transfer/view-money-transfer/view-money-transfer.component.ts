import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-money-transfer',
  templateUrl: './view-money-transfer.component.html',
  styleUrls: ['./view-money-transfer.component.css']
})
export class ViewMoneyTransferComponent {
constructor(private _product:ProductService,private _activatedRoute:ActivatedRoute){

  }
isFullPageLoad:boolean=true;
isCreatePro:boolean=false;
getAllmt:any=[];
dataFilter:any;
mtIdParms:any;
viewPro={
 senderName:'',
  receiverName:'',
  amount:null,
  charges:null,
  refId:'',
}

getmtType(){
  this.mtIdParms= this._activatedRoute.snapshot.paramMap.get('id');
  this._product.get_moneyTransfer(this.mtIdParms).subscribe((res:any)=>{
   this.viewPro.senderName=res.data.senderName;
   this.viewPro.receiverName=res.data.receiverName;
   this.viewPro.charges=res.data.charges;
   this.viewPro.amount=res.data.amount;
   this.viewPro.refId=res.data.refId;
   this.isFullPageLoad=false;
  },(error)=>{
    alert(error.message)
  })
  
}

ngOnInit(){
   this.getmtType(); 
}

}

