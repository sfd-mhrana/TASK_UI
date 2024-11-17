import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingInfromationTableComponent } from './parking-infromation-table.component';

describe('ParkingInfromationTableComponent', () => {
  let component: ParkingInfromationTableComponent;
  let fixture: ComponentFixture<ParkingInfromationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingInfromationTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingInfromationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
