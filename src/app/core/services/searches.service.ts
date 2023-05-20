import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor(private apiService: ApiService) {}

  searchBooks(searchString: string): Observable<any> {
    const limit = 10;
    return this.apiService.get(`/search.json?q=${searchString}&fields=*,availability&limit=${limit}`);
  }
}


// https://openlibrary.org/search.json?q=the+lord+of+the+rings
// https://openlibrary.org/search.json?q=harry%20potter&fields=*,availability&limit=10