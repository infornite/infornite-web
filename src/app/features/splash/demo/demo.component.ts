import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'in4-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['../splash.component.scss']
})
export class DemoComponent implements OnInit {

  baseDomain: String
  
  constructor(
    private sidebarService: SidebarService,
    public auth: AuthService,

  ) { }

  
  ngOnInit(): void {
    this.sidebarService.hideHamburger()
    this.baseDomain = location.origin
  }


}

