import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  topHeadlines: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadTopHeadlines();
  }

  loadTopHeadlines() {
    this.newsService.getTopHeadlines('us').subscribe({
      next: (res) => {
        this.topHeadlines = res.articles;
      },
      error: (err) => {
        console.error('Error fetching news:', err);
      },
    });
  }
}
