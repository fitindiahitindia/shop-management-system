import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  sideBarOpen:boolean=false;
  totalOrders:number=0;
  totalProducts:number=0;
  monthNumbersOrders:number[]=[];
  monthNumbersProduct:number[]=[];
  year:number=new Date().getFullYear();
  months:string[] = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  constructor(private _product:ProductService){
  }
   
  createCharts() {
  new Chart("orders", {
    type: 'bar',
    data: {
      labels: this.months,
      datasets: [{
        label: '# Orders',
        data: this.monthNumbersOrders,
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  new Chart("products", {
    type: 'bar',
    data: {
      labels: this.months,
      datasets: [{
        label: '# Products',
        data: this.monthNumbersProduct,
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

  
   ngOnInit(){
     this._product.getAdminDashAnalsis().subscribe((res: any) => {
      this.monthNumbersOrders = this.months.map(
        month => res.data?.orderResult?.[this.year]?.[month] ?? 0
      );
      this.monthNumbersProduct = this.months.map(
        month => res.data?.productResult?.[this.year]?.[month] ?? 0
      );
      this.totalOrders = this.monthNumbersOrders.reduce((acc, curr) => acc + curr, 0);
      this.totalProducts = this.monthNumbersProduct.reduce((acc, curr) => acc + curr, 0);

      this.createCharts();
    });
   }
}
