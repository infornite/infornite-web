
import { Component, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent implements OnInit {

  @Input() title: string;
  @Input() value: number;

  constructor() { }

  ngOnInit(): void {

  }

}