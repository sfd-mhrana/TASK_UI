import { Component } from '@angular/core';
import { AngularModule } from '../../../../shared/modules/angular.module';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DashboardStateService } from '../../services/dashboard-state.service';
import { IParkedDashboardInformation } from '../../interfaces/parked-dashboard-information.interfaces';
import { VehicleTypeEnum } from '../../../../shared/enums/vehicle-type.enum';

@Component({
  selector: 'app-partked-information',
  standalone: true,
  imports: [AngularModule, MaterialModule],
  templateUrl: './partked-information.component.html',
  styleUrl: './partked-information.component.scss',
})
export class PartkedInformationComponent {
  selectedDate: Date = new Date();

  dashboardData!: IParkedDashboardInformation;
  vehicleTypeEnum = VehicleTypeEnum;
  constructor(private dashboardStateService: DashboardStateService) {}

  ngOnInit(): void {
    this.fetchDashboardData(this.selectedDate);
  }

  fetchDashboardData(date: Date): void {
    this.dashboardData = this.dashboardStateService.getDashBoardInfoData(
      this.selectedDate
    );
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) this.fetchDashboardData(event.value);
  }
}
