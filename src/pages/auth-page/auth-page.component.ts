import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { apiService } from 'src/shared/api/swagger/swagger';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: []
})
export class AuthPageComponent implements OnInit, DoCheck {
  public user: { login: string; password: string  } = {
        login: "",
        password: "",
  };
  public isSignUp = false;
  public isDisabled = true;
  public isLoading = false;
  public mess: string | null = null;
  public err: string | null = null;

  srcLogo = '../../assets/images/mountain.png';

  constructor(private router: Router) {
  }

  ngDoCheck() {
    if (this.isDisabled && this.user.login && this.user.password) {
      this.isDisabled = false;
    }
  }

  ngOnInit(): void {
    this.isSignUp = false;
  }

  toSignUpForm() {
    this.isSignUp = true;

    this.user = {
      login: "",
      password: "",
    };
  }

  signUp() {
    this.isLoading = true;

    apiService.users
      .Create({ login: this.user.login, password: this.user.password })
      .then(
        (res: any) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.mess = 'вы успешно зарегистрировались!';
          setTimeout(() => {
            this.router.navigateByUrl('/');
            this.isLoading = false;
            this.mess = null;
          }, 1000);
        },
        () => {
          this.err = 'ошибка!!';

          setTimeout(() => {
            this.user = {
              login: "",
              password: "",
            };
            this.isLoading = false;
            this.err = null;
          }, 1000);
        }
      );
  }

  logIn() {
    this.isLoading = true;

    apiService.login
      .Login(this.user)
      .then(
        (res: any) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          setTimeout(() => {
            this.router.navigateByUrl('/');
            this.isLoading = false;
          }, 1000);
        },
        (err) => {
          this.err = err.message;

          setTimeout(() => {
            this.user = {
              login: "",
              password: "",
            };
            this.isLoading = false;
            this.err = null;
          }, 2000);
        }
      );
  }

  submit() {
    this.isSignUp ? this.signUp() : this.logIn();
  }
}
