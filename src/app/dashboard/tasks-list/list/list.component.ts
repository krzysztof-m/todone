import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TasksService } from '../tasks.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listFilter: string;
  tasksList: Task[];

  
  constructor(private activeRoute: ActivatedRoute, private tasksService: TasksService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.listFilter = params['filter'];
        this.tasksList = this.tasksService.getTasks(this.listFilter);
        this.tasksService.listSectionChanged.next(params['filter']);
      }
    );
    this.tasksService.itemsChanged.subscribe((tasks: Task[]) => {
      this.tasksList = tasks;
    });
  }

  onRemoveAll() {
    this.tasksService.removeAllDone();
  }

}
