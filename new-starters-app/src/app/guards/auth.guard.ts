import {Injectable, OnInit} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import { ActivatedRoute, RoutesRecognized }    from '@angular/router';
import {Observable} from 'rxjs';
import { each } from 'highcharts';

@Injectable()
export class AuthGuard implements CanActivate{

    private routeData;
    roles = []
    constructor(private authService: AuthService, private router:Router, private route: ActivatedRoute){
        
        router.events.subscribe(event => {
            if (event instanceof RoutesRecognized) {
              let route = event.state.root.firstChild;
              this.roles =  route.data.allowedRoles || '';
              console.log('Roles: ', this.roles);
            }
          });
        console.log('data: ', this.route.snapshot['allowedRoles']);

    }


    canActivate(){
        if(this.authService.loggedIn()) {
            return true; 
        }else {
            this.router.navigate(['/login']);
            return false;
        }

    }

}