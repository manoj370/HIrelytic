import { TestBed } from '@angular/core/testing';

import { DataclientService } from './dataclient.service';

describe('DataclientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataclientService = TestBed.get(DataclientService);
    expect(service).toBeTruthy();
  });
});
