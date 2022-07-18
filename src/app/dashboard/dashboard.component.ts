import { Component, OnInit } from '@angular/core';

import { FirebaseAuthService } from '../core/firebase-auth.service';
import { UserService } from '../core/data-services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.user.information?.urlPicture;
  }

  private signOut(): void {
    this.firebaseAuthService.logOut();
  }

  public items = [
    {
      label: 'Sign out',
      icon: 'pi pi-fw pi-trash',
      command: this.signOut.bind(this),
    },
  ];
}
