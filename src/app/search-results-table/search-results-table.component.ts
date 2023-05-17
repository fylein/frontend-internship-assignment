import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  searchBooks(searchTerm: string): void {
    const url = `https://openlibrary.org/search.json?q=${searchTerm}`;

    this.http.get(url).subscribe((response: any) => {
      // Extract the necessary information from the API response and format it into the Book interface
      this.searchResults = response.docs.map((book: any) => ({
        title: book.title,
        author_name: book.author_name || ['Unknown Author'],
        first_publish_year: book.first_publish_year || 0,
      }));
    });
  }
}
