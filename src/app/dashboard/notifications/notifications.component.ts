import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../notify.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  messages: string[] = [];
  notified = false;
  timeout;

  constructor(private notifyService: NotifyService) { }

  ngOnInit() {
    this.notifyService.notify.subscribe((msg: string) => {
      this.messages.unshift(msg);
      this.showNotification();
    });
  }

  showNotification() {
    this.notified = true;
    if (this.messages.length > 3) {
      this.messages.pop();
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => { 
      this.notified = false;
      this.messages = [];
     }, 2000);
  }
}
