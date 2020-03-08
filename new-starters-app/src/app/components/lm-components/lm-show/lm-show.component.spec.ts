import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmShowComponent } from './lm-show.component';

describe('LmShowComponent', () => {
  let component: LmShowComponent;
  let fixture: ComponentFixture<LmShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
