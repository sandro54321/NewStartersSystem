import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItShowComponent } from './it-show.component';

describe('ItShowComponent', () => {
  let component: ItShowComponent;
  let fixture: ComponentFixture<ItShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
