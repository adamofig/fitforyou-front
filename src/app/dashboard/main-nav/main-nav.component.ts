import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum } from 'src/app/core/enums';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  public menu = {
    home: { selected: false },
    picture: { selected: false },
  };

  public routesEnum = RoutesEnum;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public navigateTo(routeName: RoutesEnum): void {
    this.router.navigate([RoutesEnum.Dashboard, routeName]);
  }
}
