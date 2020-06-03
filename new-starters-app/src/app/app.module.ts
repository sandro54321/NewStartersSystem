import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { TestingComponent } from './components/testing/testing.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormtestComponent } from './components/formtest/formtest.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { PropHomeComponent } from './components/prop-components/prop-home/prop-home.component';
import { PropShowComponent } from './components/prop-components/prop-show/prop-show.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HrStatsComponent } from './components/hr-components/hr-stats/hr-stats/hr-stats.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { StatisticsService } from './services/statistics.service';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { StackedBarComponent } from './components/charts/stacked-bar/stacked-bar.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AdminPanelComponent } from './components/admin-components/admin-panel/admin-panel.component';
import { AdminEditComponent } from './components/admin-components/admin-edit/admin-edit.component';
import { AdminCreateComponent } from './components/admin-components/admin-create/admin-create.component';
import { DeniedComponent } from './components/denied/denied.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AssignRequestComponent } from './components/assign-request/assign-request.component'


const appRoutes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'admin', component: AdminPanelComponent, data: {allowedRoles: ['admin']}, canActivate: [AuthGuard]},
  {path: 'hr-home', component: HrHomeComponent, data: {allowedRoles: ['admin', 'hr']}, canActivate: [AuthGuard]},
  {path: 'add', component: AddComponent, data: {allowedRoles: ['admin', 'hr']}, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: EditComponent, data: {allowedRoles: ['admin', 'hr']}, canActivate: [AuthGuard]},
  {path: 'show/:id', component: ShowComponent, data: {allowedRoles: ['admin', 'hr']}, canActivate: [AuthGuard]},
  {path: 'lm', component: LmHomeComponent, data: {allowedRoles: ['admin', 'lm']}, canActivate: [AuthGuard]},
  {path: 'lm-add/:form/:id', component: LmAddComponent, data: {allowedRoles: ['admin', 'lm']}, canActivate: [AuthGuard]},
  {path: 'lm-show/:id', component: LmShowComponent, data: {allowedRoles: ['admin', 'lm']}, canActivate: [AuthGuard]},
  {path: 'it', component: ItHomeComponent, data: {allowedRoles: ['admin', 'it']}, canActivate: [AuthGuard]},
  {path: 'it-show/:id', component: ItShowComponent, data: {allowedRoles: ['admin', 'it']}, canActivate: [AuthGuard]},
  {path: 'dash/:id', component: TestingComponent, canActivate: [AuthGuard]},
  {path: 'prop', component: PropHomeComponent, data: {allowedRoles: ['admin', 'prop']}, canActivate: [AuthGuard]},
  {path: 'prop-show/:id', component: PropShowComponent, data: {allowedRoles: ['admin', 'prop']}, canActivate: [AuthGuard]},
  {path: 'chart', component: HrStatsComponent, data: {allowedRoles: ['admin', 'hr']}, canActivate: [AuthGuard]},
  {path: 'denied', component: DeniedComponent}
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
    ItHomeComponent,
    TestingComponent,
    NavigationComponent,
    FormtestComponent,
    PropHomeComponent,
    PropShowComponent,
    ConfirmDialogComponent,
    HrStatsComponent,
    BarChartComponent,
    PieChartComponent,
    LineChartComponent,
    StackedBarComponent,
    AdminPanelComponent,
    AdminEditComponent,
    AdminCreateComponent,
    DeniedComponent,
    CommentsComponent,
    AssignRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HighchartsChartModule,
    FlashMessagesModule.forRoot()
  ],
  exports: [
    BarChartComponent
  ],
  providers: [AuthService, CommonService, AuthGuard, StatisticsService],
  bootstrap: [AppComponent],
  entryComponents: [AddComponent, ConfirmDialogComponent]
})
export class AppModule { }
