import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/dark-unica';
theme(Highcharts);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  
  Highcharts = Highcharts;

  lineChartOptions: {};

  @Input() data = [];

  constructor() { }

  ngOnInit(): void {

    this.lineChartOptions = {
      chart: {
          type: 'spline'
      },
      title: {
          text: 'Monthly Average Temperature'
      },
      subtitle: {
          text: 'Source: WorldClimate.com'
      },
      xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
          title: {
              text: 'Temperature'
          },
          labels: {
              formatter: function () {
                  return this.value + '°';
              }
          }
      },
      tooltip: {
          crosshairs: true,
          shared: true
      },
      plotOptions: {
          spline: {
              marker: {
                  radius: 4,
                  lineColor: '#666666',
                  lineWidth: 1
              }
          }
      },
      series: [{
          name: 'New Requests',
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 0, 25.2,23.3, 18.3, 13.9, 9.6, 10]
      }]
    }
  }

}
