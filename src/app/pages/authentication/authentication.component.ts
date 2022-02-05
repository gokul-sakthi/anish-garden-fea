import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmitRegisterForm(registerForm: NgForm) {
    console.log(registerForm);
    this.authService.registerUser(registerForm.value).subscribe(
      (response: any) => {
        if (response.message === 'Error in registration') {
          this.alertService.failureMessage(
            'Something went wrong please try after some time',
            'Error in Registration'
          );
          registerForm.reset('password');
          registerForm.reset('confirmpassword');
        } else if (response.message === 'User already exists, Please sign in') {
          this.alertService.warningMessage(
            'User already exists, Please sign in',
            'Already signed up'
          );
          registerForm.resetForm();
        } else if (response.message === 'Registration Successful') {
          this.alertService.successMessage(
            'Please proceed to login',
            'Registration Successful'
          );
          registerForm.resetForm();
        }
      },
      (err) => {
        this.alertService.failureMessage(
          'Something went wrong',
          'Unknown Error'
        );
        registerForm.reset('password');
        registerForm.reset('confirmpassword');
      }
    );
  }

  onSubmitLoginForm(loginForm: NgForm) {
    this.authService.loginUser(loginForm.value).subscribe(
      (response: any) => {
        if (response.info.message === 'Incorrect Credentials') {
          this.alertService.failureMessage(
            'Please enter valid credentials',
            'Incorrect Credentials'
          );
          loginForm.reset('loginPassword');
        } else if (response.info.message === 'No user found') {
          this.alertService.warningMessage(
            "You don't have an account, Please Sign up",
            'User unavailable'
          );
          loginForm.reset('loginPassword');
        } else if (response.info.message === 'Login Successful') {
          this.alertService.successMessage(
            'You have successfully logged in',
            'Login Successful'
          );
          this.authService.isLoggedIn.next(true);
          this.authService.userId.next(response.userId);
          this.router.navigate(['/']);
        }
      },
      (err) => {
        this.alertService.failureMessage(
          'Something went wrong',
          'Unknown Error'
        );
        loginForm.reset('loginPassword');
      }
    );
  }

  showSuccess() {
    this.alertService.successMessage('This is a test message', 'Im a tester');
  }
}
