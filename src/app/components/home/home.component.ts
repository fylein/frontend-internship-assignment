import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchResults: any[] = []; // Array to store search results
  currentPage = 1; // Current page number
  pageSize = 10; // Number of results per page
  totalResults = 0; // Total number of search results
  isLoading = false; // Loading state

  constructor(private http: HttpClient) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: string) => {
        this.currentPage = 1; // Reset to first page when search term changes
        this.searchBooks(value);
      });
  }

  searchBooks(searchTerm: string): void {
    const params = new HttpParams()
      .set('q', searchTerm)
      .set('limit', this.pageSize.toString())
      .set('offset', ((this.currentPage - 1) * this.pageSize).toString());

    this.isLoading = true; // Show loader

    this.http.get('https://openlibrary.org/search.json', { params })
      .subscribe((response: any) => {
        this.searchResults = response.docs;
        this.totalResults = response.numFound;
        this.isLoading = false; // Hide loader
      });
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchBooks(this.bookSearch.value);
    }
  }

  goToNextPage(): void {
    const totalPages = Math.ceil(this.totalResults / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.searchBooks(this.bookSearch.value);
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalResults / this.pageSize);
  }

  clearSearch(): void {
    this.bookSearch.setValue('');
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(startPage + 4, totalPages);
  
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.searchBooks(this.bookSearch.value);
    }
  }
}
