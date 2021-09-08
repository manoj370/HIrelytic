import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedemosComponent } from './managedemos.component';

describe('ManagedemosComponent', () => {
  let component: ManagedemosComponent;
  let fixture: ComponentFixture<ManagedemosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedemosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
