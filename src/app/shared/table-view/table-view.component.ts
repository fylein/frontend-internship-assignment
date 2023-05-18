import { HttpClient } from '@angular/common/http';
import { Component, Input, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Book } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  displayedbooksList: any[] = [];
  pageSize = 10;
  currentPage = 0;
  @Input() booksList: Book[] = [];
  @Input() subjectName: string = '';
}
