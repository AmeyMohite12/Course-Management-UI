import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class GetRequestService {
  constructor(private router: Router) {}

  getRequest(mail: any) {
    console.log("in service", mail);
    if (mail === "example.mail@domain.com") {
      console.log("is equal");
      this.router.navigate(["user"]);
    }
  }
}
