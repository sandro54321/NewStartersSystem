import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../../services/common.service'
import { Starter } from '../../../models/Starter'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public commonService:CommonService,
    public route:ActivatedRoute,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.getStarter();
  }

  starter:Starter;
  SrDataSource;
  HrDataSource;
  BaDataSource;
  SrColumns: string[] = ['supplier', 'description', 'accountType', 'state'];
  HrColumns: string[] = ['manufacturer', 'model', 'deviceType', 'state'];
  BaColumns: string[] = ['building', 'floor', 'equipmentArea', 'officeArea', 'state'];
  DataColumn: string[] = ['name', 'dateCreated', 'department', 'state'];
  
  getStarter(){
    var id = this.route.snapshot.params['id'];
    this.commonService.getStarter(id).subscribe(starters=> {this.SrDataSource = new MatTableDataSource(starters.softwareRequest); this.SrDataSource.sort = this.sort; this.starter = starters; this.HrDataSource = new MatTableDataSource(starters.hardwareRequest); this.HrDataSource.sort = this.sort;})
  }

  goBack(){
    this.router.navigate(['/hr-home'])
  }
  
}

