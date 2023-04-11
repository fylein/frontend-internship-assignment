import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { SearchResponse } from 'src/app/core/models/book-response.model';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    constructor(private apiService: ApiService) { }

    submitSearch(query: string, currentPage: number, limit: number): Observable<SearchResponse> {
        // const limit = 10;
        return this.apiService.get(`/search.json?q=${query.toLowerCase().split(' ').join('_')}&offset=${(currentPage - 1) * limit}&limit=${limit}`);
    }
}