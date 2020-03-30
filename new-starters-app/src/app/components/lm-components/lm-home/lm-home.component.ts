import { Component, OnInit, ViewChild } from '@angular/core';


import { CommonService } from '../../../services/common.service'
import { AuthService } from '../../../services/auth.service'
import { Starter } from '../../../models/Starter'; 

import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';

import {MatDialog} from '@angular/material/dialog';


@Component({ 
  selector: 'app-lm-home',
  templateUrl: './lm-home.component.html',
  styleUrls: ['./lm-home.component.css']
})
export class LmHomeComponent implements OnInit {

  email:String;
  name:String;
  starters:Starter[];
  totalRequests: number;
  openRequests: number;
  completeRequests: number;
  closedRequests: number;


  displayedColumns: string[] = ['name', 'dateCreated', 'department', 'state', 'actions'];
  dataSource;

  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(public commonService:CommonService, public authService:AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.email = this.authService.getUserData().email; 
    this.getLmItems();
  }

  getLmItems(){ 
    this.commonService.getLmItems(this.email).subscribe(starters=>{this.dataSource = new MatTableDataSource(starters); this.dataSource.sort = this.sort; this.dataSource.paginator = this.paginator; this.getStats(starters)})
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStats(starters){
    this.totalRequests = starters.length;

    this.openRequests = 0;
    for(var i = 0; i < starters.length; ++i){
    if(starters[i].state == 'Open')
        this.openRequests++;
    }

    this.completeRequests = 0;
    for(var i = 0; i < starters.length; ++i){
    if(starters[i].state == 'Complete')
        this.completeRequests++;
    }

    this.closedRequests = 0;
    for(var i = 0; i < starters.length; ++i){
    if(starters[i].state == 'Closed')
        this.closedRequests++;
    }

  }

}
