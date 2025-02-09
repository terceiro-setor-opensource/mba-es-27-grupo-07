import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { formatPrice } from './../../utils/format-price';
import { IAds } from 'src/app/models/ads.model';
import { IUser } from 'src/app/models/user.model';
import { AdsService } from 'src/app/services/ads.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-ads-page',
  templateUrl: './ads-page.component.html',
  styleUrl: './ads-page.component.css',
})
export class AdsPageComponent implements OnInit {
  ads: IAds | null = null;
  user: IUser | null = null;
  isLoading: boolean = true;

  constructor(
    private adsService: AdsService,
    private router: ActivatedRoute,
    private snackBarService: SnackBarService,
    private routerLink: Router
  ) {}

  formatPrice = formatPrice;

  onImageLoad(event: Event) {
    const image = event.target as HTMLImageElement;
    const skeleton = image.previousElementSibling as HTMLElement;
    if (skeleton && image) {
      skeleton.style.display = 'none';
      image.classList.add('loaded');
    }
  }

  async ngOnInit() {
    try {
      this.isLoading = true;
      const param = this.router.snapshot.paramMap.get('param') as string;

      const response = await this.adsService.getAds(param);

      if (!response?.data) throw new Error('Ads not found');

      this.ads = response.data.ads;
      this.user = response.data.user;
      this.isLoading = false;
    } catch (error) {
      console.error('Error load ads details', error);
      this.snackBarService.showNotificationMassage(
        'Erro ao carregar anúncio.',
        'snackbarError'
      );
      setTimeout(() => {
        this.routerLink.navigate(['/home']);
      }, 1000);
    }
  }

  openWhatsApp() {
    if (this.ads && this.user) {
      const message = `Olá, ${this.user.name}! Estou interessado no anúncio "${
        this.ads.title
      }" no valor de ${formatPrice(this.ads.price)}.`;
      const url = `https://wa.me/55${this.user.phone}?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, '_blank');
    }
  }
}
