import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AuthService } from './services/auth.service';
import { CommonService } from './services/common.service';
import { ShowComponent } from './components/hr-components/show/show.component';
import { AddComponent } from './components/hr-components/add/add.component';
import { EditComponent } from './components/hr-components/edit/edit.component';
import { HrHomeComponent } from './components/hr-components/hr-home/hr-home.component';
import { LmHomeComponent } from './components/lm-components/lm-home/lm-home.component';

import { AuthGuard } from './guards/auth.guard';
import { LmAddComponent } from './components/lm-components//lm-add/lm-add.component';
import { LmShowComponent } from './components/lm-components//lm-show/lm-show.component';
import { ItShowComponent } from './components/it-components/it-show/it-show.component';
import { ItHomeComponent } from './components/it-components/it-home/it-home.component';


const appRoutes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'hr-home', component: HrHomeComponent},
  {path: 'add', component: AddComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'show/:id', component: ShowComponent},
  {path: 'lm', component: LmHomeComponent, canActivate: [AuthGuard]},
  {path: 'lm-add/:form/:id', component: LmAddComponent},
  {path: 'lm-show/:id', component: LmShowComponent},
  {path: 'it', component: ItHomeComponent, canActivate: [AuthGuard]},
  {path: 'it-show/:id', component: ItShowComponent, canActivate: [AuthGuard]}

] 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ShowComponent,
    AddComponent,
    EditComponent,
    HrHomeComponent,
    LmHomeComponent,
    LmAddComponent,
    LmShowComponent,
    ItShowComponent,
    ItHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, CommonService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
