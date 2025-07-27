import { Component, inject } from '@angular/core';
import { IFormGroup, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { LoginInterface } from '../../models/login.model';
import { LoginService } from '../../services/login.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: IFormGroup<LoginInterface>;
  private fb = inject(RxFormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  isLoggingIn: boolean = false;
  hasError: boolean = false;
  errorMessage: string = '';
  loggedInMessage: string = '';
  hidePassword: boolean = true;
  currentUser: User | null = null;

  constructor() {
    this.loginForm = this.fb.formGroup<LoginInterface>(
      new LoginInterface()
    ) as IFormGroup<LoginInterface>;
  }

  login() {
    if (this.loginForm.valid) {
      let form = this.loginForm.value;
      this.hasError = false;
      this.isLoggingIn = true;
      this.loginService
        .login(form)
        .pipe(
          tap((user) => {
            this.isLoggingIn = false;
            if (user) {
              this.hasError = false;
              this.router.navigate(['/home']);
            } else {
              this.hasError = true;
              this.errorMessage = "You don't have an account. Please check your email and password.";
              this.loggedInMessage = '';
            }
          }),
          catchError((error) => {
            this.isLoggingIn = false;
            this.hasError = true;
            this.errorMessage = 'Login failed: ' + error.message;
            this.loggedInMessage = '';
            return EMPTY;
          })
        )
        .subscribe();
    }
  }
}
