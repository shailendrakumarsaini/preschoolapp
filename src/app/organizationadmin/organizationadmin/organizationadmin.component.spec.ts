import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationadminComponent } from './organizationadmin.component';

describe('OrganizationadminComponent', () => {
  let component: OrganizationadminComponent;
  let fixture: ComponentFixture<OrganizationadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
