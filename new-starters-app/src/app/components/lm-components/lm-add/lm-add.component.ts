import { Component, OnInit, Inject } from '@angular/core';

import { CommonService } from '../../../services/common.service';
import { EmailService } from '../../../services/email.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Starter } from '../../../models/Starter'; 
import { BuildingAccess } from '../../../models/buildingAccess'; 
import { SoftwareRequest } from '../../../models/softwareRequest'; 
import { HardwareRequest } from '../../../models/hardwareRequest'; 

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lm-add',
  templateUrl: './lm-add.component.html',
  styleUrls: ['./lm-add.component.css']
})
export class LmAddComponent implements OnInit {

  newBaForm = this.fb.group({
    country: [null, Validators.required],
    building: [null, Validators.required],
    floor: [null, Validators.required],
    room: [null, Validators.required],
    equipmentArea: [null, Validators.required],
    officeArea: [null, Validators.required]
  });

  newSrForm = this.fb.group({
    supplier: [null, Validators.required],
    description: [null, Validators.required],
    accountType: [null, Validators.required],
  });

  newHrForm = this.fb.group({
    manufacturer: [null, Validators.required],
    model: [null, Validators.required],
    deviceType: [null, Validators.required],
  });

  constructor(
    public commonService:CommonService,
    public route:ActivatedRoute,
    public router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LmAddComponent>,
    private fb: FormBuilder,
    public emailService:EmailService
  ) { }

  ngOnInit(): void {
    this.getStarter();
  }
  
  model: Starter;

  BaColumns: string[] = ['building', 'floor', 'room' ,'equipmentArea', 'officeArea', 'state', 'actions'];
  countries = ['Jersey', 'Guernsey', 'UK', 'USA', 'Denmark', 'Australia'];
  buildings = ['Minden', 'Forum', 'Five Oaks', 'Brealades'];
  floors = ['Ground', 'First', 'Second', 'Third'];
  rooms = ['206', '207', '208'];

  SrColumns: string[] = ['supplier', 'description', 'accountType', 'state', 'actions'];
  suppliers = ['Microsoft', 'Apple'];
  descriptions = ['Azure', 'Icloud'];
  accountTypes = ['Standard', 'Admin'];

  HrColumns: string[] = ['manufacturer', 'model', 'deviceType', 'state', 'actions'];
  manufacturers = ['Dell', 'Apple'];
  models = ['XPS 13', 'Macbook Air'];
  deviceTypes = ['Laptop', 'Desktop'];

  sr = new SoftwareRequest();
  hr = new HardwareRequest();
  tp = this.data.fType;
  BaDataSource = new MatTableDataSource();
  SrDataSource = new MatTableDataSource();
  HrDataSource = new MatTableDataSource();

  getStarter(){
    this.commonService.getStarter(this.data.id).subscribe(starter=> {this.model = starter})
  }
  
  addArray(name){
    //this.baRequests.push({country: this.ba.country, building: this.ba.building, floor: this.ba.floor, room: this.ba.floor, officeArea: false, equiptmentArea: true})
    if(name === 'ba'){
    var id = this.makeid(24);
    //this.model.buildingAccess.push({_id: id, country: this.newBaForm.get('country').value, building: this.newBaForm.get('building').value, floor: this.newBaForm.get('floor').value, room: this.newBaForm.get('room').value, officeArea: this.newBaForm.get('officeArea').value, equiptmentArea: this.newBaForm.get('equipmentArea').value, state: 'Open'});
    this.BaDataSource.data.push({_id: id, country: this.newBaForm.get('country').value, building: this.newBaForm.get('building').value, floor: this.newBaForm.get('floor').value, room: this.newBaForm.get('room').value, officeArea: this.newBaForm.get('officeArea').value, equiptmentArea: this.newBaForm.get('equipmentArea').value, state: 'Open'});
    this.BaDataSource.data = this.BaDataSource.data;
    this.newBaForm.reset();
    //console.table(this.model.buildingAccess);
    }else if(name === 'sr'){
      var id = this.makeid(24);
      //this.model.softwareRequest.push({_id: id, supplier: this.newSrForm.get('supplier').value, description: this.newSrForm.get('description').value, accountType: this.newSrForm.get('accountType').value, state: 'Open'});
      this.SrDataSource.data.push({_id: id, supplier: this.newSrForm.get('supplier').value, description: this.newSrForm.get('description').value, accountType: this.newSrForm.get('accountType').value, state: 'Open'});
      this.SrDataSource.data = this.SrDataSource.data;
      this.newSrForm.reset();
      //console.table(this.model.softwareRequest);
    }else if(name === 'hr'){
      var id = this.makeid(24);
      //this.model.hardwareRequest.push({_id: id, manufacturer: this.newHrForm.get('manufacturer').value, model: this.newHrForm.get('model').value, deviceType: this.newHrForm.get('deviceType').value, state: 'Open'});
      this.HrDataSource.data.push({_id: id, manufacturer: this.newHrForm.get('manufacturer').value, model: this.newHrForm.get('model').value, deviceType: this.newHrForm.get('deviceType').value, state: 'Open'});
      this.HrDataSource.data = this.HrDataSource.data;
      this.newHrForm.reset();
      //console.table(this.model.hardwareRequest);
    }
  }
    
  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  updateStarter(){
    //this.commonService.updateStarter(this.data.id,this.model).subscribe(() => this.close())
    this.dialogRef.close({sr: this.SrDataSource.data, hr: this.HrDataSource.data, ba: this.BaDataSource.data});
  }
  
  goBack(){
    this.router.navigate(['/lm'])
  }

  onRemove(index, type){
    if(type == 'ba'){
      //var index = this.model.buildingAccess.findIndex(x => x._id == id);
      //this.model.buildingAccess.splice(index, 1);
      this.BaDataSource.data.splice(index, 1);
      this.BaDataSource.data = this.BaDataSource.data 
    }else if( type == 'sr'){
      //var index = this.model.softwareRequest.findIndex(x => x._id == id);
      //this.model.softwareRequest.splice(index, 1);
      this.SrDataSource.data.splice(index, 1);
      this.SrDataSource.data = this.SrDataSource.data
    }else if( type == 'hr'){
      //var index = this.model.hardwareRequest.findIndex(x => x._id == id);
      //this.model.hardwareRequest.splice(index, 1);
      this.HrDataSource.data.splice(index, 1);
      this.HrDataSource.data = this.HrDataSource.data 
    }

  }

close() {
  console.log("Closing");
  this.SrDataSource.data = []
  this.dialogRef.close('reload');
}



}
