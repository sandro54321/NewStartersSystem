import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItHomeComponent } from './it-home.component';

describe('ItHomeComponent', () => {
  let component: ItHomeComponent;
  let fixture: ComponentFixture<ItHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
