import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogTitle, MatDialogActions, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-daily-note-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule
],
  templateUrl: './daily-note-dialog.html',
  styleUrl: './daily-note-dialog.scss',
})
export class DailyNoteDialog {
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<DailyNoteDialog>);
  
  dailyNoteForm: FormGroup = this.formBuilder.group({
    selectedDate: ['', Validators.required]
  });

  onSave():void{
    if(this.dailyNoteForm.valid){
      this.dialogRef.close(this.dailyNoteForm.value.selectedDate);
    }
  }

  onCancel(): void{
    this.dialogRef.close(null);

  }
}
