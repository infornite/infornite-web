import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from '@app/services/sidebar.service';
import { sidebarAnimation, iconAnimation, labelAnimation } from '../../../app/core/animations/sidebar.animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    sidebarAnimation(),
    iconAnimation(),
    labelAnimation(),
  ]
})
export class SidebarComponent implements OnInit {
  sidebarState: boolean;

  constructor(
    private sidebarService: SidebarService,
  ) { }

  ngOnInit() {
    this.sidebarService.sidebarStateObservable$.
      subscribe((newState: boolean) => {
        this.sidebarState = newState;
      });
  }
}