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
  isLoading = true;
  subjectName = '';
  allBooks: Book[] = [];
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectsService: SubjectsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.getAllBooks();
    });
  }

  getAllBooks(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.subjectsService.getAllBooks(this.subjectName).subscribe(
      (data: any) => {
        this.allBooks = data?.works || [];
      },
      (error: any) => {
        console.error('Error occurred while fetching books:', error);
        this.errorMessage = 'Failed to fetch books. Please try again later.';
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/']); // Modify the route path as needed
  }
}
