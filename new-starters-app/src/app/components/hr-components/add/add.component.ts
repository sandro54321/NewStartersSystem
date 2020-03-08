import { Component, OnInit } from '@angular/core';

import { CommonService } from '../../../services/common.service'
import { Starter } from '../../../models/Starter'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    public commonService:CommonService,
    public route:ActivatedRoute,
    public router:Router
  ) { }

  ngOnInit(){
  }

  model = new Starter();

  divisions = ['CTS', 'HR', 'Finance'];
  employeeTypes = ['Employee', 'Bursary', 'Graduate', 'Temp'];
  locations = ['Minden', 'Forum', 'Five Oaks'];
  floors = ['Ground', '1st', '2nd', '3rd'];
  companies = ['JT Jersey', 'JT Guernsey', 'JT Denmark'];
  //departments = ['Networking', 'Accounting']
  
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

  addStarter(){
    this.model.startDate = this.formatDate(this.model.startDate);
    this.model.state = "Open";

    console.table(this.model);

    this.commonService.addStarter(this.model).subscribe(()=> this.goBack())}

   goBack(){
    this.router.navigate(['/hr-home'])
  }

  formatDate(date){
    var oldDate = new Date(date);
    var dd = String(oldDate.getDate()).padStart(2, '0');
    var mm = String(oldDate.getMonth() + 1).padStart(2, '0');
    var yyyy = oldDate.getFullYear();

    var newDate = dd + '/' + mm + '/' + yyyy;

    return newDate;
  }

  filterDepartmentsByDivision(division) {
    return this.departments.filter(item => item.relatedTo === division);
  }

}
