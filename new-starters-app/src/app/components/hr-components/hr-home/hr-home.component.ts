import { Component, OnInit } from '@angular/core';

import { CommonService } from '../../../services/common.service'
import { Starter } from '../../../models/Starter'; 


@Component({
  selector: 'app-hr-home',
  templateUrl: './hr-home.component.html',
  styleUrls: ['./hr-home.component.css']
})
export class HrHomeComponent implements OnInit {

  constructor(public commonService:CommonService) { }

  ngOnInit(): void {
    this.getStarters();
  }

  starters:Starter[];
  name: String;
  state: String

  getStarters(){
    this.commonService.getStarters().subscribe(starters=> {this.starters = starters;})
  }

  deleteStarter(id){
    this.commonService.deleteStarter(id)
      .subscribe(()=>{
        this.getStarters();
      });
  }

  Search(){
    if(this.name != ""){
      this.starters = this.starters.filter(res=>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
      })
    }else if (this.name == ""){
      this.ngOnInit();
    }
  }

}
