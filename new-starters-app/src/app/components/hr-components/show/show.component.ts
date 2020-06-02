import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../../services/common.service'
import { Starter } from '../../../models/Starter'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { CommentsComponent } from '../../comments/comments.component';

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
    public router:Router,
    public dialog: MatDialog
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
    this.commonService.getStarter(id).subscribe(starters=> {this.SrDataSource = new MatTableDataSource(starters.softwareRequest); this.SrDataSource.sort = this.sort; this.starter = starters; this.HrDataSource = new MatTableDataSource(starters.hardwareRequest); this.HrDataSource.sort = this.sort;this.BaDataSource = new MatTableDataSource(starters.buildingAccess); this.BaDataSource.sort = this.sort;})
  }

  goBack(){
    this.router.navigate(['/hr-home'])
  }

  onNote(id){
    const dialogRef = this.dialog.open(CommentsComponent, {width: '900px', data: { id: id }});

    dialogRef.afterClosed().subscribe(data => {if(data == "reload"){console.log('reload')}});
  }
  
  
}

