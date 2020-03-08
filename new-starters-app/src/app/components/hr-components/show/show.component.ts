import { Component, OnInit } from '@angular/core';

import { CommonService } from '../../../services/common.service'
import { Starter } from '../../../models/Starter'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(
    public commonService:CommonService,
    public route:ActivatedRoute,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.getStarter();
  }

  starter:Starter;
  
  getStarter(){
    var id = this.route.snapshot.params['id'];
    this.commonService.getStarter(id)
        .subscribe(employee=>{
          this.starter = employee;
        })
  }
  goBack(){
    this.router.navigate(['/hr-home'])
  }
}

