import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/dark-unica';
theme(Highcharts);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  Highcharts = Highcharts;

  pieChartOptions: {};

  @Input() data = [];

  constructor() { }

  ngOnInit(): void {
  this.pieChartOptions = {chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
},
yAxis: {
  allowDecimals: false
},
title: {
    text: 'Requests Per Department'
},
tooltip: {
    pointFormat: '{series.name}: <b>{point.y}</b>'
},
accessibility: {
    point: {
        valueSuffix: '%'
    }
},
plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: false
        },
        showInLegend: true
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
series: [{
    name: 'Brands',
    colorByPoint: true,
    data:this.data
}]
}
    }

}
