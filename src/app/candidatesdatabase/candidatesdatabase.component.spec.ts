import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesdatabaseComponent } from './candidatesdatabase.component';

describe('CandidatesdatabaseComponent', () => {
  let component: CandidatesdatabaseComponent;
  let fixture: ComponentFixture<CandidatesdatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatesdatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesdatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
