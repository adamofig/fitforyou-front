import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../core/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private firebaseAuthService: FirebaseAuthService) {}

  ngOnInit(): void {}

  public async signIn() {
    await this.firebaseAuthService.signWithProvider('google');
  }
}
