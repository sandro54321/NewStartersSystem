import { Injectable } from '@angular/core';
import { CommonService } from './common.service'
import { Starter } from '../models/Starter'; 
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  starters:Starter[];
  startersLength;
  departments: Array<{name:String, data:number[]}> = [];

  constructor(public commonService:CommonService) { }

  StatusByDepartment(): Observable<any[]> {
    return this.commonService.getStarters()
    .pipe(
      map(starters=> { console.log(starters);
      for (var i=0; i < starters.length; i++) {
        let Open = 0; let Complete = 0; let Closed = 0; let dep = null; let Index = null;
        if (starters[i].state === 'Open') {
          dep = starters[i].department
          Index = this.departments.findIndex(x => x.name == dep);
          if(Index != -1){
            Open = this.departments[Index].data[0] + 1;
            Complete = this.departments[Index].data[1];
            Closed = this.departments[Index].data[2];
            this.departments[Index].data = [Open,Complete,Closed]
          } else if (Index === -1){
            Open = 1;
            this.departments.push({name:starters[i].department, data: [Open,Complete,Closed]});
          }
        } else if(starters[i].state === 'Complete'){
          dep = starters[i].department
          Index = this.departments.findIndex(x => x.name == dep);
          if(Index != -1){
            Open = this.departments[Index].data[0];
            Complete = this.departments[Index].data[1] + 1;
            Closed = this.departments[Index].data[2];
            this.departments[Index].data = [Open,Complete,Closed]
          } else if (Index === -1){
            Complete = 1;
            this.departments.push({name:starters[i].department, data: [Open,Complete,Closed]});
          }
        } else if(starters[i].state === 'Closed'){
          dep = starters[i].department
          Index = this.departments.findIndex(x => x.name == dep);
          if(Index != -1){
            Open = this.departments[Index].data[0];
            Complete = this.departments[Index].data[1];
            Closed = this.departments[Index].data[2] + 1;
            this.departments[Index].data = [Open,Complete,Closed]
          } else if (Index === -1){
            Complete = 1;
            this.departments.push({name:starters[i].department, data: [Open,Complete,Closed]});
          }
        }

      }
      console.log(this.departments);
      return this.departments; 
    })) ;

    
  };

  

}
