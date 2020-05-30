import { Injectable } from "@angular/core";
import { Course } from "./course.model";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class CourseService {
  formData: Course;

  list: Course[];
  constructor(private http: HttpClient) {}

  postCourse(formData: Course) {
    return this.http.post("http://localhost:8080/course/post", formData);
  }
  getCourses() {
    return this.http.get("http://localhost:8080/course/get");
  }

  updateCourse(formData: Course) {
    return this.http.put(
      "http://localhost:8080/course/update/" + formData.id,
      formData
    );
  }

  deleteCourse(id: number) {
    return this.http.delete("http://localhost:8080/course/delete/" + id);
  }

  refreshList() {
    return this.http
      .get("http://localhost:8080/course/get")
      .toPromise()
      .then((res) => {
        this.list = res as Course[];
      });
  }
}
