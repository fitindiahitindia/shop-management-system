import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SnackbarComponent } from 'src/app/shared/widgets/snackbar/snackbar.component';

@Component({
  selector: 'app-add-manage-orders',
  templateUrl: './add-manage-orders.component.html',
  styleUrls: ['./add-manage-orders.component.css'],
})
export class AddManageOrdersComponent {
  constructor(
    private _product: ProductService,
    private _snackBar: MatSnackBar,
    private _snackbar: SnackbarService
  ) {}
  color:ThemePalette = "accent"
  apiLoader:boolean=false
  isFullPageLoad:boolean=true;
  isCreateOrd: boolean = false;
  getAllProduct: any = [];
  dataFilter: any;
  isError = '';
  products: any[] = [];
  storPro = {
    getproductSellingPrice: null,
    getproductQuantity: null,
  };
  multiProducts: any[] = [];
  createPro = {
    productId: '',
    productName: '',
    productQuantity: null,
    productSellingPrice: null,
  };
  customerName: string = '';
  mobileNo: string = '';
  isCreateOrderLoader: boolean = false;
  getProductHtm(val: any) {
    const getValuesFromSelectd = val.target.value;
    this.products.map((res: any) => {
      if (res._id == getValuesFromSelectd) {
        this.createPro.productName = res.productName;
        this.createPro.productId = res._id;
        this.storPro.getproductSellingPrice = res.productSellingPrice;
        this.storPro.getproductQuantity = res.productQuantity;
      }
    });
  }
  
  addCart(form: any) {
    
    this.isError = '';

    if (form.invalid) {
      this.isError = 'Please fill all required fields!';
      return;
    }
    const stockQty = Number(this.storPro.getproductQuantity ?? 0);
    const stockQty2 = Number(this.createPro.productQuantity ?? 0);
    if (stockQty < stockQty2) {
      this.isError = 'Product stock is insufficient!';
      return;
    }
    if(this.multiProducts.length <= 9){
      this.multiProducts.push({ ...this.createPro });
    this._snackbar.openSnackBar('Add to cart successfully', 'X');
    }else{
      this.isError = 'You can add maximum 10 products in cart!';
      return;
    }
   
    this.emptyAllFields();
    form.resetForm();
    form.submitted = false;
  }

  removeCartItem(index: number) {
    this.multiProducts.splice(index, 1);
    this._snackbar.openSnackBar('Remove cart successfully', 'X');
  }

  createOrder() {

    this.apiLoader=true
    this.isCreateOrderLoader = true;
    if (this.multiProducts.length != 0) {
      const orderData = {
        orderItems: this.multiProducts,
        customerName: this.customerName,
        mobileNo: this.mobileNo,
      };
      this._product.create_Order(orderData).subscribe(
        (res: any) => {
          if (res.data) {
            this.emptyAllFields();
            this.multiProducts.length = 0;
            this.getProduct();
            this.isCreateOrd = true;
            this.isCreateOrderLoader = false;
            this.apiLoader=false
            setTimeout(() => {
              this.isCreateOrd = false;
            }, 3000);
          }
        },
        (error) => {
          this.isError = error.message;
          this.isCreateOrderLoader = false;
          this.apiLoader=false
        }
      );
    } else {
      this._snackbar.openSnackBar('Add at least one product to create order', 'X');
      this.isCreateOrderLoader = false;
      this.apiLoader=false
    }
  }
  emptyAllFields() {
    this.createPro = {
      productName: '',
      productId: '',
      productQuantity: null,
      productSellingPrice: null,
    };
    this.storPro = {
      getproductSellingPrice: null,
      getproductQuantity: null,
    };
  }
  getProduct() {
    this._product.get_product().subscribe((res: any) => {
      this.products = res.data;
      this.isFullPageLoad=false;
    },(error)=>{
      this._snackbar.openSnackBar(error.message, 'X');
      this.isFullPageLoad=false;
    });
  }
  
  grandTotal() {
    return this.multiProducts.reduce(
      (acc, item) => acc + item.productSellingPrice * item.productQuantity,
      0
    );
  }
  
  //get customer for autocomplete
  getCustomer(){
    this._product.getCustomer().subscribe((res:any)=>{
      this.options = res.data.map((customer:any)=>{
        return customer.mobileNo ? `${customer.customerName} - ${customer.mobileNo}` : customer.customerName;
      })
    },(error)=>{
      this._snackbar.openSnackBar(error.message, 'X');
    })
  }

  // Autocomplete logic

  searchText: string = '';
  options: string[] = [];
  filteredOptions: string[] = [];
  activeIndex: number = -1; // Tracks keyboard selection
  showDropdown: boolean = false;
  
  onInputChange() {
    const value = this.searchText.toLowerCase();
    if (value) {
      this.filteredOptions = this.options.filter(option =>
        option.toLowerCase().includes(value)
      );
      this.showDropdown = this.filteredOptions.length > 0;
      this.activeIndex = -1;
    } else {
      this.filteredOptions = [];
      this.showDropdown = false;
    }
  }

  selectOption(option: string) {
    this.searchText = option;
    this.filteredOptions = [];
    this.showDropdown = false;
    this.activeIndex = -1;
    if(option.includes(" - ")){
     const parts = option.split(" - ");
    const name = parts[0];  
    const mobileNo = parts[1];  
    this.customerName = name
    this.mobileNo = mobileNo
    }else{
      this.customerName = option;
    }

    
  }

  // Handle keyboard events
  onKeyDown(event: KeyboardEvent) {
    if (!this.showDropdown) return;

    if (event.key === 'ArrowDown') {
      this.activeIndex = (this.activeIndex + 1) % this.filteredOptions.length;
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      this.activeIndex = (this.activeIndex - 1 + this.filteredOptions.length) % this.filteredOptions.length;
      event.preventDefault();
    } else if (event.key === 'Enter') {
      if (this.activeIndex >= 0 && this.activeIndex < this.filteredOptions.length) {
        this.selectOption(this.filteredOptions[this.activeIndex]);
      }
      event.preventDefault();
    } else if (event.key === 'Escape') {
      this.showDropdown = false;
    }
  }


  // Close dropdown if clicked outside
  @ViewChild('inputField') inputField!: ElementRef;
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.inputField && !this.inputField.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }


  ngOnInit() {
    this.getProduct();
    this.getCustomer();
  }

}
