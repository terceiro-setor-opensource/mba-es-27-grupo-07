import { Component, OnInit } from '@angular/core';
import { AdsService } from '../../services/ads.service';
import { IAds } from '../../models/ads.model';
@Component({
  selector: 'app-my-ads-page',
  templateUrl: './my-ads-page.component.html',
  styleUrl: './my-ads-page.component.css',
})

export class MyAdsPageComponent implements OnInit {
  userAds: IAds[] = [];
  isLoading = true;

  constructor(private adsService: AdsService) {}

  async ngOnInit() {
    try {
      const response = await this.adsService.listUserAds();
      this.userAds = response.adsList || [];
    } catch (error) {
      console.error('Erro ao carregar anúncios:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
