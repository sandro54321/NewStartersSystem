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
  numRequestsPerDep: Array<{name:String, y:number}> = [];
  numRequestsPerMonth: [];

  constructor(public commonService:CommonService) { }

  StatusByDepartment(): Observable<any[]> {
    return this.commonService.getStarters()
    .pipe(
      map(starters=> {
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
      return this.departments; 
    })) ;
  };

  NumberOfRequestsByDepartment(): Observable<any[]>{
    return this.commonService.getStarters()
    .pipe(
      map(starters=> {console.log(starters);
      for (var i=0; i < starters.length; i++) {
        let dep = null; let Ind = null; 
        dep = starters[i].department
        Ind = this.numRequestsPerDep.findIndex(x => x.name == dep);
        if(Ind != -1){
          this.numRequestsPerDep[Ind].y = this.numRequestsPerDep[Ind].y +1;
        }else if (Ind === -1){
          this.numRequestsPerDep.push({name: dep, y: 1});
        }
      }
      console.log('test', this.numRequestsPerDep);
      return this.numRequestsPerDep; 
    })) ;
  };  

  NumberOfRequestsPerMonth(): Observable<any[]>{
    return this.commonService.getStarters().pipe(map(starters=> {
      let jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jun = 0, jul = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0;
      for (var i=0; i < starters.length; i++) {
        //let jan = null, feb = null, mar = null, apr = null, may = null, jun = null, jul = null, aug = null, sep = null, oct = null, nov = null, dec = null;
        let month = new Date(starters[i].dateCreated).getMonth();
        if (month === 0){
          jan++;
        } else if(month === 1){
          feb++;
        } else if(month === 2){
          mar++;
        } else if(month === 3){
          apr++;
        } else if(month === 4){
          may++;
        } else if(month === 5){
          jun++;
        } else if(month === 6){
          jul++;
        } else if(month === 7){
          aug++;
        } else if(month === 8){
          sep++;
        } else if(month === 9){
          oct++;
        } else if(month === 10){
          nov++;
        } else if(month === 11){
          dec++;
        }
      }
      return [jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec]; 
    }));
  }

}
