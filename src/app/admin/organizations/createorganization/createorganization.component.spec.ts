import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateorganizationComponent } from './createorganization.component';

describe('CreateorganizationComponent', () => {
  let component: CreateorganizationComponent;
  let fixture: ComponentFixture<CreateorganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateorganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateorganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
