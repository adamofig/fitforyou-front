import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../core/auth-guard.service';
import { RoutesEnum } from '../core/enums';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { PicturesComponent } from './pictures/pictures.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: RoutesEnum.Home,
        component: HomeComponent,
      },
      { path: RoutesEnum.Picture, component: PicturesComponent },
      { path: 'test', component: TestComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
