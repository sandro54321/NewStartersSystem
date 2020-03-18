import { Component, OnInit, ViewChild } from '@angular/core';

import { CommonService } from '../../../services/common.service'
import { AuthService } from '../../../services/auth.service' 
import { Starter } from '../../../models/Starter'; 

import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';

import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-it-home',
  templateUrl: './it-home.component.html',
  styleUrls: ['./it-home.component.css']
})
export class ItHomeComponent implements OnInit {

  email:String;
  name:String;
  starters:Starter[];

  displayedColumns: string[] = ['name', 'dateCreated', 'department', 'state', 'actions'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public commonService:CommonService, public authService:AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getItItems();
  }


  getItItems(){ 
    this.commonService.getItItems().subscribe(starters=>{this.dataSource = new MatTableDataSource(starters); this.dataSource.sort = this.sort; this.dataSource.paginator = this.paginator})
  }

    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
