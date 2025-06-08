import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TurnEventsService {
  private turnCreatedSource = new Subject<void>();
  turnCreated$ = this.turnCreatedSource.asObservable();

  notifyTurnCreated() {
    this.turnCreatedSource.next();
  }
}
