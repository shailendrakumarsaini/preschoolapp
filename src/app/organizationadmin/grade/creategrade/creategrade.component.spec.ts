import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreategradeComponent } from './creategrade.component';

describe('CreategradeComponent', () => {
  let component: CreategradeComponent;
  let fixture: ComponentFixture<CreategradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreategradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreategradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
