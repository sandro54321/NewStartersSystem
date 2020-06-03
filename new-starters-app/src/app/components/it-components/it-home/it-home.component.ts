import { Component, OnInit, ViewChild } from '@angular/core';

import { CommonService } from '../../../services/common.service'
import { AuthService } from '../../../services/auth.service' 
import { Starter } from '../../../models/Starter'; 

import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';

import {MatDialog} from '@angular/material/dialog';
import { AssignRequestComponent } from '../../assign-request/assign-request.component';

@Component({
  selector: 'app-it-home',
  templateUrl: './it-home.component.html',
  styleUrls: ['./it-home.component.css']
})
export class ItHomeComponent implements OnInit {

  email:String;
  name:String;
  starters:Starter[];
  ItState:String;
  totalRequests: number;
  openRequests: number;
  completeRequests: number;
  closedRequests: number;

  displayedColumns: string[] = ['name', 'dateCreated', 'department', 'assignedTo', 'state', 'actions'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public commonService:CommonService, public authService:AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getItItems();
  }


  getItItems(){ 
    this.commonService.getItItems().subscribe(starters=>{this.dataSource = new MatTableDataSource(starters); this.dataSource.sort = this.sort; this.dataSource.paginator = this.paginator; this.getStats(starters)})
  }

  onAssign(id){
    const dialogRef = this.dialog.open(AssignRequestComponent, {width: '900px', data: {id:  id, type: 'it'}});
    dialogRef.afterClosed().subscribe(data => {
      if(data =='reload'){
        this.getItItems();
      }

    });
  }
    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    getStats(starters){
    this.totalRequests = starters.length;

    this.openRequests = 0;
    for(var i = 0; i < starters.length; ++i){
    if(starters[i].ItState == 'Open')
        this.openRequests++;
    }

    this.completeRequests = 0;
    for(var i = 0; i < starters.length; ++i){
    if(starters[i].ItState == 'Complete')
        this.completeRequests++;
    }

    this.closedRequests = 0;
    for(var i = 0; i < starters.length; ++i){
    if(starters[i].ItState == 'Closed')
        this.closedRequests++;
    }

  }
  
}
