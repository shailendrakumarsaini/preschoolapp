import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchadminComponent } from './branchadmin.component';

describe('BranchadminComponent', () => {
  let component: BranchadminComponent;
  let fixture: ComponentFixture<BranchadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
