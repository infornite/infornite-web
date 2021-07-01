import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'in4-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['../splash.component.scss']
})
export class SplashComponent implements OnInit {

  email = "michael@infornite.com"

  constructor(
    private sidebarService: SidebarService,
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {

    this.sidebarService.hideHamburger()
    if (this.router.url != '/splash') {
      this.auth.isAuthenticated$.subscribe((authenticated: boolean) => {
        if (authenticated) {
          this.router.navigate(['/discover'])
        }
      });
    }
  }

  openPicDialog(pic) {
    this.dialog.open(LightboxDialog, { data: { image: pic }, panelClass: 'lightbox-dialog' });
  }
}

import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
@Component({
  selector: 'lightbox-dialog',
  templateUrl: 'pic-dialog.html',
})
export class LightboxDialog {
  img: string
  constructor(@Inject(MAT_DIALOG_DATA) public data: { image: string }) {

  }


}