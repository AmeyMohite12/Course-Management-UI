import { Injectable } from "@angular/core";
import { Course } from "./course.model";
import { HttpClient } from "@angular/common/http";

import { GoogleLoginService } from "../shared/google-login.service";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  formData: Course;

  list: Course[];
  constructor(
    private http: HttpClient,
    private googleloginservice: GoogleLoginService
  ) {}

  postCourse(formData: Course) {
    return this.http.post("http://localhost:8080/course/post", formData);
  }
  getCourses() {
    return this.http.get("http://localhost:8080/course/get");
  }

  updateCourse(formData: Course) {
    if (!this.googleloginservice.superUser) {
      this.googleloginservice.checkSuperUser();
      return;
    }
    return this.http.put(
      "http://localhost:8080/course/update/" + formData.id,
      formData
    );
  }

  deleteCourse(id: number) {
    if (!this.googleloginservice.superUser) {
      this.googleloginservice.checkSuperUser();
      return;
    }

    return this.http.delete("http://localhost:8080/course/delete/" + id);
  }

  refreshList() {
    console.log(this.formData.lastupdated);

    return this.http
      .get("http://localhost:8080/course/get")
      .toPromise()
      .then((res) => {
        this.list = res as Course[];
      });
  }
}
