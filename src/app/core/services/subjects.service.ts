import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  searchBooks: any;

  constructor(private apiService: ApiService) {}

  // getAllBooks(subjectName: string): Observable<BookResponse> {
  //   const limit = 10;
  //   return this.apiService.get(`/subjects/${subjectName.toLowerCase().split(' ').join('_')}.json?limit=${limit}`);
  // }
  getAllBooks(subjectName: string, page: number, pageSize: number): Observable<BookResponse> {
    const offset = (page - 1) * pageSize;
    const url = `/subjects/${subjectName.toLowerCase().split(' ').join('_')}.json?limit=${pageSize}&offset=${offset}`;
    return this.apiService.get(url);
}

}
