import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryResponseDto } from '../../core/dtos/category-response.model';
import { CategoryService } from '../../core/services/category/category-service';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FONT_SIZES, FONT_STYLES } from '../../core/constants/font-options.constants';
import { MatTimepickerModule } from '@angular/material/timepicker';

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

  categories = signal<CategoryResponseDto[]>([]);
  fontStyles = FONT_STYLES;
  fontSizes = FONT_SIZES;

  hoursList = Array.from({ length: 24 }, (_, i) => i < 10 ? `0${i}` : `${i}`);
  minutesList = Array.from({ length: 12 }, (_, i) => i * 5 < 10 ? `0${i * 5}` : `${i * 5}`);


  dailyNoteForm : FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    selectedHour: [null], 
    selectedMinute: [null], 
    location: [''],
    priority: [null],
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
  }

  onCancel(): void {
    this.dialogRef.close();
  }

   onSaveDailyNote(): void {
    if (this.dailyNoteForm.valid) {
      const formValue = { ...this.dailyNoteForm.value };
    
      if (formValue.selectedHour && formValue.selectedMinute) {
        formValue.time = `${formValue.selectedHour}:${formValue.selectedMinute}:00`;
      } else {
        formValue.time = null;
      }

      delete formValue.selectedHour;
      delete formValue.selectedMinute;

      if (formValue.link === '') formValue.link = null;
      if (formValue.location === '') formValue.location = null;

      console.log('Podaci spremni za bazu:', formValue);
      this.dialogRef.close(formValue);
    }
  }
}

