import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service'
import { Starter } from '../../../models/Starter'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    public commonService:CommonService,
    public route:ActivatedRoute,
    public router:Router,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditComponent>
  ) { } 


  newStarterForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    jobTitle: [null, Validators.required],
    employeeType: [null, Validators.required],
    division: [null, Validators.required],
    department: [null, Validators.required],
    location: [null, Validators.required],
    floor: [null, Validators.required],
    company: [null, Validators.required],
    lineManager: [null, Validators.required],
    startDate: [null, Validators.required]
  });

  model: Starter
  id = this.route.snapshot.params['id'];
  divisions = ['CTS', 'HR', 'Finance'];
  employeeTypes = ['Employee', 'Bursary', 'Graduate', 'Temp'];
  locations = ['Minden', 'Forum', 'Five Oaks'];
  floors = ['Ground', '1st', '2nd', '3rd'];
  companies = ['JT Jersey', 'JT Guernsey', 'JT Denmark'];
  departments = [
    {
      title: 'Networking',
      relatedTo: 'CTS' 
    },
    {
      title: 'Security',
      relatedTo: 'CTS' 
    }, 
    {
      title: 'Accounting',
      relatedTo: 'Finance' 
    }
  ]

  ngOnInit(){
    this.getStarter();
  }

  getStarter(){
    this.commonService.getStarter(this.data.id).subscribe(starter=> 
      {this.model = starter,  
        this.newStarterForm.setValue(
          {firstName: this.model.name, 
            lastName: 'testing2', 
            email: this.model.email, 
            jobTitle: this.model.jobTitle ,
            employeeType: this.model.employeeType,
            division: this.model.division, 
            department: this.model.department,
            location: this.model.location, 
            floor:this.model.floor, 
            company: this.model.company, 
            lineManager:this.model.lineManager, 
            startDate: this.model.startDate
          })
      })
  }
  
  updateStarter(){
    console.log("hello");
    this.model.name = this.newStarterForm.get('firstName').value;
    this.model.email = this.newStarterForm.get('email').value;
    this.model.jobTitle = this.newStarterForm.get('jobTitle').value;
    this.model.employeeType = this.newStarterForm.get('employeeType').value;
    this.model.division = this.newStarterForm.get('division').value;
    this.model.department = this.newStarterForm.get('department').value;
    this.model.location = this.newStarterForm.get('location').value;
    this.model.floor = this.newStarterForm.get('floor').value;
    this.model.company = this.newStarterForm.get('company').value;
    this.model.lineManager = this.newStarterForm.get('lineManager').value;
    this.model.startDate = this.formatDate(this.newStarterForm.get('startDate').value);

    this.commonService.updateStarter(this.model._id,this.model).subscribe(() => this.close())
  }

  filterDepartmentsByDivision(division) {
    return this.departments.filter(item => item.relatedTo === division);
  }

  formatDate(date){
    var oldDate = new Date(date);
    var dd = String(oldDate.getDate()).padStart(2, '0');
    var mm = String(oldDate.getMonth() + 1).padStart(2, '0');
    var yyyy = oldDate.getFullYear();

    var newDate = dd + '/' + mm + '/' + yyyy;

    return newDate;
  }

  close() {
    console.log("Closing");
    this.dialogRef.close('reload');
  }

}
