import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/modules/shared/components/modal/modal.component';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  topNews: any[] = [];
  allNews: any[] = []; // guardamos las primeras 100 noticias (10 páginas)
  page = 1;
  pageSize = 10;
  country = 'us';
  loading = false;
  repeatIndex = 0; // índice para repetir noticias

  constructor(
    private newsService: NewsService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loadNews(true);
  }

  loadNews(initial = false) {
    if (this.loading) return;

    // Cuando superamos la página 10 -> dejamos de consultar API
    if (this.page > 10) {
      // Tomamos un bloque de noticias ya guardadas
      const chunk: any[] = [];
      for (let i = 0; i < this.pageSize; i++) {
        const idx = (this.repeatIndex + i) % this.allNews.length;
        chunk.push(this.allNews[idx]);
      }
      this.repeatIndex =
        (this.repeatIndex + this.pageSize) % this.allNews.length;

      this.topNews = [...this.topNews, ...chunk];
      return; // 👈 No llamar API
    }

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
      })
      .subscribe({
        next: (res: any) => {
          const newArticles = res?.articles || [];

          // Guardamos todas las noticias que traiga la API
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

  openNews(news: any) {
    if (news.url) {
      window.open(news.url, '_blank');
    }
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

    // 👇 cerramos el scroll inmediatamente
    event.target.complete();
  }
}
