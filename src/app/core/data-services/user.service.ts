import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ApiUser } from '../apis.enums';
import { User } from '../app.models';
import { HttpService } from '../system/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user!: User;

  constructor(private httpService: HttpService) {}

  public getUser$() {
    return this.httpService.getObservable<User>(`${ApiUser.Get}`).pipe(
      tap((data) => {
        this.user = data;
      })
    );
  }
}
