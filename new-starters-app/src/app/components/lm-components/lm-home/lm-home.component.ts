import { Component, OnInit } from '@angular/core';


import { CommonService } from '../../../services/common.service'
import { AuthService } from '../../../services/auth.service'
import { Starter } from '../../../models/Starter'; 


@Component({
  selector: 'app-lm-home',
  templateUrl: './lm-home.component.html',
  styleUrls: ['./lm-home.component.css']
})
export class LmHomeComponent implements OnInit {

  email:String;
  name:String;
  starters:Starter[];

  constructor(public commonService:CommonService, public authService:AuthService) { }

  ngOnInit(): void {
    let lmEmail = this.authService.getUserData(); 
    this.email = lmEmail;
    this.getLmItems();
  }

  getLmItems(){ 
    this.commonService.getLmItems(this.email).subscribe(starters=>{
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
