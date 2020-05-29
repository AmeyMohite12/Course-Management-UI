import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { GoogleLoginService } from "../shared/google-login.service";
@Injectable({
  providedIn: "root",
})
export class AuthguardService implements CanActivate {
  constructor(private googleservice: GoogleLoginService) {}
  canActivate() {
    console.log(this.googleservice.loggedIn);
    if (this.googleservice.loggedIn) {
      return true;
    }
    return false;
  }
}
