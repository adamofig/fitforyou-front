import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

import { FirebaseAuthService } from '../core/firebase-auth.service';
import { UserService } from './data-services/user.service';
import { AuthRoute, RoutesEnum } from './enums';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(
    private fbAuthService: FirebaseAuthService,
    private router: Router,
    private userService: UserService
  ) {}
  canLoad(_route: Route, _segments: UrlSegment[]) {
    return this.fbAuthService.authState$.pipe(
      map((isAuth) => {
        debugger;
        if (isAuth) {
          return true;
        }
        return this.router.parseUrl(`${RoutesEnum.Dashboard}`);
      })
    );
  }

  public canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): any {
    const isUserLoaded = !!this.userService.user;
    if (isUserLoaded) {
      return of(true);
    }

    return this.fbAuthService.authState$.pipe(
      concatMap((isAuth: any) => {
        if (isAuth) {
          return this.userService.getUser$().pipe(map(Boolean));
        }
        return of(this.router.parseUrl(`${AuthRoute.login}`));
      })
    );
  }
}
