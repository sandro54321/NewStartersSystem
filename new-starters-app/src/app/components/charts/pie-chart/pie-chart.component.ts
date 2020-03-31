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
title: {
    text: 'Browser market shares in January, 2018'
},
tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
series: [{
    name: 'Brands',
    colorByPoint: true,
    data:this.data
}]
}
    }

}
