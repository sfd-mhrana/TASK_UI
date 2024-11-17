import { Component } from '@angular/core';
import { PartkedInformationComponent } from '../../modules/dashboard/components/partked-information/partked-information.component';
import { ChartInformationComponent } from '../../modules/dashboard/components/chart-information/chart-information.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PartkedInformationComponent,ChartInformationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  
}
