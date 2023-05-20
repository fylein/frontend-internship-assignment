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

  isLoading: boolean = false;

  subjectName: string = '';
  totalRecords = 0;
  allBooks: Book[] = [];

  constructor(private searchService: SearchesService) {
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
        this.subjectName = value;
        console.log(value, 'search value');
        this.isLoading = true;
        this.searchService.searchBooks(value).subscribe((data) => {
          console.log(data, 'search string after subscribe');
          if (data) {
            this.totalRecords = data?.num_found;
            console.log(this.totalRecords);
            
            const res = data?.docs;
            console.log(res, 'respion');
            this.allBooks = res.map((book: any) => {
              let authors = [];
              if (book.author_name) {
                authors = book?.author_name?.map((a: any) => {
                  return { name: a };
                });
              }

              return {
                title: book.title,
                authors: authors,
                first_publish_year: book.first_publish_year,
              };
            });
            console.log(this.allBooks, 'All books');
            this.isLoading = false;
          }
        });
      });
  }
}
