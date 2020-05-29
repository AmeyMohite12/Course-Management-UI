import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { GoogleLoginService } from "../shared/google-login.service";
@Injectable({
  providedIn: "root",
})
export class GetRequestService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private googlelogin: GoogleLoginService
  ) {}

  getRequest(mail: any) {
    console.log("in service", mail);
    if (mail === "example.mail@domain.com") {
      this.googlelogin.loggedIn = true;
      this.router.navigate(["user"]);
    }
  }

  getData() {
    return this.http.get("http://localhost:8080/course/get");
  }
}
