import { Injectable } from '@angular/core';
import { IParkingInformation } from '../interfaces/parking-information.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ParkingInformationStateService {
  parkingData: Array<IParkingInformation> = [];

  constructor() {
    if (this.isBrowser()) {
      this.parkingData = JSON.parse(
        localStorage.getItem('parkingData') || '[]'
      );
    }
  }

  getById(id: number) {
    return this.parkingData.find((item) => item.id == id);
  }

  private isBrowser(): boolean {
    return (
      // Can make it also angular platform browser.
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }
}
