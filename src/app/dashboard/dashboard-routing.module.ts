import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesEnum } from '../core/enums';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { PicturesComponent } from './pictures/pictures.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: RoutesEnum.Home,
        component: HomeComponent,
      },
      { path: RoutesEnum.Picture, component: PicturesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
