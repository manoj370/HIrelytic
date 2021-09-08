import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitementreportsComponent } from './recruitementreports.component';

describe('RecruitementreportsComponent', () => {
  let component: RecruitementreportsComponent;
  let fixture: ComponentFixture<RecruitementreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitementreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitementreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
