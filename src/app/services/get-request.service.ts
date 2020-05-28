import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class GetRequestService {
  constructor(private router: Router, private http: HttpClient) {}

  getRequest(mail: any) {
    console.log("in service", mail);
    if (mail === "example.mail@domain.com") {
      console.log("is equal");
      this.router.navigate(["user"]);
      localStorage.setItem("key", "1");
    }
  }

  getData(url: string) {
    return this.http.get("http://localhost:8080/person/get");
  }
}
