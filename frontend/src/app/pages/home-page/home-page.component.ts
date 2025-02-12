import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  serachForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

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

  onImageLoad(event: Event) {
    const image = event.target as HTMLImageElement;
    if (image) {
      image.classList.add('loaded');
    }
  }

  async onSearch() {
    try {
      const title = this.serachForm.get('search')?.value;
      const treatedTitle = title.trim();
      this.isLoading = true;

      if (treatedTitle) {
        const response = await this.adsService.listAdsByTitle(title);
        this.adsList = response.adsList || [];
      } else {
        const response = await this.adsService.listAllAds();
        this.adsList = response.adsList || [];
      }
    } catch (error) {
      console.error('Error searching ads: ', error);
      this.adsList = [];
    } finally {
      this.isLoading = false;
    }
  }
}
