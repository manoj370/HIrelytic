import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferalUpdateComponent } from './refferal-update.component';

describe('RefferalUpdateComponent', () => {
  let component: RefferalUpdateComponent;
  let fixture: ComponentFixture<RefferalUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefferalUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefferalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
