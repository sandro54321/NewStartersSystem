import { Component, OnInit, ViewChild } from '@angular/core';

import { CommonService } from '../../../services/common.service'
import { Starter } from '../../../models/Starter'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SoftwareRequest } from '../../../models/softwareRequest'; 
import { HardwareRequest } from '../../../models/hardwareRequest'; 


import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-it-show',
  templateUrl: './it-show.component.html',
  styleUrls: ['./it-show.component.css']
})
export class ItShowComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  starter: Starter
  ItState: String
  softwareComplete: Boolean
  hardwareComplete: Boolean
  SrDataSource;
  HrDataSource;
  SrColumns: string[] = ['supplier', 'description', 'accountType', 'state', 'actions'];
  HrColumns: string[] = ['manufacturer', 'model', 'deviceType', 'state', 'actions'];

  constructor(    
    public commonService:CommonService,
    public route:ActivatedRoute,
    public router:Router,
    public dialog: MatDialog
    ) { } 
 
    ngOnInit(): void {
      this.getStarter();
    }

    sw: SoftwareRequest;

    id: string;

    getStarter(){
      this.id = this.route.snapshot.params['id'];
      this.commonService.getStarter(this.id).subscribe(starters=> {
        this.starter = starters; 
        this.SrDataSource = new MatTableDataSource(starters.softwareRequest); 
        //console.log(this.SrDataSource);
        this.SrDataSource.sort = this.sort; 
        this.HrDataSource = new MatTableDataSource(starters.hardwareRequest); 
        this.HrDataSource.sort = this.sort;
      })

    }

    onClick(id, state, type){

      if(type == 'sr'){
        var index = this.starter.softwareRequest.findIndex(x => x._id == id);
        this.starter.softwareRequest[index].state = state;    
        this.updateStarter();
       }else if(type =='hr'){
        var index = this.starter.hardwareRequest.findIndex(x => x._id == id);
        this.starter.hardwareRequest[index].state = state;
        this.updateStarter();
       }

       var x = 0;
       for (var i=0; i < this.starter.softwareRequest.length; i++) {
          if (this.starter.softwareRequest[i].state != 'Open') {
            x++;
            if (x == this.starter.softwareRequest.length){
              this.starter.srComplete = true;
              this.updateStarter();
              this.commonService.checkIfComplete(this.starter._id).subscribe(data => console.log(data))
            }
          }
        }

        var y = 0;
        for (var i=0; i < this.starter.hardwareRequest.length; i++) {
          if (this.starter.hardwareRequest[i].state != 'Open') {
            y++;
            if (y == this.starter.hardwareRequest.length){
              this.starter.hrComplete = true;
              this.updateStarter();
              this.commonService.checkIfComplete(this.starter._id);
            }
          }
        }

        if(this.starter.hrComplete == true && this.starter.srComplete == true){
          this.starter.ItState = 'Complete'
          this.updateStarter();
        }
        


    }

    updateStarter(){
      this.commonService.updateStarter(this.id,this.starter).subscribe(() => this.getStarter())
    }

    userAD(starter){
      this.commonService.addUserAd(starter).subscribe(response => {console.log(response)});
    }

    testEmail(){
      //this.commonService.sendEmail('test').subscribe(response => {console.log(response)})
    }

    goBack(){
      this.router.navigate(['/it'])
    } 
}
