import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service'
import { User } from '../../../models/User'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {

  constructor(
    public commonService:CommonService,
    public route:ActivatedRoute,
    public router:Router,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AdminCreateComponent>
  ) { } 

  model = new User()

  newStarterForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    role: [null, Validators.required],
  });

  ngOnInit(){

  }

  addUser(){
    this.model.name = this.newStarterForm.get('name').value;
    this.model.email = this.newStarterForm.get('email').value;
    this.model.role = this.newStarterForm.get('role').value;

    console.table(this.model);
    this.commonService.addUser(this.model).subscribe(()=> this.close())

  }


  close() {
    console.log("Closing");
    this.dialogRef.close('reload');
  }

}
