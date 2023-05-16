import { Component, ViewEncapsulation } from '@angular/core';
import { BooksService } from 'src/app/core/services/books.service';

@Component({
  selector: 'front-end-internship-assignment-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoaderComponent {
  constructor(public loader: BooksService){}
}
