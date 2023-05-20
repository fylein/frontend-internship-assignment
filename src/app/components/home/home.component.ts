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

  isLoading = false;

  subjectName ='';
  totalRecords = 0;
  allBooks: Book[] = [];
  currentPage = 1

  constructor(private searchService: SearchesService) {
    this.bookSearch = new FormControl('');
    this.searchBy = new FormControl('');
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
        this.isLoading = true;
        const type = this.searchBy.value;
        //Search API
        this.searchService.searchBooks(value,1,type).subscribe((data) => {
          if (data) {
            this.totalRecords = Math.floor(data?.num_found / 10);
            this.currentPage = Math.floor(data?.start / 10) + 1
            const res = data?.docs;
            //All BOOKS to pass in table
            this.allBooks = this.formatData(res);
            this.isLoading = false;
          }
        });
      });
  }

public formatData(res:any){
  
  
 return res.map((book: any) => {
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
}


  public updatePage(page: any) {
    console.log(page, 'page to be changed from home component')
    this.searchService.searchBooks(this.subjectName, page).subscribe(data => {
      if(data){
        this.allBooks = this.formatData(data?.docs);
        this.currentPage= page;
        console.log('after page change', page, this.allBooks);
        
      }
      
    });
  }
}
