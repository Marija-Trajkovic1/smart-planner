import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-update-general-note-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatButtonModule,
    MatInput,
    MatDialogActions,
    MatDialogContent
],
  templateUrl: './update-general-note-dialog.html',
  styleUrl: './update-general-note-dialog.scss',
})
export class UpdateGeneralNoteDialog {
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UpdateGeneralNoteDialog>)

  data = inject(MAT_DIALOG_DATA);

  updateGeneralNoteForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]]
  });

  ngOnInit() {
    if (this.data && this.data.note) {
      this.patchFormValues(this.data.note);
    }
  }

  patchFormValues(note: any) {
    this.updateGeneralNoteForm.patchValue({
      title: note.title,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveUpdate(): void {
    if (this.updateGeneralNoteForm.valid) {
      const payloadForBackend = {
          id: this.data.note.id,
          title: this.updateGeneralNoteForm.value.title
      };
      console.log('Podaci za bekend: ', payloadForBackend);
    
      this.dialogRef.close(payloadForBackend);
    }
  }


}

