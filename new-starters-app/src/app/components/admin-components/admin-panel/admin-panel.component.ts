import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CommonService } from '../../../services/common.service'
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AdminEditComponent } from '../admin-edit/admin-edit.component';
import { AdminCreateComponent } from '../admin-create/admin-create.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public commonService:CommonService, public dialog: MatDialog, public flashMessage: FlashMessagesService) { }

  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource;
  totalRequests: number;
  openRequests: number;
  completeRequests: number;
  closedRequests: number;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.commonService.getUsers().subscribe(Users=> {
      this.dataSource = new MatTableDataSource(Users); 
      this.dataSource.sort = this.sort; 
      this.dataSource.paginator = this.paginator; console.log('users: ', Users);
    } )  
  }

  deleteUser(id){
    this.commonService.deleteUser(id).subscribe(()=>{this.getUsers()});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate(){
    const dialogRef = this.dialog.open(AdminCreateComponent, {maxWidth: "500px"});

    dialogRef.afterClosed().subscribe(data => {if(data == "reload"){this.getUsers(); this.flashMessage.show('New User Created', { cssClass: 'alert-success', timeout: 2000 });}});
  }

  onEdit(id){
    const dialogRef = this.dialog.open(AdminEditComponent, {maxWidth: "500px", data: { id: id }});

   dialogRef.afterClosed().subscribe(data => {if(data == "reload"){this.getUsers()}});
  }

  confirmDialog(id): void {
    
    const message = `Are you sure you want to delete this user?`;
 
    const dialogData = new ConfirmDialogModel("Confirm Action", message, id);
 
    const ConfirmdialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
    });

    ConfirmdialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult !== false){
        this.deleteUser(dialogResult);

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
