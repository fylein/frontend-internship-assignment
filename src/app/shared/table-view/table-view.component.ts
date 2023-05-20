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
  @Input() totalPages: any = 1;
  @Input() currentPage: any;
  @Output() pageChange = new EventEmitter();

  constructor() {
    //pass
  }
  
  changePage(pageNum: any) {
    
    if (pageNum <= this.totalPages && pageNum > 0) {
      this.pageChange.emit(pageNum);
    };
  }
}