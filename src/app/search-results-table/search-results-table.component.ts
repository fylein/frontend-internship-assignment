import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Book {
  title: string;
  author_name: string[];
  first_publish_year: number;
  // Add more properties as needed
}

interface SearchResponse {
  docs: any[]; // Replace 'any' with a more specific interface if available
}

@Component({
  selector: 'app-search-results-table',
  templateUrl: './search-results-table.component.html',
  styleUrls: ['./search-results-table.component.scss'],
})
export class SearchResultsTableComponent {
  @Input() searchResults: Book[] = [];
  private apiUrl = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) {}

  searchBooks(searchTerm: string): void {
    const url = `${this.apiUrl}?q=${searchTerm}`;

    this.http.get<SearchResponse>(url).subscribe(
      (response: SearchResponse) => {
        // Extract the necessary information from the API response and format it into the Book interface
        this.searchResults = response.docs.map((book: any) => ({
          title: book.title,
          author_name: book.author_name || ['Unknown Author'],
          first_publish_year: book.first_publish_year || 0,
        }));
      },
      (error: any) => {
        console.error('Error fetching search results:', error);
        // Handle the error appropriately, e.g., display an error message
      }
    );
  }
}
