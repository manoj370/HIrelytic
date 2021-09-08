import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTenantComponent } from './update-tenant.component';

describe('UpdateTenantComponent', () => {
  let component: UpdateTenantComponent;
  let fixture: ComponentFixture<UpdateTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
