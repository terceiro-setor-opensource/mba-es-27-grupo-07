import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import {
  IAds,
  IAdsDetailsResponse,
  IAdsListResponse,
  IAdsResponse,
} from '../models/ads.model';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  private functions = environment.functions.ads;

  constructor(private http: HttpClient, private authService: AuthService) {}

  async create(ads: IAds) {
    const credentials = await this.authService.getCredentials();

    const result$ = this.http.post<IAdsResponse>(
      `${this.functions.createUrl}`,
      ads,
      {
        headers: {
          Authorization: `Bearer ${credentials?.token || ''}`,
        },
      }
    );

    return lastValueFrom(result$);
  }

  async listUserAds() {
    const credentials = await this.authService.getCredentials();

    const result$ = this.http.get<IAdsListResponse>(
      `${this.functions.listUserAds}`,
      {
        headers: {
          Authorization: `Bearer ${credentials?.token || ''}`,
        },
      }
    );

    return lastValueFrom(result$);
  }

  async getUserAds(adsId: string) {
    const credentials = await this.authService.getCredentials();

    const result$ = this.http.get<IAdsResponse>(
      `${this.functions.getUserAds}/${adsId}`,
      {
        headers: {
          Authorization: `Bearer ${credentials?.token || ''}`,
        },
      }
    );

    return lastValueFrom(result$);
  }

  async listAllAds() {
    const credentials = await this.authService.getCredentials();

    const result$ = this.http.get<IAdsListResponse>(
      `${this.functions.listAllAds}`,
      {
        headers: {
          Authorization: `Bearer ${credentials?.token || ''}`,
        },
      }
    );

    return lastValueFrom(result$);
  }

  async getAds(adsId: string) {
    const credentials = await this.authService.getCredentials();

    const result$ = this.http.get<IAdsDetailsResponse>(
      `${this.functions.getAds}/${adsId}`,
      {
        headers: {
          Authorization: `Bearer ${credentials?.token || ''}`,
        },
      }
    );

    return lastValueFrom(result$);
  }
}
