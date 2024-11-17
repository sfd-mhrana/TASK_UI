import { TestBed } from '@angular/core/testing';

import { ParkingInformationStateService } from './parking-information-state.service';

describe('ParkingInformationStateService', () => {
  let service: ParkingInformationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingInformationStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
