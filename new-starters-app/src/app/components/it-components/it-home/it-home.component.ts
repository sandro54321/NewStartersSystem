import { Component, OnInit } from '@angular/core';

import { CommonService } from '../../../services/common.service'
import { AuthService } from '../../../services/auth.service'
import { Starter } from '../../../models/Starter'; 

@Component({
  selector: 'app-it-home',
  templateUrl: './it-home.component.html',
  styleUrls: ['./it-home.component.css']
})
export class ItHomeComponent implements OnInit {

  email:String;
  name:String;
  starters:Starter[];

  constructor(public commonService:CommonService, public authService:AuthService) { }

  ngOnInit(): void {
    this.getItItems();
  }


  getItItems(){ 
    this.commonService.getItItems().subscribe(starters=>{
      this.starters = starters;
    })
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
