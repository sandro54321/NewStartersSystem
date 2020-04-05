import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/dark-unica';
theme(Highcharts);


@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: ['./stacked-bar.component.css']
})
export class StackedBarComponent implements OnInit {

  Highcharts = Highcharts;

  stackedBarChartOptions: {};

  @Input() data = [];

  constructor() { }

  ngOnInit(): void {

    this.stackedBarChartOptions = {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Stacked bar chart'
      },
      xAxis: {
          categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Total fruit consumption'
          }
      },
      legend: {
          reversed: true
      },
      plotOptions: {
          series: {
              stacking: 'normal'
          }
      },
      series: [{
          name: 'John',
          data: [5, 3, 4, 7, 2]
      }, {
          name: 'Jane',
          data: [2, 2, 3, 2, 1]
      }, {
          name: 'Joe',
          data: [3, 4, 4, 2, 5]
      }]
  }

  }

}
