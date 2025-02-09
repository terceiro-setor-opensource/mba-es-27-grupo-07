import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SnackBarService } from './../../services/snack-bar.service';
import { IUser } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';
import { validateFormGroup } from 'src/app/utils';

@Component({
  selector: 'app-new-account-page',
  templateUrl: './new-account-page.component.html',
  styleUrl: './new-account-page.component.css',
})
export class NewAccountPageComponent {
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[1-9]{2}9[0-9]{8}$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}'),
    ]),
    block: new FormControl('', [Validators.required]),
    apartment: new FormControl('', [Validators.required]),
  });
  isPasswordVisible: boolean = false;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async save() {
    try {
      const isValidForm = validateFormGroup(this.userForm);

      if (!isValidForm) {
        this.snackBarService.showNotificationMassage(
          'Preencha o formulário corretamente!',
          'snackbarError'
        );

        return;
      }

      this.isLoading = true;

      const user: IUser = {
        name: this.userForm.get('name')?.value,
        email: this.userForm.get('email')?.value,
        phone: this.userForm.get('phone')?.value,
        password: this.userForm.get('password')?.value,
        address: {
          block: this.userForm.get('block')?.value,
          apartment: this.userForm.get('apartment')?.value,
        },
      };

      await this.userService.create(user);

      this.snackBarService.showNotificationMassage(
        'Usuário criado. Faça login para continuar.',
        'snackbarSuccess'
      );

      this.router.navigate(['/login']);
    } catch (error: any) {
      this.snackBarService.showNotificationMassage(
        'Erro ao criar usuário. Tentar novamente.',
        'snackbarError'
      );
    } finally {
      this.isLoading = false;
    }
  }
}
