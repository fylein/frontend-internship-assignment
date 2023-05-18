import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchResults: any[] = [];
  displayedSearchResults: any[] = [];
  pageSize = 10;
  currentPage = 0;
  loading = false;
  @Input() subjectName: string = '';
  @Input() bookName: string = '';

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
      .pipe(
        debounceTime(300),
        filter((query: string) => query.length >= 1),
        switchMap((query: string) => this.searchBooks(query))
      )
      .subscribe((response: any) => {
        this.searchResults = response.docs;
        this.updateDisplayedSearchResults();
        this.loading = false;
      });
  }

  searchBooks(query: string) {
    const url = `https://openlibrary.org/search.json?title=${query}&author=${query}`;
    this.loading = true;
    return this.http.get(url);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedSearchResults();
  }
  clearSearch() {
    this.bookSearch.setValue(''); // Clear the search key
  }

  updateDisplayedSearchResults() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedSearchResults = this.searchResults.slice(startIndex, endIndex);
  }
}
