import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { NotifyService } from '../notify.service';
import { UserService } from '../user.service';

@Injectable()
export class TasksService {
    itemsChanged = new Subject();
    listSection: string;
    listSectionChanged = new Subject();
    startId: number = 0;
    private tasks = {
        'todo': {
            'list': [
                new Task(this.assignID(), 'Some task'),
                new Task(this.assignID(), 'Another task')
            ],
            'count': null
        },
        'done': {
            'list': [
                new Task(this.assignID(), 'Finished!', true)
            ],
            'count': null
        },
        'count': null
    }

    constructor(private notifyService: NotifyService, private userService: UserService) {
        this.updateCount();
        this.listSectionChanged.subscribe((section: string) => {
            this.listSection = section;
        });
    }

    getTasks(type) {
        const todo = this.tasks.todo.list.slice(),
              done = this.tasks.done.list.slice();
        if (type === 'all')
            return todo.concat(done);
        else if (type === 'todo')
            return todo;
        else if (type === 'done')
            return done;
    }

    getAllTasks() {
        const todo = this.tasks.todo.list.slice(),
              done = this.tasks.done.list.slice();

        return todo.concat(done);
    }

    findTask(id) {
        const all = this.getAllTasks();
        const task = all.find(item => {
            return item.getId() === id;
        });
        const taskStatus = task.getStatus() ? 'done' : 'todo';
        const taskIndex = this.tasks[taskStatus].list.findIndex(item => {
            return item.getId() === id;
        });
        return {
            task: task,
            status: taskStatus,
            index: taskIndex
        }
    }

    changeTaskStatus(id) {
        console.log(id);
        const itemInfo = this.findTask(id),
              item = itemInfo.task,
              newStatus = item.getStatus() ? 'todo' : 'done';
        
        if (!item.getStatus()) {
            this.userService.addDone();
        }
        item.changeStatus();
        this.tasks[itemInfo.status].list.splice(itemInfo.index, 1);
        this.tasks[newStatus].list.push(item);

        this.updateCount();
        this.itemsChanged.next(this.getTasks(this.listSection));

        console.log(this.tasks);
    }

    getAmount() {
        return {
            'all': this.tasks.count,
            'todo': this.tasks.todo.count,
            'done': this.tasks.done.count
        }
    }

    updateCount() {
        this.tasks.todo.count = this.tasks.todo.list.length;
        this.tasks.done.count = this.tasks.done.list.length;
        this.tasks.count = this.tasks.todo.count + this.tasks.done.count;
    }

    addTask(task: Task) {
        this.tasks.todo.list.push(task);
        this.updateCount();
        this.itemsChanged.next(this.getTasks(this.listSection));
        this.notifyService.notify.next('Task added!');
        this.userService.addAdded();
    }

    removeAllDone() {
        this.tasks.done.list = [];
        this.updateCount();
        this.itemsChanged.next(this.getTasks('done'));
    }

    removeTask(id) {
        const item = this.findTask(id);
        this.tasks[item.status].list.splice(item.index,1);
        this.updateCount();
        this.itemsChanged.next(this.getTasks('all'));
        this.notifyService.notify.next('Task removed!');
    }
    //będzie problem przy zapisywaniu do bazy, trzeba będzie zapisać też startId
    assignID() {
        return this.startId++;
    }
}