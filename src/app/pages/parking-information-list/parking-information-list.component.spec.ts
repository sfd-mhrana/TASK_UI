import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingInformationListComponent } from './parking-information-list.component';

describe('ParkingInformationListComponent', () => {
  let component: ParkingInformationListComponent;
  let fixture: ComponentFixture<ParkingInformationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingInformationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingInformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
