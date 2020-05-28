import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CommonService } from '../../../services/common.service'
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-hr-home',
  templateUrl: './hr-home.component.html',
  styleUrls: ['./hr-home.component.css']
})

export class HrHomeComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public commonService:CommonService, public dialog: MatDialog, public flashMessage: FlashMessagesService) { }

  displayedColumns: string[] = ['name', 'dateCreated', 'department', 'state', 'actions'];
  dataSource;
  totalRequests: number;
  openRequests: number;
  completeRequests: number;
  closedRequests: number;

  ngOnInit(): void {
    this.getStarters();
  }

  getStarters(){
    this.commonService.getStarters().subscribe(starters=> {
      this.dataSource = new MatTableDataSource(starters); 
      this.dataSource.sort = this.sort; 
      this.dataSource.paginator = this.paginator;
      this.getStats(starters)
    } )  
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

    dialogRef.afterClosed().subscribe(data => {if(data == "reload"){this.getStarters(); this.flashMessage.show('New Starter Request Created', { cssClass: 'alert-success', timeout: 2000 });}});
  }

  onEdit(id){
    const dialogRef = this.dialog.open(EditComponent, {width: '900px', data: { id: id }});

    dialogRef.afterClosed().subscribe(data => {if(data == "reload"){this.getStarters()}});
  }

  confirmDialog(id): void {
    
    const message = `Are you sure you want to delete this request?`;
 
    const dialogData = new ConfirmDialogModel("Confirm Action", message, id);
 
    const ConfirmdialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
    });

    ConfirmdialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult !== false){

        this.deleteStarter(dialogResult);

      }
    });
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
