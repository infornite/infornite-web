
import { Component, AfterViewInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { Chart, ChartData } from 'chart.js';

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
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.label,
          data: this.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
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
        //responsive: true,
      }
    });
  }

}