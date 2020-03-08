import { Component, OnInit } from '@angular/core';

import { CommonService } from '../../../services/common.service'
import { Starter } from '../../../models/Starter'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    public commonService:CommonService,
    public route:ActivatedRoute,
    public router:Router
  ) { } 

  ngOnInit(){
    this.getStarter();

  }

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


  getStarter(){
    this.commonService.getStarter(this.id).subscribe(starter=> this.model = starter)
  }
  
  updateStarter(){
    this.commonService.updateStarter(this.id,this.model).subscribe(() => this.goBack())
  }

  goBack(){
    this.router.navigate(['/hr-home'])
  }

  filterDepartmentsByDivision(division) {
    return this.departments.filter(item => item.relatedTo === division);
  }


}
