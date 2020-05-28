import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Component({
  selector: 'app-hr-stats',
  templateUrl: './hr-stats.component.html',
  styleUrls: ['./hr-stats.component.css']
})
export class HrStatsComponent implements OnInit {

  //StatusByDepartment: Observable<any[]>; // you have to declare as an Observable of values
  StatusByDepartment: {};
  NumberOfRequestsByDepartment: {}
  NumberOfRequestsPerMonth: {}
  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.statisticsService.StatusByDepartment().subscribe(data => {this.StatusByDepartment = data;});
    this.statisticsService.NumberOfRequestsByDepartment().subscribe(data => {this.NumberOfRequestsByDepartment = data;});
    this.statisticsService.NumberOfRequestsPerMonth().subscribe(data => {this.NumberOfRequestsPerMonth = data; console.log(this.NumberOfRequestsPerMonth)});
    this.statisticsService.RequestsPerDevisionAndDepartment().subscribe(data => console.log())

  }

}
