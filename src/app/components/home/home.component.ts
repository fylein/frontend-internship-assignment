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
  // posts: unknown;
  page = 1;
  count = 0;
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
      // clear localStorage every 1hr
      setInterval(() => {
        localStorage.clear();
      }, 60*60*1000)
  }

  async searchBooks(searchText: string) {
    // console.log(searchText);

    // if data is cached then get from localStorage
    const localData = localStorage.getItem(searchText);
    if(localData){
      const {books} = JSON.parse(localData);
      this.books = books;
      console.log("local data");
      
      return;
    }
    try{
      const response = await firstValueFrom(this.booksService.getData(searchText, 100));
      this.books = response.docs.map((book: any) => {
        // console.log(book);
        return{
          title: book.title,
          author: book.author_name,
          publicationYear: book.first_publish_year,
          bookUrl: `https://openlibrary.org/${book.key}`
        }
      });
        //save to localStorage
      localStorage.setItem(
        searchText, JSON.stringify({
          books: this.books,
        })
      );
    }catch(error){
      console.log(error);      
    }

  }
// Clear search functionality
  clearSearch(event: any){
    // console.log("Cls");
    if(this.bookSearch.value != ""){
      this.bookSearch.setValue("");
      this.searchBooks(this.bookSearch.value)
    }
  }
// Pagination
  onPageChange(event: any){
    this.page = event;
  }
}
