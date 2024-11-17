import { Pipe, PipeTransform } from '@angular/core';
import { VehicleTypeEnum } from '../enums/vehicle-type.enum';
import { ParkingStatusEnum } from '../enums/parking-status.enum';

@Pipe({
  name: 'enumDisplay',
  standalone: true,
})
export class EnumsPipe implements PipeTransform {
  getEnumKeyByValue<T extends object>(enumObject: T, value: string): keyof T | undefined {
    const enumKeys = Object.keys(enumObject) as Array<keyof T>;
    return enumKeys.find(key => enumObject[key] === value);
  }

  transform(value: any, type: 'status' | 'vehicleType'): string {
    if (type === 'status') {
      const key = this.getEnumKeyByValue(ParkingStatusEnum, value);
      return key || value;
    } else if (type === 'vehicleType') {
      const key = this.getEnumKeyByValue(VehicleTypeEnum, value);
      return key || value;
    }
    return value;
  }
}
