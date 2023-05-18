import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { SubjectsService } from 'src/app/core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  bookname: any;
  allBooks: Book[] = [];
  constructor(private subjectService: SubjectsService) {
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
      .subscribe((value: string) => {});
  }
  searchedBook(textSearched: any) {
    this.bookname = textSearched.target.value;
    this.subjectService.getSearchedBooks(this.bookname).subscribe((data) => {
      const fetchedBooks = data?.docs;
      this.allBooks = fetchedBooks.map((el) => {
        return {
          title: el.title,
          first_publish_year: el.first_publish_year,
          authors: [{name:el.author_name}],
          ...el
        };
      });
      console.log(this.allBooks);
    });
  }
}
