import { TestBed } from '@angular/core/testing';

import { TurnEventService } from './turn-event.service';

describe('TurnEventService', () => {
  let service: TurnEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
