import { Component, OnInit } from '@angular/core';
import { IAds } from 'src/app/models/ads.model';
import { AdsService } from 'src/app/services/ads.service';
import { formatPrice } from 'src/app/utils/format-price';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  adsList: IAds[] = [];
  isLoading: boolean = true;

  constructor(private adsService: AdsService) {}

  formatPrice = formatPrice;

  async ngOnInit() {
    try {
      const response = await this.adsService.listAllAds();
      this.adsList = response.adsList || [];
    } catch (error) {
      console.error('Error loading ads list: ', error);
    } finally {
      this.isLoading = false;
    }
  }
}
