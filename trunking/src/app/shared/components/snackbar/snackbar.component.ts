import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";

export type SnackbarType = "success" | "error";

export interface SnackBarData {
  message: string;
  snackbarType?: SnackbarType;
  action?: string;
}

@Component({
  selector: "app-snackbar",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: "./snackbar.component.html",
  styleUrl: "./snackbar.component.scss"
})
export class SnackBarComponent {
  snackBarRef!: MatSnackBarRef<SnackBarComponent>;
  isError: boolean;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {
    this.isError = this.data.snackbarType === "error";
  }

  dimiss(): void {
    this.snackBarRef.dismissWithAction();
  }
}
