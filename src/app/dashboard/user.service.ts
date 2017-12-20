import { Achievement } from './achievement.model';
import { AchievementsService } from './achievements.service';
import { Injectable } from '@angular/core';
import { NotifyService } from './notify.service';

@Injectable()
export class UserService {
    user = {
        name: 'John Doe',
        experience: 0,
        level: 1,
        achievements: [],
        allAdded: 0,
        allDone: 0
    }

    levels = [5, 10, 20, 35, 50, 100];

    constructor(private notifyService: NotifyService) {}

    addAdded() {
        this.user.allAdded += 1;
        this.gainExperience();
        this.checkLevel();
        this.addAchievement();
    }

    addDone() {
        this.user.allDone += 1;
        this.gainExperience(2);
        this.checkLevel();
        //this.addAchievement();
    }

    gainExperience(multiply = 1) {
        this.user.experience += ( 1 * multiply);
    }

    checkLevel() {
        if (this.levels[this.user.level - 1] < this.user.experience) {
            this.user.level += 1;
            this.notifyService.notify.next(`You've reached level ${this.user.level}!`);
        }
    }

    addAchievement() {
        if (this.user.allAdded === 1) {
            const achievement = new Achievement('First blood', 'For first added task', 'trophy', 1);
            this.user.achievements.push(achievement);
            this.notifyService.notify.next(`New achievement: ${achievement.name}!`);
        }
        if (this.user.allAdded === 10) {
            const achievement = new Achievement('Ambitious', 'For 10 added tasks', 'graduation-cap', 10);
            this.user.achievements.push(achievement);
            this.notifyService.notify.next(`New achievement: ${achievement.name}!`);
        }
        /*if (this.user.allDone === 1) {
            const achievement = new Achievement('Done!', 'For first done task', 'check', 1);
            this.user.achievements.push(achievement);
            this.notifyService.notify.next(`New achievement: ${achievement.name}!`);
        }*/
    }
}