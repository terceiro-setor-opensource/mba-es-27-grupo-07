import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css'
})

export class ForgotPasswordPageComponent {
  forgotForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
};
