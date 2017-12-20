import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks-list/tasks.service';
import { NotifyService } from './notify.service';
import { UserService } from './user.service';
import { AchievementsService } from './achievements.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ TasksService, NotifyService, UserService, AchievementsService ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
