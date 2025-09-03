import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categorySubject = new BehaviorSubject<string>('');
  category$ = this.categorySubject.asObservable();

  constructor() {}

  setCategory(category: string) {
    this.categorySubject.next(category);
  }

  getCategory(): string {
    return this.categorySubject.value;
  }
}
