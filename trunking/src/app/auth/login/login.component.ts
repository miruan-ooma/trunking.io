import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth.service";
import { views } from "../../../core/views";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss"
})
export class LoginComponent implements OnInit {
  loading$ = new BehaviorSubject<boolean>(false);
  loginForm!: UntypedFormGroup;
  views = views;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService
  ) {}

  submit() {
    const value = this.loginForm.value;
    this.authService.login({
      Username: value.Email,
      Password: value.Password
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  get errorEmailMessage() {
    if (this.loginForm.get("Email")?.hasError("required")) {
      return "Username is required";
    }

    return "";
  }

  get errorPasswordMessage() {
    if (this.loginForm.get("Password")?.hasError("required")) {
      return "Password is required";
    }

    return "";
  }

  private createForm() {
    this.loginForm = this.fb.group({
      Email: ["", Validators.required],
      Password: ["", Validators.required]
    });
  }
}
