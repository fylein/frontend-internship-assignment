import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { debounceTime, elementAt, filter } from 'rxjs';
import { Book } from 'src/app/core/models/book-response.model';
import { SubjectsService } from 'src/app/core/services/subjects.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchSubjectName = '';
  page = 1;
  limit = 10;
  searchAllBooks: Book[] = [];
  isLoading = false;
  searchClicked=false;

 
  

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  
  books: any;

  
  constructor( private route: ActivatedRoute,
    private subjectsService: SubjectsService) {
    this.bookSearch = new FormControl('');

  }
  getAllBooks() {
      if(this.searchSubjectName){ 
       this.isLoading=true;
       this.subjectsService.getAllBooks(this.searchSubjectName,this.page,this.limit)
      .pipe(debounceTime(500))
      .subscribe((data) => {
      this.searchAllBooks = data?.works;
      // this.subjectsArray = data;
      // this.isLoading = false;
      this.isLoading=false;
      this.searchClicked=true;
      this.searchAllBooks = this.books.filter((book: { title: string; }) =>
      book.title.toLowerCase().includes(this.searchSubjectName.toLowerCase())
    );
    });
  }
}
  
  
  clearSearch() {
    this.searchSubjectName = '';
    this.searchAllBooks = [];
    this.searchClicked = false;
  }


  next() {
    this.page++;
    this.getAllBooks();
   
    }
  previous() {
    if (this.page > 1) {
      this.page--;
      this.getAllBooks();
    }
  } 

 
  // ngOnInit(): void {
  //   this.bookSearch.valueChanges
  //     .pipe(
  //       debounceTime(300),
  //     ).
  //     subscribe((value: string) => {
  //     });
  // }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchSubjectName = params.get('name') || '';
      // this.isLoading = true;
      this.getAllBooks();
    });
      
    }
  }

