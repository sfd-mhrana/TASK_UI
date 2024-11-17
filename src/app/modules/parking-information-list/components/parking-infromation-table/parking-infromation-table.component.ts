import { Component } from '@angular/core';
import { AngularModule } from '../../../../shared/modules/angular.module';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { ParkingInformationStateService } from '../../services/parking-information-state.service';
import { MatTableDataSource } from '@angular/material/table';
import { IParkingInformation } from '../../interfaces/parking-information.interfaces';
import { EnumsPipe } from '../../../../shared/pipes/enums-pipe.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking-infromation-table',
  standalone: true,
  imports: [AngularModule, MaterialModule, EnumsPipe],
  templateUrl: './parking-infromation-table.component.html',
  styleUrl: './parking-infromation-table.component.scss',
})
export class ParkingInfromationTableComponent {
  displayedColumns: string[] = [
    'ownerName',
    'vehicleType',
    'licenseNumber',
    'entryTime',
    'exitTime',
    'status',
    'edit',
  ];

  dataSource = new MatTableDataSource<IParkingInformation>();

  constructor(
    public parkingInformationStateService: ParkingInformationStateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataSource.data = this.parkingInformationStateService.parkingData;
  }

  editVehicle(vehicle: IParkingInformation) {
    this.router.navigate(['/create-parking-information'], {
      queryParams: { infoId: vehicle.id }
    });
  }
}
