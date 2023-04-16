import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { ApiService } from '../../core/services/api.service'
import { Book, SearchResponse } from 'src/app/core/models/result-response.model';
import { ResultTableViewComponent } from "../../shared/result-table-view/result-table-view.component"
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

interface cacheDataInterface {
  [key: string]: {
    data: {
      [key: number]: Book[]
    }
    totalSize: number
  },
}

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearchResult: MatTableDataSource<Book>;
  bookSearch: FormControl;
  limit = 10;
  totalSize = 0;
  pageIndex = 0
  searchText = ""
  displayedColumns = ["title"]
  isLoading = false
  cacheData: cacheDataInterface = {}
  constructor(private http: ApiService) {
    this.bookSearch = new FormControl('');
    this.bookSearchResult = new MatTableDataSource()
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).
      subscribe((value: string) => {
        this.searchText = value
        this.pageIndex = 0
        this.bookSearchResult.data = []
        this.totalSize = 0
        if (value === '')
          return;
        if (this.cacheData[value]) {
          this.bookSearchResult.data = this.cacheData[value].data[0]
          this.totalSize = this.cacheData[value].totalSize
        }
        else {
          this.isLoading = true
          this.http
            .get<SearchResponse>("/search.json", { params: { q: `author:${value} OR title:${value}`, limit: this.limit } }).subscribe(
              (data) => {
                console.log(data);
                this.isLoading = false
                this.bookSearchResult.data = data.docs
                this.totalSize = data.num_found
                this.cacheData[value] = {
                  data:{0: data.docs},
                  totalSize: data.num_found
                }
              }
            )
        }


      });
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    console.log(this.cacheData);
    if (this.cacheData[this.searchText].data[event.pageIndex]) {
      this.bookSearchResult.data = this.cacheData[this.searchText].data[event.pageIndex]
    } else {
      this.isLoading = true
      this.http
        .get<SearchResponse>("/search.json", { params: { q: `author:${this.searchText} OR title:${this.searchText}`, offset: event.pageIndex * this.limit, limit: this.limit } }).subscribe(
          (data) => {
            this.cacheData[this.searchText].data[event.pageIndex] = data.docs
            this.bookSearchResult.data = data.docs
            this.pageIndex = event.pageIndex
            this.isLoading = false
          }
        )
    }
    return event
  }
}
