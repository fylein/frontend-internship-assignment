import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/core/models/book-response.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnChanges, AfterViewInit {
  @Input() booksList!: Book[];
  @Input() subjectName!: string;
  dataSource!: MatTableDataSource<Book>;
  displayedColumns!: string[];
  tableRowCount!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource<Book>();
    this.displayedColumns = ['title', 'author_name', 'first_publish_year'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    this.dataSource.data = this.booksList;
  }
}
