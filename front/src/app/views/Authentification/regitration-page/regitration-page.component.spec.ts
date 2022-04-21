import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegitrationPageComponent } from './regitration-page.component';

describe('RegitrationPageComponent', () => {
  let component: RegitrationPageComponent;
  let fixture: ComponentFixture<RegitrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegitrationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegitrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
