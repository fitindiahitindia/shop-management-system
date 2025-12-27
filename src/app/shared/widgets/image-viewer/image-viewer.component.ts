import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent {
 constructor(
     public dialogRef: MatDialogRef<ImageViewerComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any
   ) { }
 
 
   closeDialog() {
     this.dialogRef.close();
   }
 
}
