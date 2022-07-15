import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { FirebaseAuthService } from '../core/firebase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class InjectorService implements HttpInterceptor {
  constructor(private fbAuthService: FirebaseAuthService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.fbAuthService.tokenId$.pipe(
      mergeMap((token) => {
        const modifiedRequest = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
