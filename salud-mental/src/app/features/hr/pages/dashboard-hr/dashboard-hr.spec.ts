import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHr } from './dashboard-hr';

describe('DashboardHr', () => {
  let component: DashboardHr;
  let fixture: ComponentFixture<DashboardHr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHr);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
