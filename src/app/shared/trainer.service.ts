import { Injectable } from "@angular/core";
import { Trainer } from "./trainer.model";
import { HttpClient } from "@angular/common/http";
import { Course } from "./course.model";

@Injectable({
  providedIn: "root",
})
export class TrainerService {
  formData: Trainer;

  course: Course[];

  list: Trainer[];
  constructor(private http: HttpClient) {}

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
        this.course = res as Course[];
      });
  }

  updateCourse(formData: Trainer) {
    return this.http.post(
      "http://localhost:8080/trainer/update/" + formData.id,
      formData
    );
  }

  deleteCourse(id: number) {
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
}
