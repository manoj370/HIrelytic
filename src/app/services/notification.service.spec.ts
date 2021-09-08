import { TestBed } from '@angular/core/testing';

import { NotificationMessageService } from './notification.service';

describe('NotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationMessageService = TestBed.get(NotificationMessageService);
    expect(service).toBeTruthy();
  });
});
