import { Component, OnInit, ViewChild} from '@angular/core';

import { CommonService } from '../../../services/common.service'
import { Starter } from '../../../models/Starter'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-prop-show',
  templateUrl: './prop-show.component.html',
  styleUrls: ['./prop-show.component.css']
})
export class PropShowComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  starter: Starter
  PropDataSource;
  PropColumns: string[] = ['building', 'floor', 'equipmentArea', 'officeArea', 'state', 'actions'];


  constructor(    
    public commonService:CommonService,
    public route:ActivatedRoute,
    public router:Router,
    public dialog: MatDialog
    ) { } 
 
    ngOnInit(): void {
      this.getStarter();
    }

    id: string;

    getStarter(){
      this.id = this.route.snapshot.params['id'];
      this.commonService.getStarter(this.id).subscribe(starters=> {
        this.starter = starters; 
        this.PropDataSource = new MatTableDataSource(starters.buildingAccess); 
      })

    }

    onClick(id, state){
        var index = this.starter.buildingAccess.findIndex(x => x._id == id);
        this.starter.buildingAccess[index].state = state;

        var x = 0;
       for (var i=0; i < this.starter.buildingAccess.length; i++) {
          if (this.starter.buildingAccess[i].state != 'Open') {
            x++;
            if (x == this.starter.buildingAccess.length){
              this.starter.baComplete = true;
              this.starter.propertyState = 'Complete'
              this.updateStarter(); 
              this.commonService.checkIfComplete(this.starter._id).subscribe(data => console.log(data))
            }
          }
        }

    }

    updateStarter(){
      this.commonService.updateStarter(this.id,this.starter).subscribe(() => this.getStarter())
    }

    goBack(){
      this.router.navigate(['/prop'])
    }

}
