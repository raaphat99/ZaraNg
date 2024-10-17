import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HambergermenueService {
  private menuVisible = new BehaviorSubject<boolean>(false);
  menuVisible$ = this.menuVisible.asObservable();

  toggleMenu() {
    this.menuVisible.next(!this.menuVisible.value);
  }

  showMenu() {
    this.menuVisible.next(true);
  }

  hideMenu() {
    this.menuVisible.next(false);
  }
}
