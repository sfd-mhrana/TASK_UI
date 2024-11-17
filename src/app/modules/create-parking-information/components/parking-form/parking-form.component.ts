import { Component, Input, input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularModule } from '../../../../shared/modules/angular.module';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { ParkingInformationStateService } from '../../../parking-information-list/services/parking-information-state.service';
import { VehicleTypeEnum } from '../../../../shared/enums/vehicle-type.enum';
import { ParkingStatusEnum } from '../../../../shared/enums/parking-status.enum';
import { IParkingInformation } from '../../../parking-information-list/interfaces/parking-information.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNativeDatetimeAdapter } from '@ng-matero/extensions/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-parking-form',
  standalone: true,
  imports: [AngularModule, MaterialModule],
  templateUrl: './parking-form.component.html',
  styleUrl: './parking-form.component.scss',
  providers: [provideNativeDatetimeAdapter(), DatePipe],
})
export class ParkingFormComponent {
  parkingForm: FormGroup;

  updateInformation?: IParkingInformation;

  // Enum values for status and vehicle type
  parkingStatusEnum = ParkingStatusEnum;
  vehicleTypeEnum = VehicleTypeEnum;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    public parkingInformationStateService: ParkingInformationStateService
  ) {
    this.parkingForm = this.fb.group({
      id: [0],
      licenseNumber: ['', Validators.required],
      vehicleType: ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerPhone: ['', Validators.required],
      ownerAddress: ['', Validators.required],
      entryTime: ['', Validators.required],
      exitTime: [''],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['infoId'] && params['infoId'] > 0) {
        this.updateInformation = this.parkingInformationStateService.getById(
          params['infoId']
        );
        if (this.updateInformation) {
          this.parkingForm.patchValue({
            ...this.updateInformation,
            ...{
              entryTime: new Date(this.updateInformation.entryTime),
              exitTime: this.updateInformation.exitTime
                ? new Date(this.updateInformation.exitTime)
                : null,
            },
          });
        } else this.parkingForm.reset();
      } else this.parkingForm.reset();
    });
  }

  onSubmit(): void {
    const formData = this.parkingForm.value;
    let parkingData: Array<IParkingInformation> =
      this.parkingInformationStateService.parkingData;
    const charge = this.calculateParkingCharge(formData.vehicleType);

    formData.parkingCharge = charge;

    if (formData.id) {
      const updatedParkingData: Array<IParkingInformation> = parkingData.map(
        (item) => (item.id === formData.id ? { ...item, ...formData } : item)
      );
      parkingData = updatedParkingData;
    } else {
      formData.id = parkingData.length + 1;
      parkingData.push(formData);
    }

    localStorage.setItem('parkingData', JSON.stringify(parkingData));
    this.parkingInformationStateService.parkingData = parkingData;
    this.router.navigate(['parking-information-list']);
  }

  calculateParkingCharge(vehicleType: string): number {
    let charge = 0;
    switch (vehicleType) {
      case 'microbus':
        charge = 20;
        break;
      case 'car':
        charge = 15;
        break;
      case 'truck':
        charge = 30;
        break;
      case 'bike':
        charge = 10;
        break;
    }
    return charge;
  }
}
