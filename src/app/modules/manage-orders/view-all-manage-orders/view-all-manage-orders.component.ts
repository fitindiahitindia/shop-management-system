import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-view-all-manage-orders',
  templateUrl: './view-all-manage-orders.component.html',
  styleUrls: ['./view-all-manage-orders.component.css']
})
export class ViewAllManageOrdersComponent {
  
  allOrders: any[] = [];
  filteredOrders: any[] = [];  
  isLoader: boolean = true;
  deleteOrder = {
    _id: '',
    productId: '',
    productQuantity: ''
  }
  totalRecords = 0;
  pageSize = 5;
  currentPage = 1;

  constructor(private _product: ProductService, private _snackbar: SnackbarService) { }

  getAllOrders(page: number, limit: number) {
    this._product.get_AllUserOrders(page, limit).subscribe({
      next: (res: any) => {
        const data = res.data;

        this.allOrders = Object.values(data.order).filter(
          (item: any) => typeof item === 'object' && !Array.isArray(item)
        );

        this.filteredOrders = [...this.allOrders]; // 👈 search copy

        this.isLoader = false;
        this.totalRecords = res.total;
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoader = false;
      }
    });
  }

  search(event: any) {
    const value = event.target.value.toLowerCase();

    this.filteredOrders = this.allOrders.filter((order: any) =>
      Object.values(order).join(' ').toLowerCase().includes(value)
    );
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getAllOrders(this.currentPage, this.pageSize);
  }

  removeOrder(orderId: any, productId: any, productQuantity: any) {
    let removeConfirm = confirm("Are you sure delete Order");

    if (removeConfirm) {
      this.isLoader = true;
      this.deleteOrder._id = orderId;
      this.deleteOrder.productId = productId;
      this.deleteOrder.productQuantity = productQuantity;

      this._product.remove_Order(orderId).subscribe((res: any) => {
        this.getAllOrders(this.currentPage, this.pageSize);
        this.isLoader = false;
        this._snackbar.openSnackBar(res.message, "X");
      }, (error: Response) => {
        if (error.status === 404) {
          this._snackbar.openSnackBar("This order has already been deleted", "X");
        } else {
          this._snackbar.openSnackBar("An unexpected error occurred.", "X");
        }
      });
    }
  }

  ngOnInit() {
    this.getAllOrders(this.currentPage, this.pageSize);
  }
}
