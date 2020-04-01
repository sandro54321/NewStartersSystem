import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/dark-unica';
theme(Highcharts);

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  Highcharts = Highcharts;

  barChartOptions: {};

  @Input() data = [];

  constructor() { }

  ngOnInit(): void {
    
    this.barChartOptions = {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Number Of Requests By Status'
      },
      xAxis: {
          categories: [
              'Open',
              'Complete',
              'Closed'
          ],
          crosshair: true
      },
      credits: {
        enabled: false
      },
      yAxis: {
          min: 0,
          title: {
              text: '# of Requests'
          }
      },
      legend: {
        itemStyle: {
           font: '9pt Trebuchet MS, Verdana, sans-serif',
           color: '#A0A0A0'
        },
        itemHoverStyle: {
           color: '#FFF'
        },
        itemHiddenStyle: {
           color: '#444'
        }

  },
  
      tooltip: {
        headerFormat: '<span style="font-size:12px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: this.data
  }
  }

}
