import { Component, inject, signal } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { SendEmailService } from "../../../core/services/send-email.service";
import { views } from "../../../core/views";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.scss"
})
export class ForgotPasswordComponent {
  fb = inject(NonNullableFormBuilder);
  sendEmailService = inject(SendEmailService);
  forgotPasswordForm = this.fb.group({ email: ["", [Validators.required, Validators.email]] });
  showSuccessMessage = signal(false);
  views = views;

  get errorEmailMessage() {
    const emailForm = this.forgotPasswordForm.get("email");
    if (emailForm?.hasError("email")) {
      return "Email is not valid.";
    } else if (emailForm?.hasError("required")) {
      return "Email is required.";
    }
    return "";
  }

  submit() {
    if (this.forgotPasswordForm.valid) {
      const value = this.forgotPasswordForm.getRawValue();
      this.sendEmailService.sendResetPasswordEmail(value.email).subscribe({
        next: () => {
          this.showSuccessMessage.update(() => true);
        },
        error: error => console.error(error)
      });
    }
  }
}
