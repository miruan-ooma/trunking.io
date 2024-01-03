import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loading$ = new BehaviorSubject<boolean>(false);
  loginForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  submit() {}

  ngOnInit(): void {
    this.createForm();
  }


  get errorEmailMessage() {
    if (this.loginForm.get('Email')?.hasError('required')) {
      return 'Username is required';
    }

    return '';
  }

  get errorPasswordMessage() {
    if (this.loginForm.get('Password')?.hasError('required')) {
      return 'Password is required';
    }

    return '';
  }


  private createForm() {
    this.loginForm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }
}
