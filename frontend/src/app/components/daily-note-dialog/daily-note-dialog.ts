import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryResponseDto } from '../../core/dtos/category-response.model';
import { CategoryService } from '../../core/services/category/category-service';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FONT_SIZES, FONT_STYLES } from '../../core/constants/font-options.constants';

@Component({
  selector: 'app-daily-note-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './daily-note-dialog.html',
  styleUrl: './daily-note-dialog.scss',
})
export class DailyNoteDialog {
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<DailyNoteDialog>)
  private categoryService = inject(CategoryService);
   private cdr = inject(ChangeDetectorRef);

  public dialogData = inject(MAT_DIALOG_DATA, {optional: true});

  categories = signal<CategoryResponseDto[]>([]);
  fontStyles = FONT_STYLES;
  fontSizes = FONT_SIZES;
  isEditMode = false;

  dailyNoteForm : FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    time: [''],
    location: [''],
    priority: [null],
    isTheMostImportantToday: [false],
    link: [''],
    categoryId: [null, [Validators.required]],
    textType: ['PLAIN'],
    textHeight: [16]    
    
  });

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => this.categories.set(response),
      error: (err) => console.log('Doslo je do greske prilikom ucitavanja kategorija')
    })

    if (this.dialogData && this.dialogData.note) {
      this.isEditMode = true;

      const noteToPatch = {...this.dialogData.note};

      if (noteToPatch.time && noteToPatch.time.length > 5) {
        noteToPatch.time = noteToPatch.time.substring(0, 5);
      }

      this.dailyNoteForm.patchValue(noteToPatch);

      console.log('POSLE PATCH-a TIME:', this.dailyNoteForm.get('time')?.value);

      this.dailyNoteForm.get('categoryId')?.clearValidators();
      this.dailyNoteForm.get('categoryId')?.updateValueAndValidity();
      this.dailyNoteForm.get('categoryId')?.disable();
      this.dailyNoteForm.get('priority')?.disable();
      this.dailyNoteForm.get('isTheMostImportantToday')?.disable();
    }
    this.cdr.detectChanges(); 
  }

  onCancel(): void {
    this.dialogRef.close();
  }
/*
  onSaveDailyNote(): void {
    if (this.dailyNoteForm.valid) {
      const formValue = { ...this.dailyNoteForm.getRawValue() };
    
      if (formValue.time && String(formValue.time).trim() !== '') {
        let timeStr = String(formValue.time).trim();

        if (!timeStr.includes(':')) {
          if (timeStr.length === 1) {
            timeStr = `0${timeStr}`;
          }
          timeStr = `${timeStr}:00:00`;
        } 
        else {
          const parts = timeStr.split(':');

          let hours = parts[0];
          let minutes = parts[1] || '00';

          if (hours.length === 1) hours = `0${hours}`;
          if (minutes.length === 1) minutes = `0${minutes}`;
          
          if (parts.length === 2) {
            timeStr = `${hours}:${minutes}:00`;
          } else if (parts.length === 3) {
            let seconds = parts[2] || '00';
            if (seconds.length === 1) seconds = `0${seconds}`;
            timeStr = `${hours}:${minutes}:${seconds}`;
          }
        }
        
        formValue.time = timeStr;
      } else {
        formValue.time = null;
      }
      
      if (formValue.link === '' || formValue.link === null || formValue.link?.trim() === '') formValue.link = null;
      if (formValue.location === '' || formValue.location === null || formValue.location?.trim() === '') formValue.location = null;

      if (this.isEditMode) {
        delete formValue.categoryId;
        delete formValue.priority;
        delete formValue.isTheMostImportantToday;
      }

      console.log('Podaci koji se šalju sa bezbednim formatom vremena:', formValue);
      this.dialogRef.close(formValue);
    }
  }*/

 onSaveDailyNote(): void {
  if (this.dailyNoteForm.invalid) {
    this.dailyNoteForm.markAllAsTouched();
    return;
  }

  // getRawValue() obezbeđuje da pokupimo i polja koja su disabled!
  const formValue = {
    ...this.dailyNoteForm.getRawValue()
  };

  console.log('TIME PRE KONVERZIJE:', formValue.time);

  // Bezbedno formatiranje vremena na HH:mm:ss
  if (formValue.time && String(formValue.time).trim() !== '') {
    const timeStr = String(formValue.time).trim();
    // Ako ima samo 5 karaktera (npr "14:30"), dodajemo mu sekunde
    if (timeStr.length === 5) {
      formValue.time = `${timeStr}:00`;
    } else {
      formValue.time = timeStr;
    }
  } else {
    formValue.time = null;
  }

  // Čišćenje praznih stringova u null za backend
  if (formValue.link === '' || formValue.link?.trim() === '') formValue.link = null;
  if (formValue.location === '' || formValue.location?.trim() === '') formValue.location = null;

  console.log('FINALNI PAYLOAD IZ DIJALOGA:', formValue);

  if (this.isEditMode) {
    delete formValue.categoryId;
    delete formValue.priority;
    delete formValue.isTheMostImportantToday;
  }

  this.dialogRef.close(formValue);
}

}

