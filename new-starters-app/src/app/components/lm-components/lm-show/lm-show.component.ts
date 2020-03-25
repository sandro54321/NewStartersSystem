import { Component, OnInit, ViewChild } from '@angular/core';

import { CommonService } from '../../../services/common.service'
import { Starter } from '../../../models/Starter'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { LmAddComponent } from '../lm-add/lm-add.component';

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
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getStarter();
  }

  getStarter(){
    var id = this.route.snapshot.params['id'];
    this.commonService.getStarter(id).subscribe(starters=> {
      this.starter = starters; 
      this.SrDataSource = new MatTableDataSource(starters.softwareRequest); 
      console.log(this.SrDataSource);
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

    dialogRef.afterClosed().subscribe(data => {if(data == "reload"){this.getStarter()}});
  }

  updateStarter(){
    this.commonService.updateStarter(this.starter._id,this.starter).subscribe(() => this.getStarter())
  }
  
  onRemove(id, type){
    if(type == 'ba'){
      var index = this.starter.buildingAccess.findIndex(x => x._id == id);
      this.starter.buildingAccess.splice(index, 1);
      this.updateStarter();
    }else if( type == 'sr'){
      var index = this.starter.softwareRequest.findIndex(x => x._id == id);
      this.starter.softwareRequest.splice(index, 1);
      this.updateStarter();
    }else if( type == 'hr'){
      var index = this.starter.hardwareRequest.findIndex(x => x._id == id);
      this.starter.hardwareRequest.splice(index, 1);
      this.updateStarter();
    }

  }

}
