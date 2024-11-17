import { Component } from '@angular/core';
import { AngularModule } from '../../../shared/modules/angular.module';
import { MaterialModule } from '../../../shared/modules/material.module';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    AngularModule,
    MaterialModule
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {

}
