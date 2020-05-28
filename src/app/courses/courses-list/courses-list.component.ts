import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../shared/course.service";
import { Course } from "src/app/shared/course.model";
@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.css"],
})
export class CoursesListComponent implements OnInit {
  constructor(public courseservice: CourseService) {}

  ngOnInit(): void {
    this.courseservice.refreshList();
  }

  populateForm(course: Course) {
    console.log(course);
    this.courseservice.formData = Object.assign({}, course);
  }

  deleteRecord(id: number) {
    this.courseservice.deleteCourse(id).subscribe((res) => {
      this.courseservice.refreshList();
    });
  }
}
