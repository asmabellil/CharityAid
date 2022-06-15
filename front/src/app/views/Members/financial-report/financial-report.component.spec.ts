import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuelReportComponent } from './financial-report.component';

describe('AnnuelReportComponent', () => {
  let component: AnnuelReportComponent;
  let fixture: ComponentFixture<AnnuelReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnuelReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnuelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
