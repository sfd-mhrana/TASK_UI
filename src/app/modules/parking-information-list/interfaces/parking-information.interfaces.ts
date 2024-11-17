export interface IParkingInformation {
  id: number;
  licenseNumber: string;
  vehicleType: 'microbus' | 'car' | 'truck' | 'bike';
  ownerName: string;
  ownerPhone: string;
  status: 'in' | 'out';
  ownerAddress: string;
  entryTime: Date ;
  exitTime: Date | null;
  parkingCharge: number;
}
