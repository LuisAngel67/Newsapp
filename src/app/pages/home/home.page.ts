import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/modules/shared/components/modal/modal.component';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  topNews: any[] = [];
  allNews: any[] = [];
  page = 1;
  pageSize = 10;
  country = 'us';
  currentCategory = '';
  loading = false;
  repeatIndex = 0;

  private categorySub!: Subscription;

  constructor(
    private newsService: NewsService,
    private modalCtrl: ModalController,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categorySub = this.categoryService.category$.subscribe((cat) => {
      this.currentCategory = cat;
      this.loadNews(true);
    });

    this.loadNews(true);
  }

  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }

  loadNews(initial = false) {
    if (this.loading) return;

    if (initial) {
      this.page = 1;
      this.topNews = [];
      this.allNews = [];
    }

    this.loading = true;

    this.newsService
      .getTopHeadlines({
        country: this.country,
        page: this.page,
        pageSize: this.pageSize,
        category: this.currentCategory || undefined,
      })
      .subscribe({
        next: (res: any) => {
          const newArticles = res?.articles || [];
          this.allNews = [...this.allNews, ...newArticles];
          this.topNews = [...this.topNews, ...newArticles];
          this.page += 1;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading news', err);
          this.loading = false;
        },
      });
  }

  async openNewsModal(news: any) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: { news },
    });
    return await modal.present();
  }

  loadMore(ev: Event) {
    const event = ev as InfiniteScrollCustomEvent;
    this.loadNews();
    event.target.complete();
  }

  openNews(news: any) {
    if (news.url) {
      window.open(news.url, '_blank');
    }
  }
}
