import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../../models/login.model';
import { validateFormGroup } from '../../utils';
import { SnackBarService } from '../../services/snack-bar.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  isPasswordVisible: boolean = false;
  isLoading: boolean = false;

  constructor(
    private snackBarService: SnackBarService,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const credentials = await this.authService.getCredentials();

    if (credentials) {
      this.authService.logout();
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async handleLogin() {
    try {
      const isValidForm = validateFormGroup(this.loginForm);

      if (!isValidForm) return;
      this.isLoading = true;

      const loginData: ILogin = {
        email: this.loginForm.get('login')?.value,
        password: this.loginForm.get('password')?.value,
      };

      await this.authService.login(loginData);

      this.snackBarService.showNotificationMassage(
        'Sucesso. Usuário autenticado!',
        'snackbarSuccess'
      );

      this.router.navigate(['/home']);
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        this.loginForm.get('password')?.setErrors({ invalidCredential: true });
      } else {
        this.snackBarService.showNotificationMassage(
          'Erro ao autenticar usuário. Por favor, tente novamente.',
          'snackbarError'
        );
      }
      console.error('Erro ao autenticar usuário:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
