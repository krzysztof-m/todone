import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TasksListComponent } from './dashboard/tasks-list/tasks-list.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './dashboard/tasks-list/list/list.component';
import { ListItemComponent } from './dashboard/tasks-list/list/list-item/list-item.component';
import { ItemEditComponent } from './dashboard/tasks-list/list/list-item/item-edit/item-edit.component';
import { SettingsComponent } from './dashboard/profile/settings/settings.component';
import { StatsComponent } from './dashboard/profile/stats/stats.component';
import { NotificationsComponent } from './dashboard/notifications/notifications.component';

const route: Routes = [
  { path: '', component: HomeComponent },
  { path: 'app', component: DashboardComponent, children: [
    { path: 'tasks', component: TasksListComponent, children: [
      { path: ':filter', component: ListComponent },
      { path: '', redirectTo: 'all', pathMatch: 'full' }
    ] },
    { path: 'profile', component: ProfileComponent, children: [
      { path: 'settings', component: SettingsComponent },
      { path: 'stats', component: StatsComponent },
      { path: '', redirectTo: 'settings', pathMatch: 'full' },
    ] },
    { path: '', redirectTo: 'tasks', pathMatch: 'full'}
  ] },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksListComponent,
    ProfileComponent,
    HeaderComponent,
    DashboardComponent,
    ListComponent,
    ListItemComponent,
    ItemEditComponent,
    SettingsComponent,
    StatsComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(route)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
