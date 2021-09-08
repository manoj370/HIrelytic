import { TestBed } from '@angular/core/testing';

import { RequestDemoService } from './request-demo.service';

describe('RequestDemoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestDemoService = TestBed.get(RequestDemoService);
    expect(service).toBeTruthy();
  });
});
