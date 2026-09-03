import { Component, inject, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { FONT_SIZES, FONT_STYLES } from '../../core/constants/font-options.constants';

@Component({
  selector: 'app-update-daily-note-dialog',
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatLabel,
    MatOption,
    MatError,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
  ],
  templateUrl: './update-daily-note-dialog.html',
  styleUrl: './update-daily-note-dialog.scss',
})
export class UpdateDailyNoteDialog {
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UpdateDailyNoteDialog>);
  
  public data = inject(MAT_DIALOG_DATA);

  hoursList = Array.from({ length: 24 }, (_, i) => i < 10 ? `0${i}` : `${i}`);
  minutesList = Array.from({ length: 12 }, (_, i) => i * 5 < 10 ? `0${i * 5}` : `${i * 5}`);

  fontStyles = FONT_STYLES;
  fontSizes = FONT_SIZES;

  updateDailyNoteForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    selectedHour: [null], 
    selectedMinute: [null],
    location: [''],
    link: [''],
    textType: ['PLAIN'],
    textHeight: [16]
  })

  ngOnInit() {
    if (this.data && this.data.note) {
      this.patchFormValues(this.data.note);
    }
  }

  patchFormValues(note: any) {
    let hour = null;
    let minute = null;

    if (note.time) {
      const timeParts = note.time.split(':');
      if (timeParts.length >= 2) {
        hour = timeParts[0];
        minute = timeParts[1];
      }
    }

    this.updateDailyNoteForm.patchValue({
      title: note.title,
      selectedHour: hour,
      selectedMinute: minute,
      location: note.location,
      link: note.link,
      textType: note.textType || 'PLAIN',
      textHeight: note.textHeight || 16,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveUpdate(): void {
  if (this.updateDailyNoteForm.valid) {
    const formValue = { ...this.updateDailyNoteForm.value };
    
    let backendTime = null;
    if (formValue.selectedHour && formValue.selectedMinute) {
      backendTime = `${formValue.selectedHour}:${formValue.selectedMinute}:00`;
    }

    const payloadForBackend = {
      id: this.data.note.id,
      title: formValue.title,
      location: formValue.location === '' ? null : formValue.location,
      link: formValue.link === '' ? null : formValue.link,
      textType: formValue.textType,
      textHeight: formValue.textHeight,
      time: backendTime
    };

    console.log('Podaci za bekend: ', payloadForBackend);
    
    this.dialogRef.close(payloadForBackend);
  }
}

}
 