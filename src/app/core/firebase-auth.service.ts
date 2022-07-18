import { Injectable } from '@angular/core';

import { take, concatMap } from 'rxjs/operators';

import {
  Auth,
  authState,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RoutesEnum } from './enums';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  constructor(private auth: Auth, private router: Router) {}

  public authState$ = authState(this.auth);

  public tokenId$ = this.authState$.pipe(
    take(1),
    concatMap((auth) => from(auth!.getIdToken()))
  );

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

  public async logOut() {
    // * clean state
    await this.auth.signOut();
    this.router.navigateByUrl('/' + RoutesEnum.Login);
  }
}
