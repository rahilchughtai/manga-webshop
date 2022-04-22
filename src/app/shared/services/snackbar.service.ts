import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackbar: MatSnackBar) {}

  openSnackBar(
    message: string,
    styleClass: string = 'snackbar-success',
    action: string = 'Okay',
    duration: number = 1000
  ) {
    this._snackbar.open(message, action, {
      panelClass: [styleClass],
      duration,
    });
  }
}
