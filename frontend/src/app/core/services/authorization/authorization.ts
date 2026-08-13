import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterDto } from '../../dtos/register.dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class Authorization {
  private http = inject(HttpClient);

  register(registrationData: RegisterDto):Observable<any> {
    return this.http.post(`${environment.authorizationApiUrl}/`, registrationData);
  }
  
}
