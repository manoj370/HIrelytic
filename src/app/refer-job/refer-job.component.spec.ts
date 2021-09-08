import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferJobComponent } from './refer-job.component';

describe('ReferJobComponent', () => {
  let component: ReferJobComponent;
  let fixture: ComponentFixture<ReferJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
