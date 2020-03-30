import { Component, OnInit, ViewChild } from '@angular/core';

import { CommonService } from '../../../services/common.service'
import { Starter } from '../../../models/Starter'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { LmAddComponent } from '../lm-add/lm-add.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { EmailService } from '../../../services/email.service'


@Component({
  selector: 'app-lm-show',
  templateUrl: './lm-show.component.html',
  styleUrls: ['./lm-show.component.css']
}) 
export class LmShowComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  starter: Starter
  SrDataSource;
  HrDataSource;
  BaDataSource;
  SrColumns: string[] = ['supplier', 'description', 'accountType', 'state', 'actions'];
  HrColumns: string[] = ['manufacturer', 'model', 'deviceType', 'state', 'actions'];
  BaColumns: string[] = ['building', 'floor', 'equipmentArea', 'officeArea', 'state', 'actions'];


  constructor(
    public commonService:CommonService,
    public route:ActivatedRoute,
    public router:Router,
    public dialog: MatDialog,
    public emailService:EmailService
  ) { }

  ngOnInit(): void {
    this.getStarter();
  }

  getStarter(){
    var id = this.route.snapshot.params['id'];
    this.commonService.getStarter(id).subscribe(starters=> {
      this.starter = starters; 
      this.SrDataSource = new MatTableDataSource(starters.softwareRequest); 
      this.SrDataSource.sort = this.sort; 
      this.HrDataSource = new MatTableDataSource(starters.hardwareRequest); 
      this.HrDataSource.sort = this.sort;
      this.BaDataSource = new MatTableDataSource(starters.buildingAccess); 
    })
    
  }

  deleteStarter(id){
    this.commonService.deleteStarter(id).subscribe(()=>{this.getStarter();});
  }

  goBack(){
    this.router.navigate(['/lm'])
  } 

  onCreate(_id,type){

    const dialogRef = this.dialog.open(LmAddComponent, {width: '900px', data: { id:  _id, fType: type}});

    //dialogRef.afterClosed().subscribe(data => {if(data == "reload"){this.getStarter()}});
    dialogRef.afterClosed().subscribe(data => {
      if(data.sr.length > 0){
      this.SrDataSource.data.push.apply(this.SrDataSource.data, data.sr), 
      this.SrDataSource.data = this.SrDataSource.data,
      this.starter.ItState = 'Open';
      this.sendEmail(this.starter);
      }
      
      if(data.hr.length > 0){
      this.HrDataSource.data.push.apply(this.HrDataSource.data, data.hr),
      this.HrDataSource.data = this.HrDataSource.data,
      this.starter.ItState = 'Open';
      }
      
      if(data.ba.length > 0){
      this.BaDataSource.data.push.apply(this.BaDataSource.data, data.ba),
      this.BaDataSource.data = this.BaDataSource.data};
      this.starter.propertyState = 'Open';
    });
  }

  updateStarter(){
    console.log('id ', this.starter._id);
    console.log('stater', this.starter);
    this.commonService.updateStarter(this.starter._id,this.starter).subscribe(() => this.goBack())
    this.userAD(this.starter);
  }
  
  onRemove(index, type){
    if(type == 'ba'){
      //var index = this.starter.buildingAccess.findIndex(x => x._id == id);
      //this.starter.buildingAccess.splice(index, 1);
      //this.updateStarter();
      this.BaDataSource.data.splice(index,1);
      this.BaDataSource.data = this.BaDataSource.data;
    }else if( type == 'sr'){
      //var index = this.starter.softwareRequest.findIndex(x => x._id == id);
      this.SrDataSource.data.splice(index, 1);
      this.SrDataSource.data = this.SrDataSource.data;
    }else if( type == 'hr'){
      //var index = this.starter.hardwareRequest.findIndex(x => x._id == id);
      //this.starter.hardwareRequest.splice(index, 1);
      //this.updateStarter();
      this.HrDataSource.data.splice(index,1);
      this.HrDataSource.data = this.HrDataSource.data;
    }

  }

  userAD(starter){
    this.commonService.addUserAd(starter).subscribe(response => {console.log(response)});
  }

  confirmDialog(index, type): void {
    if(type === 'ba'){
      const message = `Are you sure you want to delete this building access request?`;

      const dialogData = new ConfirmDialogModel("Confirm Action", message, null);
      const ConfirmdialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData,
      });

      ConfirmdialogRef.afterClosed().subscribe(dialogResult => {
        if(dialogResult !== false){
         this.onRemove(index, type)
        }
      });
    }else if(type === 'sr'){
      const message = `Are you sure you want to delete this software request?`;

      const dialogData = new ConfirmDialogModel("Confirm Action", message, null);
      const ConfirmdialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData,
      });

      ConfirmdialogRef.afterClosed().subscribe(dialogResult => {
        if(dialogResult !== false){
         this.onRemove(index, type)
        }
      });
    }else if(type === 'hr'){
      const message = `Are you sure you want to delete this hardware request?`;
      const dialogData = new ConfirmDialogModel("Confirm Action", message, null);

      const ConfirmdialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData,
      });

      ConfirmdialogRef.afterClosed().subscribe(dialogResult => {
        if(dialogResult !== false){
         this.onRemove(index, type)
        }
      });
    }
 
  }

  sendEmail(starter){
    console.log('email')
    this.emailService.sendEmailLmCreated(starter).subscribe(response => {console.log(response)})
  }
  

}
