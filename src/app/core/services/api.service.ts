import { Inject, Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptions } from '../models/http-request-options.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { startWith, tap } from 'rxjs/operators';

const ROOT_URL = 'https://openlibrary.org';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient
  ) { }

  get<T>(url: string, options?: { cache: boolean }): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    const headers = new HttpHeaders();
    if (options?.cache) {
      headers.set('Cache-Control', 'public, max-age=60');
    }
    const config = { headers };
    return this.httpClient.get<T>(apiPath, config).pipe(
      tap((response) => {
        if (options?.cache) {
          this.httpClient.put(apiPath, response).subscribe();
        }
      })
    );
  }

  post<T>(url: string, body: Record<string, any> = {}, options?: { cache: boolean }): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    const headers = new HttpHeaders();
    if (options?.cache) {
      headers.set('Cache-Control', 'no-cache');
    }
    const config = { headers };
    return this.httpClient.post<T>(apiPath, body, config).pipe(
      tap((response) => {
        if (options?.cache) {
          this.httpClient.put(apiPath, response).subscribe();
        }
      })
    );
  }

  delete<T>(url: string, options?: { cache: boolean }): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    const headers = new HttpHeaders();
    if (options?.cache) {
      headers.set('Cache-Control', 'no-cache');
    }
    const config = { headers };
    return this.httpClient.delete<T>(apiPath, config).pipe(
      tap((response) => {
        if (options?.cache) {
          this.httpClient.delete(apiPath).subscribe();
        }
      })
    );
  }
}
