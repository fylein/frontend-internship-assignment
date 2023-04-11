import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { Book, Doc } from 'src/app/core/models/book-response.model';
import { SearchService } from 'src/app/core/services/search.services';
import { SharedModule } from 'src/app/shared/shared.module';
@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [SharedModule]
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  books: Book[] = []// sample data for booksList parameter
  query = '';
  showQueryReset = false;

  pageResultsDisplay: FormControl; // limit results count
  resultCount = 0; // total number of results found for the query;
  currentPage = 1;
  totalPages = 1;

  startEntryCount = 0;
  endEntryCount = 0;

  state = "initial"

  constructor(
    private searchService: SearchService
  ) {
    this.bookSearch = new FormControl('');
    this.pageResultsDisplay = new FormControl('')
    this.pageResultsDisplay.setValue(10);
    this.bookSearch.valueChanges.forEach(value => {
      if (value.length > 0) {
        this.showQueryReset = true;
      } else {
        this.showQueryReset = false;
      }
    })
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
      )
  }
  onEnter() {
    this.submitSearch(1, 10)
  }
  submitSearch(currentPage: number, limit: number) {
    this.state = 'loading';
    this.searchService.submitSearch(this.bookSearch.value, currentPage, limit).subscribe((data) => {
      console.log('Search', data);
      // Change the Loading state
      // Update the Data object
      this.books = data.docs;
      if (data.docs.length > 0) {
        this.state = "completed";
        // Update the Query String of Results
        this.query = this.bookSearch.value;

        // Update the Pagination state variables
        this.startEntryCount = data.start
        if (currentPage > 1) {
          this.startEntryCount++;
        }
        this.endEntryCount = Number(this.pageResultsDisplay.value * currentPage);
        this.resultCount = data.numFound;
        this.currentPage = currentPage;
        this.totalPages = Math.ceil(this.resultCount / this.pageResultsDisplay.value)

        if (this.resultCount < this.endEntryCount) {
          this.endEntryCount = this.resultCount
        }
      } else {
        this.state = "notfound"
      }
    });
  }
  resetQuery() {
    this.bookSearch.setValue('');
  }
  onPageResultsDisplayChange() {
    if (this.bookSearch.value.length > 0) {
      this.submitSearch(this.currentPage, this.pageResultsDisplay.value)
    }
  }

  goToPage(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= this.totalPages)
      this.submitSearch(pageNumber, this.pageResultsDisplay.value)
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.submitSearch(--this.currentPage, this.pageResultsDisplay.value)
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.submitSearch(++this.currentPage, this.pageResultsDisplay.value)
    }
  }

  generatePageButtons(): number[] {
    const pageButtons: number[] = [];

    if (this.totalPages > 7) {
      if (this.currentPage < 3) {
        // if there are more than 7 pages, show first 3 and last 3 page numbers
        pageButtons.push(1, 2, 3);
        pageButtons.push(-1); // use -1 to represent ellipsis (...)
        pageButtons.push(this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pageButtons.push(this.currentPage - 2, this.currentPage - 1, this.currentPage);
        pageButtons.push(this.currentPage + 1, this.currentPage + 2);
      }
    } else {
      // otherwise, show all page numbers
      for (let i = 1; i <= this.totalPages; i++) {
        pageButtons.push(i);
      }
    }

    return pageButtons;
  }

}
