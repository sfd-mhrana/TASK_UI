export interface IParkedDashboardInformation {
  totalCarsParked: number;
  vehicleTypeInfo: { [key: string]: number };
  totalEmptySlots: number;
  vehiclesParkedMoreThanTwoHours: Array<{
    licenseNumber: string;
    timeParked: string;
  }>;
}
