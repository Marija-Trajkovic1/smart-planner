import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-daily-notes-list',
  imports: [],
  templateUrl: './daily-notes-list.html',
  styleUrl: './daily-notes-list.scss',
})
export class DailyNotesList {
  private route = inject(ActivatedRoute);

  dayId!: number;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('dayId');
    if(idParam) {
      this.dayId = +idParam;
      console.log('Otvoren je dan sa ID-jem: ', this.dayId);
    }
  }
}
