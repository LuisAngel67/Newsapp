import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = environment.api.newsApiUrl;

  constructor(private http: HttpClient) {}

  getTopHeadlines(
    params: {
      country?: string;
      page?: number;
      pageSize?: number;
      category?: string;
    } = {}
  ): Observable<any> {
    const { country = 'us', page = 1, pageSize = 10, category } = params;

    let httpParams = new HttpParams()
      .set('country', country)
      .set('page', String(page))
      .set('pageSize', String(pageSize));

    if (category) {
      httpParams = httpParams.set('category', category);
    }

    return this.http.get(`${this.apiUrl}/top-headlines`, {
      params: httpParams,
    });
  }
}
