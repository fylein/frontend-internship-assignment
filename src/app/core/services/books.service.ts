import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const ROOT_URL = 'https://openlibrary.org'

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private loading = false;

  constructor(private http: HttpClient) { }
  getData(searchKey: string, limit: number = 10): Observable<any> {
    const query = `${ROOT_URL}/search.json?q=${searchKey}&limit=${limit}`;
    return this.http.get(query);
  }

  setLoading(loading: boolean){
    this.loading = loading;
  }
  getLoading(): boolean{
    return this.loading;
  }
}
