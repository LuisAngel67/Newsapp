import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: false,
})
export class ListComponent {
  @Input() items: { label: string; icon: string; route?: string }[] = [];
  @Output() select = new EventEmitter<any>();

  selectItem(item: any) {
    this.select.emit(item);
  }
}
