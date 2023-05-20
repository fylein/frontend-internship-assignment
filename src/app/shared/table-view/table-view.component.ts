import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent  {
  @Input() booksList: Book[] = [];
  @Input() subjectName = '';
  @Input() totalPages: any;
  @Input() currentPage: any;
  @Output() pageChange = new EventEmitter();
  p = 1;
  constructor() {
    //fs
  }
  
  changePage(pageNum: any) {
    console.log('changing page', pageNum);
    if (pageNum < this.totalPages && pageNum > 0) {
      this.pageChange.emit(pageNum);
    };
  }
}