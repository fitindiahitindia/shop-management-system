import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components/components.component';
import { WidgetsComponent } from './widgets/widgets.component';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SnackbarComponent } from './widgets/snackbar/snackbar.component';

@NgModule({
  declarations: [
    ComponentsComponent,
    WidgetsComponent,
    NotfoundComponent,
    SnackbarComponent,
  ],
  imports: [
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule
  ],
  exports:[
  ]
})
export class SharedModule { }
