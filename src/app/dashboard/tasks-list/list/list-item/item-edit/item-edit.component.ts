import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TasksService } from '../../../tasks.service';
import { Task } from '../../../task.model';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {
  @Input('isItemEdit') itemEdit: boolean;
  @Input() itemId: number;
  @Output() itemEdited = new EventEmitter<boolean>();
  @ViewChild('taskForm') taskForm: NgForm;
  taskText = '';
  taskItem: Task;
  filter: string;

  constructor(private tasksService: TasksService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this.itemEdit) {
      this.taskItem = this.tasksService.findTask(this.itemId).task;
      this.taskText = this.taskItem.getText();
    }
  }


  onSubmit() {
    if (!this.itemEdit) {
      this.tasksService.addTask(new Task(this.tasksService.assignID(), this.taskForm.value['task-text']));
    } else {
      this.taskItem.changeText(this.taskForm.value['task-text']);
      this.itemEdited.emit(false);
    }
    this.taskForm.reset();
  }
}
