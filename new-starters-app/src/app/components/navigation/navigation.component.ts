import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private authService: AuthService, private router: Router) {}

  email:String;
  name:String;

  ngOnInit(): void {
    this.email = this.authService.getUserData().email; 
    this.name = this.authService.getUserData().name;
  }

  onLogoutClick(){
    this.authService.logout();
    console.log("You are now logged out");
    this.router.navigate(['/login']);
    return false;
  }

}
