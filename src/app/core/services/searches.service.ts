import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor(private apiService: ApiService) {}

  searchBooks(searchString: string, pageNumber:any  = 1, type: string = 'q'): Observable<any> {
    const limit = 10;
    return this.apiService.get(`/search.json?${type}=${searchString}&fields=*,availability&limit=${limit}&page=${pageNumber}`);
  }
}


// https://openlibrary.org/search.json?q=the+lord+of+the+rings
// https://openlibrary.org/search.json?q=harry%20potter&fields=*,availability&limit=10