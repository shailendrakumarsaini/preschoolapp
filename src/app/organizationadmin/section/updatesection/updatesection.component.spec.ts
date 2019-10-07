import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesectionComponent } from './updatesection.component';

describe('UpdatesectionComponent', () => {
  let component: UpdatesectionComponent;
  let fixture: ComponentFixture<UpdatesectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatesectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
