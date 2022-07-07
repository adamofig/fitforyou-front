import { Injectable } from '@angular/core';

import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  IdTokenResult,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RoutesEnum } from './enums';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  constructor(private auth: Auth, private router: Router) {}

  public async signWithProvider(privider: 'google' | 'facebook') {
    let authResult = null;
    if (privider === 'google') {
      authResult = await signInWithPopup(this.auth, new GoogleAuthProvider());
    } else if (privider === 'facebook') {
      authResult = await signInWithPopup(this.auth, new FacebookAuthProvider());
    } else {
      throw new Error('No se tiene un provedor válido');
    }
    console.log(authResult);
    this.router.navigateByUrl('/' + RoutesEnum.Dashboard);
  }
}
