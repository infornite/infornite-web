import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarState = false;
  private sidebarStateChanged$ = new BehaviorSubject<boolean>(this.sidebarState);
  public sidebarStateObservable$ = this.sidebarStateChanged$.asObservable();

  private hamburgerState = false;
  private hamburgerStateChanged$ = new BehaviorSubject<boolean>(this.hamburgerState);
  public  hamburgerStateObservable$ = this.hamburgerStateChanged$.asObservable();


  constructor() {
    this.sidebarStateChanged$.next(false);
    this.hamburgerStateChanged$.next(false);
  }

  toggle() {
    this.sidebarState = this.sidebarState? false : true;
    this.sidebarStateChanged$.next(this.sidebarState);
  }

  close() {
    this.sidebarState =  false;
    this.sidebarStateChanged$.next(this.sidebarState);
  }

  open() {
    this.sidebarState =  true;
    this.sidebarStateChanged$.next(this.sidebarState);
  }

  showHamburger() {
    this.hamburgerState =  true;
    this.hamburgerStateChanged$.next(this.hamburgerState);
  }

  hideHamburger() {
    this.hamburgerState =  false;
    this.hamburgerStateChanged$.next(this.hamburgerState);
  }
}