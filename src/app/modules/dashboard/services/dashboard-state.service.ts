import { Injectable } from '@angular/core';
import { ParkingInformationStateService } from '../../parking-information-list/services/parking-information-state.service';
import { IParkingInformation } from '../../parking-information-list/interfaces/parking-information.interfaces';
import { IParkedDashboardInformation } from '../interfaces/parked-dashboard-information.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardStateService {
  constructor(
    private parkingInformationStateService: ParkingInformationStateService
  ) {}

  getDashBoardInfoData(date: Date): IParkedDashboardInformation {
    const data = this.filterDataByDate(date);
    const totalCarsParked = data.filter(
      (vehicle) => vehicle.status === 'in'
    ).length;
    const vehicleTypeInfo = data.reduce(
      (acc: { [key: string]: number }, vehicle) => {
        acc[vehicle.vehicleType] = (acc[vehicle.vehicleType] || 0) + 1;
        return acc;
      },
      {}
    );

    const totalEmptySlots = 100 - totalCarsParked; // assuming 100 slots in total for simplicity

    const vehiclesParkedMoreThanTwoHours = data
      .filter((vehicle) => {
        if (vehicle.entryTime && vehicle.status === 'in') {
          const diffInMs =
            new Date().getTime() - new Date(vehicle.entryTime).getTime();
          return diffInMs > 2 * 60 * 60 * 1000; // 2 hours in milliseconds
        }
        return false;
      })
      .map((vehicle) => {
        const diffInMs =
          new Date().getTime() - new Date(vehicle.entryTime).getTime();
        const hours = Math.floor(diffInMs / (1000 * 60 * 60)); // Get hours
        const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60)); // Get minutes
        const formattedTime = `${hours}h ${minutes}m`;
        return {
          licenseNumber: vehicle.licenseNumber,
          timeParked: formattedTime,
        };
      });

    return {
      totalCarsParked,
      vehicleTypeInfo,
      totalEmptySlots,
      vehiclesParkedMoreThanTwoHours,
    };
  }

  getDashboardPieChartData() {
    return this.parkingList
      .filter((vehicle) => vehicle.status === 'in')
      .reduce((acc, curr) => {
        acc[curr.vehicleType] = (acc[curr.vehicleType] || 0) + 1;
        return acc;
      }, {} as Record<IParkingInformation['vehicleType'], number>);
  }

  getDashboardLineChartData(
    timeRange: 'daily' | 'weekly' | 'monthly' = 'daily'
  ) {
    const counts: Record<string, Record<string, number>> = {};
    this.parkingList.forEach((entry) => {
      let key: string;

      // Group based on the selected range
      switch (timeRange) {
        case 'daily':
          key = new Date(entry.entryTime).toISOString().split('T')[0]; // YYYY-MM-DD
          break;
        case 'weekly':
          const date = new Date(entry.entryTime);
          const weekNumber = Math.ceil((date.getDate() - 1) / 7); // Week number of the month
          key = `${date.getFullYear()}-W${weekNumber}`;
          break;
        case 'monthly':
          const month = new Date(entry.entryTime).getMonth() + 1; // 1-12
          key = `${new Date(entry.entryTime).getFullYear()}-${month
            .toString()
            .padStart(2, '0')}`; // YYYY-MM
          break;
        default:
          key = '';
      }

      // Initialize the group if it doesn't exist
      if (!counts[key]) {
        counts[key] = {};
      }
      // Increment the count for the specific vehicle type
      counts[key][entry.vehicleType] =
        (counts[key][entry.vehicleType] || 0) + 1;
    });

    return counts;
  }

  get parkingList() {
    return this.parkingInformationStateService.parkingData;
  }

  filterDataByDate(selectedDate: Date): Array<IParkingInformation> {
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)
    return this.parkingList.filter((vehicle) => {
      if (vehicle.entryTime) {
        const entryDate = new Date(vehicle.entryTime);
        entryDate.setHours(0, 0, 0, 0); // Set the time to midnight for entryDate
        return entryDate.getTime() === startOfDay.getTime();
      }
      return false;
    });
  }
}
