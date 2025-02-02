import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css',
})
export class HomeScreenComponent implements OnInit {
  constructor(private authService: AuthService) {}

  async ngOnInit() {
    const credentials = await this.authService.getCredentials();

    if (credentials) {
      this.authService.logout();
    }
  }
}
