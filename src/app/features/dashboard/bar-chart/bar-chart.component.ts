
import { Component, AfterViewInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { Chart, ChartData } from 'chart.js';
import 'chartjs-plugin-colorschemes';

import { Aspect6 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office';
import { Tableau20,RedBlueBrown12} from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.tableau';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('barCanvas') private barCanvas: ElementRef;

  @Input() labels: any[];
  @Input() label: string;
  @Input() data: any[];
  @Input() type: string = 'bar';
  @Input() colorScheme: string[];


  barChart: Chart;

  constructor() { }

  ngAfterViewInit(): void {
    this.barChartMethod();
  }

  ngOnChanges(): void {
    if (this.barChart) {
      this.barChart.data.labels = this.labels
      this.barChart.data.datasets[0].label = this.label
      this.barChart.data.datasets[0].data = this.data
      this.barChart.update()
    }
  }


  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: [{
          label: this.label,
          data: this.data,
          backgroundColor:this.colorScheme,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        responsive: true,
      }
    });
  }

}