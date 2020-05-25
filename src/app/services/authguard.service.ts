import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthguardService implements CanActivate {
  constructor() {}
  canActivate() {
    if (localStorage.getItem("key") === "1") {
      return true;
    }
    return false;
  }
}
