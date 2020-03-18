import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropShowComponent } from './prop-show.component';

describe('PropShowComponent', () => {
  let component: PropShowComponent;
  let fixture: ComponentFixture<PropShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
