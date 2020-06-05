import { Injectable } from "@angular/core";
import { Trainer } from "./trainer.model";
import { HttpClient } from "@angular/common/http";
import { Course } from "./course.model";
import { ConstantPool } from "@angular/compiler";
import { ToastrComponentlessModule } from "ngx-toastr";
import { GoogleLoginService } from "../shared/google-login.service";
@Injectable({
  providedIn: "root",
})
export class TrainerService {
  formData: Trainer;

  trainer_course_mapping: any[];

  currentTrainer: number;

  course: Course[];

  list: Trainer[];
  constructor(
    private http: HttpClient,
    private googleloginservice: GoogleLoginService
  ) {}

  getTrainerCourseMapping() {
    return this.http.get(
      "http://localhost:8080/trainer_course/trainer_course_count"
    );
  }

  postCourse(formData: Trainer) {
    return this.http.post("http://localhost:8080/trainer/post", formData);
  }
  getCourses() {
    return this.http.get("http://localhost:8080/trainer/get");
  }

  getTrainerCourse(id: number) {
    this.http
      .get("http://localhost:8080/trainer_course/trainer/get/" + id)
      .subscribe((res) => {
        console.log(res);
        this.course = res as Course[];
      });
  }

  updateCourse(formData: Trainer) {
    if (!this.googleloginservice.superUser) {
      this.googleloginservice.checkSuperUser();
      return;
    }
    return this.http.post(
      "http://localhost:8080/trainer/update/" + formData.id,
      formData
    );
  }

  deleteCourse(id: number) {
    if (!this.googleloginservice.superUser) {
      this.googleloginservice.checkSuperUser();
      return;
    }
    return this.http.delete("http://localhost:8080/trainer/delete/" + id);
  }

  refreshList() {
    return this.http
      .get("http://localhost:8080/trainer/get")
      .toPromise()
      .then((res) => {
        this.list = res as Trainer[];
      });
  }

  assignCourse(id: number) {
    return this.http.post(
      "http://localhost:8080/trainer_course/post/" +
        this.currentTrainer +
        "/" +
        id,
      null
    );
  }

  unAssignCourse(id: number) {
    return this.http.delete(
      "http://localhost:8080/trainer_course/delete/" +
        this.currentTrainer +
        "/" +
        id
    );
  }
}
