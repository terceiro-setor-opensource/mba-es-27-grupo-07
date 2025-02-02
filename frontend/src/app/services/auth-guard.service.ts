import { SnackBarService } from './snack-bar.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      take(1),
      map((user) => {
        if (user) return true;

        this.router.navigate(['/']);
        this.snackBarService.showNotificationMassage(
          'Usuário não autenticado. Por favor, faça login.',
          'snackbarError'
        );

        return false;
      })
    );
  }
}
