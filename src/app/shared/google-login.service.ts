import { Injectable } from "@angular/core";
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AuthService,
  SocialUser,
} from "angularx-social-login";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class GoogleLoginService {
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authservice: AuthService, private router: Router) {}

  signInWithGoogle(): void {
    this.authservice.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      this.user = res;
      this.loggedIn = true;
      this.router.navigate(["/course"]);
    });
  }

  logout() {
    console.log("in logout");
    this.loggedIn = false;
    this.router.navigate([""]);
  }

  signOut(): void {
    this.authservice.signOut().then((res) => {
      this.user = null;
      this.loggedIn = false;
    });
  }
}
