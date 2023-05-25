import { Component } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Book } from 'src/app/core/models/book-response.model';
import { SearchService } from 'src/app/core/services/search.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  bookSearch: FormControl;
  subjectName = '';
  allBooks = new Array<Book>();
  booksAvailable = false;
  bookSearchForm: FormGroup;
  isLoading = false;

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.bookSearch = new FormControl('');
    this.bookSearchForm = this.fb.group({
      searchType: ['', Validators.required],
      searchQuery: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?!.*--)[A-Za-z0-9]+(?:[- ][A-Za-z0-9]+)*$'),
        ],
      ],
    });
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  get searchType() {
    return this.bookSearchForm.get('searchType');
  }
  get searchQuery() {
    return this.bookSearchForm.get('searchQuery');
  }

  onSubmit() {
    console.log(this.bookSearchForm.value);
    this.isLoading = true;
    this.searchService
      .searchBooks(this.searchType?.value, this.searchQuery?.value)
      .subscribe((data) => {
        this.allBooks = data.docs;
        this.booksAvailable = this.allBooks.length > 0 ? true : false;
        this.isLoading = false;
        if (this.allBooks.length === 0) {
          this.snackbar.open('No Book found !!', 'Close');
        }
      });
  }
}
