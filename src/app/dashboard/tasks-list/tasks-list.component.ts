import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  count;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.count = this.tasksService.getAmount();
    this.tasksService.itemsChanged.subscribe(() => {
      this.count = this.tasksService.getAmount();
    });
  }

}
//OnDestroy!!!!!!