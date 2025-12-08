import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NewInComponent } from './modules/new-in/new-in.component';
import {MatTableModule} from '@angular/material/table';
import { AddComponent } from './modules/new-in/add/add.component';
import { ViewComponent } from './modules/new-in/view/view.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { AuthComponent } from './modules/auth/auth.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { ProductService } from './services/product.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider'; 
import {MatChipsModule} from '@angular/material/chips';
import { FilterByTypePipe } from './services/filter-by-type.pipe'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditComponent } from './modules/new-in/edit/edit.component';
import { ViewSingleComponent } from './modules/new-in/view-single/view-single.component';
import { GooglePayButtonComponent, GooglePayButtonModule } from '@google-pay/button-angular';
import { CategoryComponent } from './modules/new-in/category/category.component';
import { ManageOrdersComponent } from './modules/manage-orders/manage-orders.component';
import { ViewManageOrdersComponent } from './modules/manage-orders/view-manage-orders/view-manage-orders.component';
import { ViewAllManageOrdersComponent } from './modules/manage-orders/view-all-manage-orders/view-all-manage-orders.component';
import { AdminSettingComponent } from './modules/admin-setting/admin-setting.component';

import { AdminAuthComponent } from './modules/admin-auth/admin-auth.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddManageOrdersComponent } from './modules/manage-orders/add-manage-orders/add-manage-orders.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { A11yModule } from "@angular/cdk/a11y"; 
import { CommonModule } from '@angular/common';
import { BillComponent } from './shared/widgets/bill/bill.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ManageCustomersComponent } from './modules/manage-customers/manage-customers.component';
import { ViewAllMangeCustomersComponent } from './modules/manage-customers/view-all-mange-customers/view-all-mange-customers.component';
import { MoneyTransferComponent } from './modules/money-transfer/money-transfer.component';
import { AddMoneyTransferComponent } from './modules/money-transfer/add-money-transfer/add-money-transfer.component';
import { ViewAllMoneyTransferComponent } from './modules/money-transfer/view-all-money-transfer/view-all-money-transfer.component';
import { ViewMoneyTransferComponent } from './modules/money-transfer/view-money-transfer/view-money-transfer.component';
@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    DashboardComponent,
    SidebarComponent,
    NewInComponent,
    AddComponent,
    ViewComponent,
    AuthComponent,
    ForgotPasswordComponent,
    FilterByTypePipe,
    EditComponent,
    ViewSingleComponent,
    CategoryComponent,
    ManageOrdersComponent,
    ViewManageOrdersComponent,
    ViewAllManageOrdersComponent,
    AdminSettingComponent, 
    AdminAuthComponent,
    AddManageOrdersComponent,
    BillComponent,
    ManageCustomersComponent,
    ViewAllMangeCustomersComponent,
    MoneyTransferComponent,
    AddMoneyTransferComponent,
    ViewAllMoneyTransferComponent,
    ViewMoneyTransferComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatChipsModule,
    HttpClientModule,
    GooglePayButtonModule,
    AngularEditorModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatAutocompleteModule,
    A11yModule
],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
