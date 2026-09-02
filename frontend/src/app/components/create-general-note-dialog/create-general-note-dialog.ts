import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-create-general-note-dialog',
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogActions,
  ],
  templateUrl: './create-general-note-dialog.html',
  styleUrl: './create-general-note-dialog.scss',
})
export class CreateGeneralNoteDialog {
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateGeneralNoteDialog>);

  generalNoteForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    priority: [null]
  })

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveGeneralNote(): void{
    if (this.generalNoteForm.valid){
      console.log('Nova generalna obaveza', this.generalNoteForm.value);
    }
    this.dialogRef.close(this.generalNoteForm.value);
  }

}
