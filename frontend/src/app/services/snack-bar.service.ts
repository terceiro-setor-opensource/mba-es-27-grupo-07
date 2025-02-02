import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

type classSnackbar = 'snackbarSuccess' | 'snackbarError';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showNotificationMassage(
    msg: string,
    classSnackbar: classSnackbar,
    duration: number = 3000
  ): void {
    // classSnackbar: snackbarSuccess, snackbarError
    this.snackBar.open(msg, 'X', {
      duration: duration,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: [classSnackbar],
    });
  }
}
