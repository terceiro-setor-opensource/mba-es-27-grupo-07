import { Component } from '@angular/core';

@Component({
  selector: 'app-ads-page',
  templateUrl: './ads-page.component.html',
  styleUrl: './ads-page.component.css'
})
export class AdsPageComponent {

  openWhatsApp() {
    window.open('https://web.whatsapp.com/', '_blank');
  }
}