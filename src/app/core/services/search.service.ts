import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SearchBooks } from '../models/book-response.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private apiService: ApiService) {}

  /**
   *
   * @param {string} searchType
   * @param {string} searchQuery
   * @returns {Observable<any>}
   */
  searchBooks(
    searchType: string,
    searchQuery: string
  ): Observable<SearchBooks> {
    searchQuery = searchQuery.split(' ').join('+');
    const res: Observable<SearchBooks> = this.apiService.get(
      `/search.json?${searchType}=${searchQuery}`
    );
    // res.subscribe(data => {
    //   for(let page = 2; page <= ((data.numFound - data.docs.length)/100 + 1 ); page++ ) {
    //     this.apiService.get(`/search.json?${searchType}=${searchQuery}&page=${page}`).subscribe((newData: any) => {
    //       console.log(`page = ${page}`,newData);
    //     })
    //     setTimeout(( ) => {
    //       console.log("waiting")
    //     }, 10);
    //   }
    //   console.log(data);
    // });
    return res;
  }
}
