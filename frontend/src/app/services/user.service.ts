import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { IUser, IUserResponse } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private functions = environment.functions.profile;

  constructor(private http: HttpClient) {}

  create(profile: IUser) {
    const result$ = this.http.post<IUserResponse>(
      `${this.functions.createUrl}`,
      profile
    );

    return lastValueFrom(result$);
  }
}
