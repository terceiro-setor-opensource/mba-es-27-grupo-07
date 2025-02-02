import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrl: './my-profile-page.component.css',
})
export class MyProfilePageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
