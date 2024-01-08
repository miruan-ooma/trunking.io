import { Injectable } from "@angular/core";
import { ApiService } from "../api.service";
import { ApiAction } from "../api-actions";

@Injectable({
  providedIn: "root"
})
export class SendEmailService extends ApiService {
  sendResetPasswordEmail(email: string) {
    return this.makeRequest(
      ApiAction.SendPasswordResetEmail,
      {
        Username: email,
        Destination: "app",
        ByAdmin: false
      },
      { method: "POST" }
    );
  }
}
