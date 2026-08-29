import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoryResponseDto } from '../../dtos/category-response.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  getAllCategories(): Observable<CategoryResponseDto[]>{
    return this.http.get<CategoryResponseDto[]>(`${environment.getAllCategoriesApiUrl}`);
  }
}
