import { Injectable } from '@angular/core';
import {Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { headersToString } from 'selenium-webdriver/http';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUsers(user): Observable<any> {
    let httpOptions = { headers: new Headers({ 'Content-Type': 'application/json' }) };
    return this.http.post('http://localhost:3000/users/register', user);
  }

  authenticateUser(user): Observable<any>{
/*  let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type','application/json'); */
    let httpOptions = { headers: new Headers({ 'Content-Type': 'application/json' }) };
    console.log(user);
    return this.http.post('http://localhost:3000/users/authenticate', user).pipe(map(res => res));
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    console.log("loadtoken(): " + token);
    this.authToken = token;

    return token;
  }

  getUserData(){
    let user = JSON.parse(localStorage.getItem('user'));

    return user;
  }

  loggedIn(){
    //console.log("token expired" + tokenNotExpired());
    return tokenNotExpired('id_token');
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  
}
