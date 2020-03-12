import { Component, ViewChild,OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';


import { CommonService } from '../../services/common.service'
import { Starter } from '../../models/Starter'; 

import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})


export class TestingComponent {
  /** Based on the screen size, switch from standard to one column per row */

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  starter: Starter
  SrDataSource;
  HrDataSource;
  BaDataSource;
  SrColumns: string[] = ['supplier', 'description', 'accountType', 'state'];
  HrColumns: string[] = ['manufacturer', 'model', 'deviceType', 'state'];
  BaColumns: string[] = ['building', 'floor', 'equipmentArea', 'officeArea', 'state'];
  DataColumn: string[] = ['name', 'dateCreated', 'department', 'state'];


  constructor(private breakpointObserver: BreakpointObserver, public commonService:CommonService ,   public route:ActivatedRoute,
    public router:Router) {}

  ngOnInit(): void {
    this.getStarter();
  }

  name: String;
  state: String

  getStarter(){
    var id = this.route.snapshot.params['id'];
    this.commonService.getStarter(id).subscribe(starters=> {this.SrDataSource = new MatTableDataSource(starters.softwareRequest); this.SrDataSource.sort = this.sort; this.starter = starters; this.HrDataSource = new MatTableDataSource(starters.hardwareRequest); this.HrDataSource.sort = this.sort;})
    
  }

  deleteStarter(id){
    this.commonService.deleteStarter(id).subscribe(()=>{this.getStarter();});
  }

  
}
