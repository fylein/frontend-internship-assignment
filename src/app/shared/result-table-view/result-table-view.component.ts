import { Component, Input} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/core/models/result-response.model';

@Component({
  selector: 'front-end-internship-assignment-result-table-view',
  templateUrl: './result-table-view.component.html',
  styleUrls: ['./result-table-view.component.scss'],
})
export class ResultTableViewComponent {
  @Input() booksList: MatTableDataSource<Book> = new MatTableDataSource();
  displayedColumns: string[] = ['title','author_name','publish_date'];
}