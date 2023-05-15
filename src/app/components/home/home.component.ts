import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, firstValueFrom } from 'rxjs';
import { BooksService } from 'src/app/core/services/books.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;

  constructor(private booksService: BooksService) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  books: Array<any> = [];

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      subscribe((value: string) => {
      });
  }
  async searchBooks(searchText: string) {
    // console.log(searchText);
    try{
      const response = await firstValueFrom(this.booksService.getData(searchText));
      this.books = response.docs.map((book: any) => {
        // console.log(book);
        return{
          title: book.title,
          author: book.author_name,
          publicationYear: book.first_publish_year,
          bookUrl: `https://openlibrary.org/${book.key}`
        }
        
      })
    }catch(error){
      console.log(error);      
    }

  }
}
