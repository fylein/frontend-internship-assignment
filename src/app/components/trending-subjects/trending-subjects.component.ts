import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-trending-subjects',
  templateUrl: './trending-subjects.component.html',
  styleUrls: ['./trending-subjects.component.scss'],
})
export class TrendingSubjectsComponent implements OnInit {
  isLoading: boolean = true;
  subjectName: string = '';
  allBooks: Book[] = [];
  totalItems: any;
  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService
  ) {}

  getAllBooks() {
    this.subjectsService.getAllBooks(this.subjectName, 1, 10).subscribe((data) => {
    
      this.allBooks = data?.works;
     
      // this.subjectsArray = data;
      this.isLoading = false;
      this.totalItems = data.work_count;   
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.isLoading = true;
      this.getAllBooks();
    });
  }
}
