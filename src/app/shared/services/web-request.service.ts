import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  constructor(private http: HttpClient) {}

  getWithHeaders(url: string, params?: any): Observable<any> {
    return this.http.get<any>(`${environment.api}/${url}`, {
      params: params,
      headers: new HttpHeaders({
        'x-api-key': environment.api_key,
      }),
    });
  }
}
