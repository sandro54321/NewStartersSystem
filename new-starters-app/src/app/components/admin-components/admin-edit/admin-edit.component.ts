
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service'
import { User } from '../../../models/User'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {

  constructor(
    public commonService:CommonService,
    public route:ActivatedRoute,
    public router:Router,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AdminEditComponent>
  ) { } 


  newStarterForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    role: [null, Validators.required],
  });

  model: User
  id = this.route.snapshot.params['id'];

  ngOnInit(){
    this.getStarter();
  }

  getStarter(){
    this.commonService.getUser(this.data.id).subscribe(user=> 
      {this.model = user,  
        this.newStarterForm.setValue(
          {name: this.model.name, 
            email: this.model.email, 
            role: this.model.role ,
          })
      })
  }
  
  updateStarter(){
    this.model.name = this.newStarterForm.get('name').value;
    this.model.email = this.newStarterForm.get('email').value;
    this.model.role = this.newStarterForm.get('role').value;


    this.commonService.updateUser(this.model._id,this.model).subscribe(() => this.close())
  }


  close() {
    console.log("Closing");
    this.dialogRef.close('reload');
  }

}
