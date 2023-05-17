import { Component, Input } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

export interface Book {
  title: string;
  author_name: string[];
  first_publish_year: number;
  // Add more properties as needed
}

@Component({
  selector: 'app-search-results-table',
  templateUrl: './search-results-table.component.html',
  styleUrls: ['./search-results-table.component.scss'],
})
export class SearchResultsTableComponent {
  @Input() searchResults: Book[] = [];
  isLoading = false;

  constructor(private http: HttpClient) {}

  searchBooks(searchTerm: string, page: number, pageSize: number): void {
    const url = 'https://openlibrary.org/search.json';
    const params = new HttpParams()
      .set('q', searchTerm)
      .set('page', page.toString())
      .set('limit', pageSize.toString());

    this.isLoading = true; // Set loading state to true before making the request

    this.http.get(url, {
      params,
      observe: 'response',
      headers: { 'Cache-Control': 'max-age=3600' }, // Set cache control header to enable caching for 1 hour
    })
      .pipe(
        catchError((error) => {
          console.error('Error occurred while searching books:', error);
          // Handle the error and return an empty array or show an error message
          return of(new HttpResponse({ body: [] }));
        }),
        finalize(() => {
          this.isLoading = false; // Set loading state to false after the request completes (success or error)
        })
      )
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200 && response.body) {
          // Extract the necessary information from the API response and format it into the Book interface
          this.searchResults = response.body.docs.map((book: any) => ({
            title: book.title,
            author_name: book.author_name || ['Unknown Author'],
            first_publish_year: book.first_publish_year || 0,
          }));
        }
      });
  }
}
