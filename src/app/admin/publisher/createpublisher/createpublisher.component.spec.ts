import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepublisherComponent } from './createpublisher.component';

describe('CreatepublisherComponent', () => {
  let component: CreatepublisherComponent;
  let fixture: ComponentFixture<CreatepublisherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepublisherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
