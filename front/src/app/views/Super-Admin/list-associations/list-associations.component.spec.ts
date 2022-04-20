import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssociationsComponent } from './list-associations.component';

describe('ListAssociationsComponent', () => {
  let component: ListAssociationsComponent;
  let fixture: ComponentFixture<ListAssociationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssociationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
