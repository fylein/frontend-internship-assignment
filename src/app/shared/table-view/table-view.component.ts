import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/core/models/book-response.model';
import { SubjectsService } from 'src/app/core/services/subjects.service';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  
  @Input() booksList: Book[] = [];
  @Input() subjectName = '';
  @Input() searchBooksList: Book[] = [];
  @Input() searchSubjectName = '';
  page = 1;
  limit = 10;
  isLoading =false;


constructor(private router: Router, private subjectsService :SubjectsService) {}

 public goToHomePage() {
      this.isLoading=true;
    this.router.navigate(['/']);
  }
  getAllBooks() {
    this.subjectsService.getAllBooks(this.searchSubjectName,this.page,this.limit).subscribe((data) => {
      this.searchBooksList = data?.works;
      // this.subjectsArray = data;
      // this.isLoading = false;
    });
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
  
}
