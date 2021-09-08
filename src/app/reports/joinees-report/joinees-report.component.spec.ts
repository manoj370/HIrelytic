import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoineesReportComponent } from './joinees-report.component';

describe('JoineesReportComponent', () => {
  let component: JoineesReportComponent;
  let fixture: ComponentFixture<JoineesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoineesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoineesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
