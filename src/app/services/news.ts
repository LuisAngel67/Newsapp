import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = environment.api.newsApiUrl;

  constructor(private http: HttpClient) {}

  getTopHeadlines(country: string = 'us'): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-headlines?country=${country}`);
  }
}
