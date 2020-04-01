import { Component, OnInit,  } from '@angular/core';
import { CommonService } from '../../../services/common.service'
import { EmailService } from '../../../services/email.service'
import { Starter } from '../../../models/Starter'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {Observable} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    public emailService:EmailService,
    public commonService:CommonService,
    public route:ActivatedRoute,
    public router:Router,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddComponent>
  ) { }

  lmControl = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[];
  model = new Starter();

  newStarterForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.email],
    jobTitle: [null, Validators.required],
    employeeType: [null, Validators.required],
    division: [null, Validators.required],
    department: [null, Validators.required],
    location: [null, Validators.required],
    floor: [null, Validators.required],
    company: [null, Validators.required],
    lineManager: [null, Validators.required],
    startDate: [null, Validators.required],
  });
  
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
      this.commonService.getLineManagers().subscribe(lineManagers => 
        {this.options = lineManagers, 
        this.filteredOptions = this.lmControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      });

  }

  addStarter(){
    this.model.firstName = this.newStarterForm.get('firstName').value;
    this.model.lastName = this.newStarterForm.get('lastName').value;
    this.model.email = this.newStarterForm.get('email').value;
    this.model.jobTitle = this.newStarterForm.get('jobTitle').value;
    this.model.employeeType = this.newStarterForm.get('employeeType').value;
    this.model.division = this.newStarterForm.get('division').value;
    this.model.department = this.newStarterForm.get('department').value;
    this.model.location = this.newStarterForm.get('location').value;
    this.model.floor = this.newStarterForm.get('floor').value;
    this.model.company = this.newStarterForm.get('company').value;
    this.model.lineManager = this.newStarterForm.get('lineManager').value;
    this.model.startDate = this.newStarterForm.get('startDate').value
    this.model.state = "Open";

    console.table(this.model);

    this.commonService.addStarter(this.model).subscribe(()=> console.log())
    this.sendEmail(this.model);

  }

  filterDepartmentsByDivision(division) {
    return this.departments.filter(item => item.relatedTo === division);
  }

  close() {
    console.log("Closing");
    this.dialogRef.close('reload');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  sendEmail(starter){
    this.emailService.sendLmEmailCreated(starter).subscribe(response => {console.log(response)})
  }

} 
