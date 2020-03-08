import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    console.log("You are now logged out");
    this.router.navigate(['/login']);
    return false;
  }

}
