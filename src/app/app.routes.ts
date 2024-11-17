import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'create-parking-information',
    loadComponent: () =>
      import(
        './pages/create-parking-information/create-parking-information.component'
      ).then((c) => c.CreateParkingInformationComponent),
  },
  {
    path: 'parking-information-list',
    loadComponent: () =>
      import(
        './pages/parking-information-list/parking-information-list.component'
      ).then((c) => c.ParkingInformationListComponent),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
