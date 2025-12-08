import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-view-all-money-transfer',
  templateUrl: './view-all-money-transfer.component.html',
  styleUrls: ['./view-all-money-transfer.component.css']
})
export class ViewAllMoneyTransferComponent {
mtList: any[] = [];
  totalRecords = 0;
  pageSize = 5;
  currentPage = 1;
  isLoader = false;
  searchTerm: string = "";
  private searchSubject: Subject<string> = new Subject();

  constructor(private _product: ProductService, private _snackbar: SnackbarService) {}

  ngOnInit() {
    // Debounced search
    this.searchSubject.pipe(
      debounceTime(1000),          // wait 1s after typing stops
      distinctUntilChanged()      // ignore same consecutive values
    ).subscribe(searchValue => {
      this.searchTerm = searchValue;
      this.currentPage = 1;
      this.loadMt(this.currentPage, this.pageSize, this.searchTerm);
    });

    this.loadMt(this.currentPage, this.pageSize, this.searchTerm);
  }

  loadMt(page: number, limit: number, search: string = '') {
    this.isLoader = true;
    this._product.get_AllmoneyTransfer(page, limit, search).subscribe((res: any) => {
      this.mtList = res.data;
      this.totalRecords = res.total;
      this.isLoader = false;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadMt(this.currentPage, this.pageSize, this.searchTerm);
  }

  // Called on input change
  onInputChange(value:any) {
    this.searchSubject.next(value.value);
  }

  clearSearch() {
    this.searchTerm = "";
    this.currentPage = 1;
    this.loadMt(this.currentPage, this.pageSize, "");
  }

  removeProduct(id: string) {
    if (confirm("Are you sure delete product")) {
      this.isLoader = true;
      this._product.removeSingleProduct(id).subscribe(() => {
        this.loadMt(this.currentPage, this.pageSize, this.searchTerm);
        this._snackbar.openSnackBar("Product deleted successfully", "X");
        this.isLoader = false;
      }, (error) => {
        if (error.status === 404) {
          this._snackbar.openSnackBar("This product has already deleted.", "X");
        } else {
          this._snackbar.openSnackBar(error.error.message, "X");
        }
        this.isLoader = false;
      });
    }
  }
}