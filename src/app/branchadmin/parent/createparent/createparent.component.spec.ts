import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateparentComponent } from './createparent.component';

describe('CreateparentComponent', () => {
  let component: CreateparentComponent;
  let fixture: ComponentFixture<CreateparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateparentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
