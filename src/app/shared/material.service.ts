import { Injectable } from "@angular/core";

import {
  Material,
  MaterialForm,
  ResponseData,
  ResponseForm,
} from "../shared/material.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { GoogleLoginService } from "../shared/google-login.service";
import { Observable, from } from "rxjs";

import { HttpParams } from "@angular/common/http";

import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MaterialService {
  // myMaterial: MaterialForm;
  //  listMaterial: Material[];
  currentList: any[];

  //------------------------------
  responseData: ResponseData[];
  responseForm: ResponseForm;

  currentId: number;

  constructor(
    private http: HttpClient,
    private googlelogin: GoogleLoginService
  ) {}

  getVersion(id: number) {
    return this.http
      .get("http://localhost:8080/file/get/" + id)
      .toPromise()
      .then((res) => {
        this.currentList = res as any[];
      });
  }

  // getMaterial() {
  //   return this.http
  //     .get("http://localhost:8080/material/get/")
  //     .toPromise()
  //     .then((res) => {
  //       this.listMaterial = res as Material[];
  //     });
  // }

  // postMaterial() {
  //   console.log("Current user is ", this.googlelogin.currentUser);
  //   this.myMaterial.creator = this.googlelogin.currentUser;
  //   return this.http.post(
  //     "http://localhost:8080/material/post/",
  //     this.myMaterial
  //   );
  // }

  getResponseData() {
    return this.http
      .get("http://localhost:8080/file/getall/")
      .toPromise()
      .then((res) => {
        this.responseData = res as ResponseData[];
      });
  }

  downloadFile(url: string) {
    this.http.get(url, { responseType: "blob" }).subscribe((res) => {
      window.open(window.URL.createObjectURL(res));
    });
  }

  /// Change name to upload
  postForm(form: any): Observable<any> {
    let params = new HttpParams();

    var fd = new FormData();
    console.log("file is ", this.responseForm.file);
    fd.append("file", this.responseForm.file, this.responseForm.file.name);
    fd.append("description", this.responseForm.description);
    fd.append("creator", this.googlelogin.currentUser);

    console.log(fd);

    return this.http
      .post("http://localhost:8080/file/uploadFile", fd, {
        reportProgress: true,
        observe: "events",
      })
      .pipe(catchError(this.errorMgmt));
  }

  deleteFile(id: number) {
    if (!this.googlelogin.superUser) {
      this.googlelogin.checkSuperUser();
      return;
    }
    return this.http.delete("http://localhost:8080/file/delete/" + id);
  }

  updateFile() {
    if (!this.googlelogin.superUser) {
      this.googlelogin.checkSuperUser();
      return;
    }
    var fd = new FormData();
    console.log("file is ", this.responseForm.file);
    fd.append("file", this.responseForm.file, this.responseForm.file.name);
    fd.append("description", this.responseForm.description);
    fd.append("creator", this.googlelogin.currentUser);
    fd.append("rid", this.currentId.toString());
    return this.http
      .post("http://localhost:8080/file/updateFile", fd, {
        reportProgress: true,
        observe: "events",
      })
      .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  downloadFileVersion(url: string) {
    this.http.get(url, { responseType: "blob" }).subscribe((res) => {
      window.open(window.URL.createObjectURL(res));
    });
  }
}
