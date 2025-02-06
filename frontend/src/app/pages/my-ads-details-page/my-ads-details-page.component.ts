import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: ActivatedRoute,
    private routerLink: Router
  ) {}

  ngOnInit(): void {
    const adsId = this.router.snapshot.paramMap.get('param');
    this.isNewAds = !adsId;

    if (!this.isNewAds) {
      this.loadAdsDetails(adsId as string);
    }
  }

  async loadAdsDetails(adsId: string) {
    try {
      this.isLoading = true;
      const response = await this.adsService.getUserAds(adsId);

      if (response?.ads) {
        this.ads = response.ads;
        this.imageUrl = response.ads.fileUrl || '';

        // Preenche o formulário com os dados do anúncio
        this.adsForm.patchValue({
          title: response.ads.title,
          description: response.ads.description,
          price: response.ads.price,
          status: response.ads.status,
          imageUrl: null // A imagem atual já está sendo mostrada via imageUrl
        });
      }
    } catch (error) {
      console.error('Erro ao carregar dados do anúncio:', error);
      this.snackBarService.showNotificationMassage(
        'Erro ao carregar dados do anúncio',
        'snackbarError'
      );
    } finally {
      this.isLoading = false;
    }
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

      // Só faz upload da imagem se uma nova imagem foi selecionada
      let filePath = this.ads?.filePath || '';
      if (this.adsForm.get('imageUrl')?.value instanceof File) {
        filePath = await this.uploadImage() || '';
        if (!filePath) {
          this.snackBarService.showNotificationMassage(
            'Erro ao fazer upload da imagem. Verifique o arquivo e tente novamente.',
            'snackbarError'
          );
          return;
        }
      }

      const ads: IAds = {
        title: this.adsForm.get('title')?.value,
        description: this.adsForm.get('description')?.value,
        price: Number(this.adsForm.get('price')?.value),
        status: this.adsForm.get('status')?.value,
        filePath,
      };

      let response;
      if (this.isNewAds) {
        response = await this.adsService.create(ads);
      } else {
        response = await this.adsService.updateAds(this.ads?.id as string, ads);
      }

      if (!response?.ads?.id) throw new Error('Error saving ads');

      this.ads = response?.ads;
      this.isNewAds = false;

      this.snackBarService.showNotificationMassage(
        this.isNewAds ? 'Anúncio criado com sucesso!' : 'Anúncio atualizado com sucesso!',
        'snackbarSuccess'
      );

      setTimeout(() => {
        this.routerLink.navigate(['/meus-anuncios']);
      }, 1000);

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
