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
  currentUser: string;
  currentUserName: String;

  superUser: boolean;

  checkStatus() {
    return this.superUser;
  }

  constructor(private authservice: AuthService, private router: Router) {}

  signInWithGoogle(): void {
    this.authservice.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      this.user = res;
      this.loggedIn = true;
      this.currentUser = this.user.email;
      this.currentUserName = this.user.firstName;
      this.router.navigate(["/Welcome"]);
      this.superUser = false;
    });
  }

  logout() {
    this.loggedIn = false;
    this.superUser = false;

    this.router.navigate([""]);
  }

  signOut(): void {
    this.authservice.signOut().then((res) => {
      this.user = null;
      this.loggedIn = false;
      this.superUser = false;
    });
  }

  checkSuperUser() {
    if (this.superUser) {
      return;
    }
    this.router.navigate(["NotFound"]);
  }
}
