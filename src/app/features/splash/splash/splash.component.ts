import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'in4-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['../splash.component.scss']
})
export class SplashComponent implements OnInit {

  email="michael@infornite.com"
  constructor(
    private sidebarService: SidebarService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sidebarService.hideHamburger()
  }

  openPicDialog(pic) {
    this.dialog.open(LightboxDialog, {data: { image: pic},panelClass: 'lightbox-dialog' });
  }
}

import { Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'lightbox-dialog',
  templateUrl: 'pic-dialog.html',
})
export class LightboxDialog {
  img: string
  constructor(@Inject(MAT_DIALOG_DATA) public data: {image: string}) {

  }

  
}