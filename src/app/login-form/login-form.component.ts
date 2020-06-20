import { Component, OnInit } from "@angular/core";
import { customValidator } from "../validators/customvalidator";
import { GetRequestService } from "../services/get-request.service";
import { GoogleLoginService } from "../shared/google-login.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Form,
  Validators,
} from "@angular/forms";

import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AuthService,
  SocialUser,
} from "angularx-social-login";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private getService: GetRequestService,
    private googlelogin: GoogleLoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          customValidator(/password/),
          Validators.pattern(
            "(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}"
          ),
        ],
      ],
    });
  }

  loadApi() {
    this.loginForm.patchValue({
      username: "example.mail@domain.com",
      password: "Examplepass@123",
    });
  }

  loginService(form: any) {
    this.getService.checkEmail(form);
  }

  googleLogin() {
    this.googlelogin.signInWithGoogle();
  }

  googleLogout() {
    this.googlelogin.signOut();
  }
}
