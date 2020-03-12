import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { CommonService } from '../../../services/common.service'
import { Starter } from '../../../models/Starter'; 
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';

import {MatDialog} from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-hr-home',
  templateUrl: './hr-home.component.html',
  styleUrls: ['./hr-home.component.css']
})
export class HrHomeComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public commonService:CommonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStarters();
  }

  //starterss:Starter[];
  displayedColumns: string[] = ['name', 'dateCreated', 'department', 'state', 'actions'];
  dataSource;


  getStarters(){
    this.commonService.getStarters().subscribe(starters=> {this.dataSource = new MatTableDataSource(starters); this.dataSource.sort = this.sort; this.dataSource.paginator = this.paginator;} )  
  }

  deleteStarter(id){
    this.commonService.deleteStarter(id).subscribe(()=>{this.getStarters()});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate(){
    const dialogRef = this.dialog.open(AddComponent, {width: '900px'});

    dialogRef.afterClosed().subscribe(data => {if(data == "reload"){this.getStarters()}});
  }

  onEdit(id){
    const dialogRef = this.dialog.open(EditComponent, {width: '900px', data: { id: id }});

    dialogRef.afterClosed().subscribe(data => {if(data == "reload"){this.getStarters()}});
  }
}
