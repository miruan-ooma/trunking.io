import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from "@angular/material/snack-bar";
import { SnackBarComponent } from "./snackbar/snackbar.component";

export type SnackbarType = "success" | "error";

@Injectable({ providedIn: "root" })
export class SnackbarService {
  snackbarRef: MatSnackBarRef<SnackBarComponent> | undefined;
  constructor(private snackbar: MatSnackBar) {}

  openSnackBar(
    message: string,
    snackbarType: SnackbarType,
    action?: string,
    options: MatSnackBarConfig = {}
  ): MatSnackBarRef<SnackBarComponent> {
    this.snackbarRef = this.snackbar.openFromComponent(
      SnackBarComponent,
      Object.assign(
        {
          duration: 5000,
          verticalPosition: "top",
          panelClass: ["mat-typography"],
          data: { message, snackbarType, action }
        },
        options
      )
    );
    this.snackbarRef.instance.snackBarRef = this.snackbarRef;
    return this.snackbarRef;
  }

  dismiss(): void {
    this.snackbarRef && this.snackbarRef.dismiss();
  }
}
