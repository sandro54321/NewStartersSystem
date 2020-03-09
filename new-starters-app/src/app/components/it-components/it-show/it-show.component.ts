import { Component, OnInit } from '@angular/core';

import { CommonService } from '../../../services/common.service'
import { Starter } from '../../../models/Starter'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SoftwareRequest } from '../../../models/softwareRequest'; 
import { HardwareRequest } from '../../../models/hardwareRequest'; 


@Component({
  selector: 'app-it-show',
  templateUrl: './it-show.component.html',
  styleUrls: ['./it-show.component.css']
})
export class ItShowComponent implements OnInit {

  constructor(    
    public commonService:CommonService,
    public route:ActivatedRoute,
    public router:Router) { }
 
    ngOnInit(): void {
      this.getStarter();
    }

    starter: Starter;
    sw: SoftwareRequest;

    id = this.route.snapshot.params['id'];

    getStarter(){
      var id = this.route.snapshot.params['id'];

      this.commonService.getStarter(id).subscribe(employee=> {this.starter = employee})

    }

    onClick(id, state){

      var index = this.starter.softwareRequest.findIndex(x => x._id == id);

      this.starter.softwareRequest[index].state = state;

      this.updateStarter();
      
    }

    updateStarter(){
      this.commonService.updateStarter(this.id,this.starter).subscribe(() => this.getStarter())
    }

    userAD(starter){
      this.commonService.addUserAd(starter).subscribe(response => {console.log(response)});
    }

    goBack(){
      this.router.navigate(['/it'])
    }
}
