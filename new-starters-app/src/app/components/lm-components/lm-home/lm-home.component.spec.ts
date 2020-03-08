import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmHomeComponent } from './lm-home.component';

describe('LmHomeComponent', () => {
  let component: LmHomeComponent;
  let fixture: ComponentFixture<LmHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
