import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';

import { IAds } from './../../models/ads.model';
import { AdsService } from 'src/app/services/ads.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { validateFormGroup } from 'src/app/utils';
import { FileAdsService } from 'src/app/services/file-ads.service';

@Component({
  selector: 'app-my-ads-details-page',
  templateUrl: './my-ads-details-page.component.html',
  styleUrl: './my-ads-details-page.component.css',
})
export class MyAdsDetailsPageComponent implements OnInit {
  adsForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    imageUrl: new FormControl(null, [Validators.required]),
  });
  imageUrl: SafeUrl = '';
  isNewAds: boolean = true;
  ads: IAds | null = null;
  isLoading: boolean = false;

  constructor(
    private snackBarService: SnackBarService,
    private adsService: AdsService,
    private fileAdsService: FileAdsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let param = parseInt(this.router.snapshot.paramMap.get('param') as string);

    this.isNewAds = isNaN(param);
  }

  async uploadImage() {
    try {
      const file = this.adsForm.get('imageUrl')?.value as File;

      const response = await this.fileAdsService.uploadFile(file);

      return response;
    } catch (error) {
      console.error('Error uploading image:', error);

      return '';
    }
  }

  async onSave() {
    try {
      const isValidForm = validateFormGroup(this.adsForm);

      if (!isValidForm) return;

      this.isLoading = true;

      const filePath = await this.uploadImage();

      if (!filePath) {
        this.snackBarService.showNotificationMassage(
          'Erro ao fazer upload da imagem. Verifique o arquivo e tente novamente.',
          'snackbarError'
        );

        return;
      }

      const ads: IAds = {
        title: this.adsForm.get('title')?.value,
        description: this.adsForm.get('description')?.value,
        price: Number(this.adsForm.get('price')?.value),
        status: this.adsForm.get('status')?.value,
        filePath,
      };

      const response = await this.adsService.create(ads);

      if (!response?.ads?.id) throw new Error('Error saving ads');

      this.ads = response?.ads;
      this.isNewAds = false;

      this.snackBarService.showNotificationMassage(
        'Anúncio salvo com sucesso!',
        'snackbarSuccess'
      );
    } catch (error) {
      console.error('Error saving ads: ', error);

      this.snackBarService.showNotificationMassage(
        'Erro ao salvar anúncio. Verifique os campos e tente novamente.',
        'snackbarError'
      );
    } finally {
      this.isLoading = false;
    }
  }
}
