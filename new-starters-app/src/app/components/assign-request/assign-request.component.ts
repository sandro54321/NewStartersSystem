import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service'
import { FormBuilder, Validators } from '@angular/forms';
import { Starter } from '../../models/Starter'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-assign-request',
  templateUrl: './assign-request.component.html',
  styleUrls: ['./assign-request.component.css']
})
export class AssignRequestComponent implements OnInit {

  constructor(public commonService:CommonService, private fb: FormBuilder, public route:ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AssignRequestComponent>) { }
  
  starter: Starter;
  assignControl = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[];
  
  assignForm = this.fb.group({
    assignTo: [null, Validators.required]
  });

  ngOnInit(): void {
    this.getStarter();

      if (this.data.type == 'prop'){
        this.commonService.getPropUsers().subscribe(propUsers => 
          {this.options = propUsers, 
          this.filteredOptions = this.assignControl.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filter(value))
            );
        });
      }else if ( this.data.type == 'it'){
        this.commonService.getItUsers().subscribe(itUsers => 
          {this.options = itUsers, 
          this.filteredOptions = this.assignControl.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filter(value))
            );
        });
      }
  }

  getStarter(){
    this.commonService.getStarter(this.data.id).subscribe(starter=> {
      this.starter = starter; 
    })

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  assignTo(){
    if (this.data.type == 'prop'){
      this.starter.propAssignedTo = this.assignForm.get('assignTo').value
      this.commonService.updateStarter(this.data.id, this.starter).subscribe(() => this.close())
    }else if(this.data.type == 'it'){
      this.starter.itAssignedTo = this.assignForm.get('assignTo').value
      this.commonService.updateStarter(this.data.id, this.starter).subscribe(() => this.close())
    }
    
    //this.commonService.updateStarter(this.data.id, this.comment).subscribe(()=> this.getComments())
  }

  close() {
    this.dialogRef.close('reload');
  }
  

}
