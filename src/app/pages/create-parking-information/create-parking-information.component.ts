import { Component } from '@angular/core';
import { ParkingFormComponent } from '../../modules/create-parking-information/components/parking-form/parking-form.component';

@Component({
  selector: 'app-create-parking-information',
  standalone: true,
  imports: [
    ParkingFormComponent
  ],
  templateUrl: './create-parking-information.component.html',
  styleUrl: './create-parking-information.component.scss'
})
export class CreateParkingInformationComponent {

}
