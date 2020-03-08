import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmAddComponent } from './lm-add.component';

describe('LmAddComponent', () => {
  let component: LmAddComponent;
  let fixture: ComponentFixture<LmAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
