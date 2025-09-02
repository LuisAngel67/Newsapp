import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
})
export class CardComponent implements OnInit {
  @Input() news: any;
  @Input() size: 'small' | 'large' = 'small';
  @Output() open = new EventEmitter<any>();

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onClick() {
    this.open.emit(this.news);
  }
}
