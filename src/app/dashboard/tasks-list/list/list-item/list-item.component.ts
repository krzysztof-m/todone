import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../../tasks.service';
import { Task } from '../../task.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() listItem: Task;
  listItemId: number;
  isEdit = false;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.listItemId = this.listItem.getId();
  }

  onChange() {
    this.tasksService.changeTaskStatus(this.listItemId);
  }

  onRemoveItem() {
    this.tasksService.removeTask(this.listItemId);
  }

  onEditItem() {
    this.isEdit = !this.isEdit;
  }

  onFinishEdit(status) {
    this.isEdit = status;
  }
}
