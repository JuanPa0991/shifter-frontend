import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserEventsService {
  private userCreatedSource = new Subject<void>();
  userCreated$ = this.userCreatedSource.asObservable();

  constructor() { }

  notifyUserCreated() {
    this.userCreatedSource.next();
  }
}
