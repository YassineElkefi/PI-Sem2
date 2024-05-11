import { Component } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {
  data: any;
  options: any;

  constructor() {
    this.data = {
      labels: ['Category A', 'Category B', 'Category C', 'Category D'],
      datasets: [
        {
          data: [300, 50, 100, 200],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }
      ]
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false
    };
  }
}
