import { Component, OnInit } from '@angular/core';

import { CommonService } from '../../../services/common.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Starter } from '../../../models/Starter'; 
import { BuildingAccess } from '../../../models/buildingAccess'; 
import { SoftwareRequest } from '../../../models/softwareRequest'; 
import { HardwareRequest } from '../../../models/hardwareRequest'; 

@Component({
  selector: 'app-lm-add',
  templateUrl: './lm-add.component.html',
  styleUrls: ['./lm-add.component.css']
})
export class LmAddComponent implements OnInit {

  //baRequests: Array<{country:String, building: String, floor: String, room: String, officeArea: Boolean, equiptmentArea: Boolean}> = [];
  //softwareRequest: Array<{manufacturer:String, model: String, deviceType:String}> = [];

  constructor(
    public commonService:CommonService,
    public route:ActivatedRoute,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.getStarter();
  }
  
  model: Starter;

  ba = new BuildingAccess();
  sr = new SoftwareRequest();
  hr = new HardwareRequest();
 
  id = this.route.snapshot.params['id'];

  getStarter(){
    this.commonService.getStarter(this.id).subscribe(starter=> this.model = starter)
  }
  
  addArray(name){
    //this.baRequests.push({country: this.ba.country, building: this.ba.building, floor: this.ba.floor, room: this.ba.floor, officeArea: false, equiptmentArea: true})
    if(name === 'ba'){
    this.model.buildingAccess.push({country: this.ba.country, building: this.ba.building, floor: this.ba.floor, room: this.ba.room, officeArea: this.ba.officeArea, equiptmentArea: this.ba.equiptmentArea, state: 'Open'})
    console.table(this.model.buildingAccess);
    }else if(name === 'sr'){
      this.model.softwareRequest.push({supplier: this.sr.supplier, description: this.sr.description, accountType: this.sr.accountType, state: 'Open'});
      console.table(this.model.softwareRequest);
    }else if(name === 'hr'){
      this.model.hardwareRequest.push({manufacturer: this.hr.manufacturer, model: this.hr.model, deviceType: this.hr.deviceType, state: 'Open'});
      console.table(this.model.hardwareRequest);
    }
  }
  

  updateStarter(){
    this.commonService.updateStarter(this.id,this.model).subscribe(() => this.goBack())
  }
  
  goBack(){
    this.router.navigate(['/lm'])
  }


}
