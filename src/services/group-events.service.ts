import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GroupEventsService {
  private groupCreatedSource = new Subject<void>();
  groupCreated$ = this.groupCreatedSource.asObservable();

  notifyGroupCreated() {
    this.groupCreatedSource.next();
  }
}