import { Injectable } from "@angular/core";
import { Material, MaterialForm } from "../shared/material.model";
import { HttpClient } from "@angular/common/http";

import { GoogleLoginService } from "../shared/google-login.service";
@Injectable({
  providedIn: "root",
})
export class MaterialService {
  myMaterial: MaterialForm;
  listMaterial: Material[];

  currentList: any[];

  constructor(
    private http: HttpClient,
    private googlelogin: GoogleLoginService
  ) {}

  getVersion(id: number) {
    return this.http
      .get("http://localhost:8080/material/get/" + id)
      .toPromise()
      .then((res) => {
        this.currentList = res as any[];
      });
  }

  getMaterial() {
    return this.http
      .get("http://localhost:8080/material/get/")
      .toPromise()
      .then((res) => {
        this.listMaterial = res as Material[];
      });
  }

  postMaterial() {
    console.log("Current user is ", this.googlelogin.currentUser);
    this.myMaterial.creator = this.googlelogin.currentUser;
    return this.http.post(
      "http://localhost:8080/material/post/",
      this.myMaterial
    );
  }
}
