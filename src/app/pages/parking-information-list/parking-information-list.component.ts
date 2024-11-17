import { Component } from '@angular/core';
import { ParkingInfromationTableComponent } from '../../modules/parking-information-list/components/parking-infromation-table/parking-infromation-table.component';

@Component({
  selector: 'app-parking-information-list',
  standalone: true,
  imports: [
    ParkingInfromationTableComponent
  ],
  templateUrl: './parking-information-list.component.html',
  styleUrl: './parking-information-list.component.scss'
})
export class ParkingInformationListComponent {

}
