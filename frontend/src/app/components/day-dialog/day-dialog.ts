import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-day-note-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule
],
  templateUrl: './day-dialog.html',
  styleUrl: './day-dialog.scss',
})
export class DayDialog {
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<DayDialog>);
  minDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  
  dayForm: FormGroup = this.formBuilder.group({
    selectedDate: ['', Validators.required]
  });

  onSave():void {
    if(this.dayForm.valid) {
      this.dialogRef.close(this.dayForm.value.selectedDate);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
