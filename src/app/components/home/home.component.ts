import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { SearchesService } from 'src/app/core/services/searches.service';
import { Book } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchBy: FormControl;
  private searchCache: Map<string, any> = new Map<string, any>();
  isLoading = false;

  searchString = '';
  totalPages = 1;
  allBooks: Book[] = [];
  currentPage = 1;

  constructor(private searchService: SearchesService) {
    this.bookSearch = new FormControl('');
    this.searchBy = new FormControl('q');
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
      
        this.checkString(value);
      });
  }

  public formatData(res: any) {
    return res.map((book: any) => {
      let authors = [];
      if (book.author_name) {
        authors = book?.author_name?.map((a: any) => {
          return { name: a };
        });
      }
      return {
        title: book.title,
        key: book.key,
        authors: authors,
        first_publish_year: book.first_publish_year,
      };
    });
  }

  public checkString(value: any) {
    if(value!== ''){

      const trimmedValue = value.trim();
    
    if (trimmedValue.length > 0 && this.searchString !== trimmedValue) {
      this.searchString = trimmedValue;
      this.search(1);
    }}
  }

  public search(page: any = 1) {
    const Searchtype = this.searchBy.value;
    const cacheKey = `${this.searchString}_${page}_${Searchtype}`;
    const cachedResult = this.searchCache.get(cacheKey);

    if (cachedResult) {
      this.handleSearchResults(cachedResult, page);
    } else {
      this.isLoading = true;

      //Search API
      this.searchService
        .searchBooks(this.searchString, page, Searchtype)
        .subscribe((data) => {
          if (data) {
            this.searchCache.set(cacheKey, data);
            this.handleSearchResults(data, page);
          }
          
        },(error: any) => {
          // Handle any API error
          console.error('Error occurred during search:', error);
        });
    }
  }
  handleSearchResults(data: any, page: any) {
    this.totalPages = Math.max(1, Math.floor(data?.num_found / 10));
    this.currentPage = Math.floor(data?.start / 10) + 1;
    const res = data?.docs;
    //All BOOKS to pass in table
    this.allBooks = this.formatData(res);
    this.currentPage = page;

    this.isLoading = false;
  }

  public updatePage(page: any) {
    // console.log(page, 'page to be changed from home component')
    this.search(page);
  }
}
