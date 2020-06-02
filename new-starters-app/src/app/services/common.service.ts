import { Injectable } from '@angular/core';
import {Headers} from '@angular/http';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { headersToString } from 'selenium-webdriver/http';
import {tokenNotExpired} from 'angular2-jwt';
import {AuthService} from '../services/auth.service';

import {Starter} from '../models/starter';
import {User} from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'aaplication/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  constructor(private http: HttpClient, private authService: AuthService) { }


  getStarters(): Observable<Starter[]>{
    return this.http.get<Starter[]>("http://localhost:3000/starters/all").pipe(
        map(res => res));
  }

  getUsers(): Observable<User[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.loadToken()
      })
    };

    return this.http.get<User[]>("http://localhost:3000/users/all", httpOptions).pipe(
      map(res => res));
  }
  
  getLineManagers(): Observable<string[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.loadToken()
      })
    };

    return this.http.get<string[]>("http://localhost:3000/users/lmall", httpOptions).pipe(
        map(res => res));
  }

  getLmItems(lmEmail): Observable<Starter[]>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.loadToken()
      })
    };

    return this.http.get<Starter[]>("http://localhost:3000/starters/lm/"+lmEmail, httpOptions).pipe(
        map(res => res));
  }

  getItItems(): Observable<Starter[]>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.loadToken()
      })
    };

    return this.http.get<Starter[]>("http://localhost:3000/starters/it/", httpOptions).pipe(
        map(res => res));
  }

  getPropertyItems(): Observable<Starter[]>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authService.loadToken()
      })
    };

    return this.http.get<Starter[]>("http://localhost:3000/starters/property/", httpOptions).pipe(
        map(res => res));
  }

  getStarter(id): Observable<Starter>{
    return this.http.get<Starter>("http://localhost:3000/starters/get/"+id).
      pipe(map(res => res));
  }

  getUser(id): Observable<User>{
    return this.http.get<User>("http://localhost:3000/users/get/"+id).
      pipe(map(res => res));
  }

  deleteStarter(id){
    return this.http.delete("http://localhost:3000/starters/delete/"+id).pipe(
        map(res => res));
  }

  deleteUser(id){
    return this.http.delete("http://localhost:3000/users/delete/"+id).pipe(
        map(res => res));
  }

  addStarter(info){
    return this.http.post("http://localhost:3000/starters/add",info).
       pipe(map(res => res));
  }

  addUser(info){
    return this.http.post("http://localhost:3000/users/add",info).
       pipe(map(res => res));
  }

  updateStarter(id, info){
    return this.http.put("http://localhost:3000/starters/update/"+id,info).
    pipe(map(res => res));
  }

  updateUser(id, info){
    return this.http.put("http://localhost:3000/users/update/"+id,info).
    pipe(map(res => res));
  }

  addUserAd(starter){
        
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      })
    };

    var postURL ="https://prod-31.westeurope.logic.azure.com:443/workflows/7ca54e18f2c14dda9b4c5a5bb9ed6c03/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VF82I1Mt-WzWaJqWqH-ph0ZosA1pO4CuopKLwimC5RU"

    const req = new HttpRequest('POST', postURL, starter,httpOptions);

    return this.http.request(req);
  }

  sendEmail(starter, type){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      })
    };

    var postURL = "https://prod-43.westeurope.logic.azure.com:443/workflows/0e1cb28ee58c4e169569686a73346797/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HQ-H0CJXfHahxDxHWXK-LFpsxZseaJCBAKXyQ9LUWU8";

    const data = {
      type:type,
      stater: starter
    }

    console.log(JSON.stringify(data));
    
    const req = new HttpRequest('POST', postURL, data ,httpOptions);

    return this.http.request(req);

  }

  checkIfComplete(_id): Observable<any> {
    console.log("check com", _id)
    const data = {
      _id: _id,
    }
    return this.http.post("http://localhost:3000/starters/state", data).pipe(map(res => res))

  }

  addComment(id,comment){
    return this.http.put("http://localhost:3000/starters/comment/" + id, comment).
       pipe(map(res => res));
  }

  formatDate(date){
    var oldDate = date;
    var dd = String(oldDate.getDate()).padStart(2, '0');
    var mm = String(oldDate.getMonth() + 1).padStart(2, '0');
    var yyyy = oldDate.getFullYear();

    var newDate = dd + '/' + mm + '/' + yyyy;

    return newDate;
  }

      
}
