import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  constructor(private apiService: ApiService) {}

  getAllBooks(
    subjectName: string,
    page: any,
    itemsPerPage: any
  ): Observable<BookResponse> {
    
    return this.apiService.get(
      `/subjects/${subjectName
        .toLowerCase()
        .split(' ')
        .join('_')}.json?offset=${page}&&limit=${itemsPerPage}`
    );
  }
  
  getSearchedBooks(searchedText: any): Observable<BookResponse> {
     const title = searchedText.split(' ').join('+');
    return this.apiService.get(`/search.json?title=${title}&&author=${title}&sort=new`);
  }
}
