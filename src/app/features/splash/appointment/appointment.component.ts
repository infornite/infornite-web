import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { AuthService } from '@auth0/auth0-angular';
import {
  NgModule,
  VERSION,
  ElementRef,
  ViewChild
} from '@angular/core'

declare const Calendly: any;

@Component({
  selector: 'in4-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['../splash.component.scss']
})
export class AppointmentComponent implements OnInit, AfterViewInit {


  @ViewChild('calendlyContainer') calendlyContainer: ElementRef;
  private fragment: string;
  constructor(
    private sidebarService: SidebarService,
    public auth: AuthService,

  ) { }

  ngOnInit(): void {
    this.sidebarService.hideHamburger()

  }

  ngAfterViewInit() {
    Calendly.initInlineWidget({
      url: 'https://calendly.com/mfosullivan/discover',
      parentElement: this.calendlyContainer.nativeElement
    });
  }


}
