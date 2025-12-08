import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NewInComponent } from './modules/new-in/new-in.component';
import { AddComponent } from './modules/new-in/add/add.component';
import { ViewComponent } from './modules/new-in/view/view.component';
import { AuthComponent } from './modules/auth/auth.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { EditComponent } from './modules/new-in/edit/edit.component';
import { ViewSingleComponent } from './modules/new-in/view-single/view-single.component';
import { CategoryComponent } from './modules/new-in/category/category.component';
import { ManageOrdersComponent } from './modules/manage-orders/manage-orders.component';
import { ViewManageOrdersComponent } from './modules/manage-orders/view-manage-orders/view-manage-orders.component';
import { ViewAllManageOrdersComponent } from './modules/manage-orders/view-all-manage-orders/view-all-manage-orders.component';
import { AdminSettingComponent } from './modules/admin-setting/admin-setting.component';
import { AdminAuthComponent } from './modules/admin-auth/admin-auth.component';
import { AdminGuard } from './services/admin.guard';
import { AddManageOrdersComponent } from './modules/manage-orders/add-manage-orders/add-manage-orders.component';
import { ManageCustomersComponent } from './modules/manage-customers/manage-customers.component';
import { ViewAllMangeCustomersComponent } from './modules/manage-customers/view-all-mange-customers/view-all-mange-customers.component';
import { MoneyTransferComponent } from './modules/money-transfer/money-transfer.component';
import { ViewAllMoneyTransferComponent } from './modules/money-transfer/view-all-money-transfer/view-all-money-transfer.component';
import { ViewMoneyTransferComponent } from './modules/money-transfer/view-money-transfer/view-money-transfer.component';
import { AddMoneyTransferComponent } from './modules/money-transfer/add-money-transfer/add-money-transfer.component';

const routes: Routes = [
  // **************************admin dashboard**************************
  {
    path: '',
    children: [{ path: '', pathMatch: 'full', component: AdminAuthComponent }],
  },
  {
    path: 'admin-dashboard',
    component: DefaultComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },

      // manage product
      {
        path: 'new-in',
        component: NewInComponent,
        children: [
          { path: '', component: ViewComponent },
          { path: 'single-view/:id', component: ViewSingleComponent },
          { path: 'add', component: AddComponent },
          { path: 'edit/:id', component: EditComponent },
          { path: 'category', component: CategoryComponent },
        ],
      },
      //manage orders
      {
        path: 'manage-orders',
        component: ManageOrdersComponent,
        children: [
          { path: '', component: ViewAllManageOrdersComponent },
          { path: 'view/:id', component: ViewManageOrdersComponent },
          { path: 'add', component: AddManageOrdersComponent },
        ],
      },

       //manage money-transfer
      {
        path: 'money-transfer',
        component: MoneyTransferComponent,
        children: [
          { path: '', component: ViewAllMoneyTransferComponent },
          { path: 'view/:id', component: ViewMoneyTransferComponent },
          { path: 'add', component: AddMoneyTransferComponent },
        ],
      },

      //manage Customers
      {
        path: 'manage-customers',
        component: ManageCustomersComponent,
        children: [
          { path: '', component: ViewAllMangeCustomersComponent },
          { path: 'view/:id', component: ViewManageOrdersComponent },
          { path: 'add', component: AddManageOrdersComponent },
        ],
      },
      //setting
      { path: 'setting', component: AdminSettingComponent },

    ],
  },
{path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    { scrollPositionRestoration: 'top' },
    // {preloadingStrategy:PreloadAllModules}
    )],
  exports: [RouterModule],
})
export class AppRoutingModule {}
