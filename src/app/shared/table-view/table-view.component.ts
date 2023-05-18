import { Component, Input } from '@angular/core';
import { Book } from 'src/app/core/models/book-response.model';
import { SubjectsService } from 'src/app/core/services/subjects.service';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  constructor(private subjectService: SubjectsService) {}

  @Input() booksList: Book[] = [];
  @Input() subjectName: any = '';
  @Input() totalItems: any;
  itemsPerPage = 10;
  page = 1; 

  gty(page: any) {
    console.log(this.page, this.itemsPerPage);
    this.subjectService.getAllBooks(this.subjectName, this.page, this.itemsPerPage).subscribe((data) => {
      this.booksList = data?.works;
      this.totalItems = data.work_count;

    });
  }
}
