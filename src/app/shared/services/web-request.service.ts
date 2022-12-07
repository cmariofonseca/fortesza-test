import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  constructor(private http: HttpClient) {}

  get(url: string, params?: any): Observable<any> {
    return this.http.get<any>(`${environment.api}/${url}`, {
      params: params,
    });
  }

  getWithHeaders(url: string, params?: any): Observable<any> {
    return this.http.get<any>(`${environment.api}/${url}`, {
      params: params,
      headers: new HttpHeaders({
        'x-api-key': environment.api_key,
      }),
    });
  }

  getObserve(url: string, params?: any): Observable<any> {
    return this.http.get<any>(`${environment.api}/${url}`, {
      params: params,
      observe: 'response',
    });
  }

  post(url: string, payload: any, params?: any): Observable<any> {
    return this.http.post<any>(`${environment.api}/${url}`, payload, {
      params: params,
    });
  }

  postWithHeaders(url: string, payload: any, params?: any): Observable<any> {
    return this.http.post<any>(`${environment.api}/${url}`, payload, {
      params: params,
      headers: new HttpHeaders({
        'x-api-key': environment.api_key,
      }),
    });
  }

  postObserve(url: string, payload: any, params?: any): Observable<any> {
    return this.http.post<any>(`${environment.api}/${url}`, payload, {
      params: params,
      observe: 'response',
    });
  }

  patch(url: string, payload: any, params?: any): Observable<any> {
    return this.http.patch<any>(`${environment.api}/${url}`, payload, {
      params: params,
    });
  }

  put(url: string, payload: any, params?: any): Observable<any> {
    return this.http.put<any>(`${environment.api}/${url}`, payload, {
      params: params,
    });
  }

  putWithHeaders(url: string, payload: any, params?: any): Observable<any> {
    return this.http.put<any>(`${environment.api}/${url}`, payload, {
      params: params,
      headers: new HttpHeaders({
        'x-api-key': environment.api_key,
      }),
    });
  }

  delete(url: string, params?: any): Observable<any> {
    return this.http.delete<any>(`${environment.api}/${url}`, {
      params: params,
    });
  }

  deleteWithHeaders(url: string, params?: any): Observable<any> {
    return this.http.delete<any>(`${environment.api}/${url}`, {
      params: params,
      headers: new HttpHeaders({
        'x-api-key': environment.api_key,
      }),
    });
  }
}
