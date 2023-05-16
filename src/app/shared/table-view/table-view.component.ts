import { Component, Input } from '@angular/core';
import { Book } from 'src/app/core/models/book-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  @Input() booksList: Book[] = [];
  @Input() subjectName: string = '';

constructor(private router: Router){}
  onClick(){
    const home = '/';
    this.router.navigate([home])
  }
}
