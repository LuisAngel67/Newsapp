import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-principal-news',
  templateUrl: './principal-news.component.html',
  styleUrls: ['./principal-news.component.scss'],
  standalone: false,
})
export class PrincipalNewsComponent {
  @Input() news: any;
  @Output() open = new EventEmitter<any>();

  onClick() {
    this.open.emit(this.news);
  }
}
