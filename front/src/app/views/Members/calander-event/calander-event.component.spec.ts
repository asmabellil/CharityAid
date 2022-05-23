import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalanderEventComponent } from './calander-event.component';

describe('CalanderEventComponent', () => {
  let component: CalanderEventComponent;
  let fixture: ComponentFixture<CalanderEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalanderEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalanderEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
