import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectsService: SubjectsService
  ) {}

  getAllBooks() {
    this.isLoading = true; // Set loading state to true before fetching data

    this.subjectsService.getAllBooks(this.subjectName).subscribe(
      (data) => {
        this.allBooks = data?.works;
      },
      (error) => {
        console.log('Error occurred while fetching books:', error);
      },
      () => {
        this.isLoading = false; // Set loading state to false after data is fetched
      }
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.getAllBooks();
    });
  }

  goBack(): void {
    this.router.navigate(['/']); // Modify the route path as needed
  }
}
