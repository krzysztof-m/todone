import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

export class NotifyService {
    notify = new Subject();
    
    constructor() {}


}