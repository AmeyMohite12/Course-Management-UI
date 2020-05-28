import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../shared/course.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  constructor(public courseservice: CourseService) {}

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.courseservice.formData = {
      id: null,
      description: "",
      creator: "",
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.id == null) {
      this.insertRecord(form);
    } else {
      console.log("In update", form.value.id);
      this.updateRecord(form);
    }
  }

  updateRecord(form: NgForm) {
    /// TO DO: Write proper update function once PUT request is done in spring
    console.log("To be updated in back end");
    this.courseservice.updateCourse(form.value).subscribe((res) => {
      this.resetForm(form);
      this.courseservice.refreshList();
    });
  }

  insertRecord(form: NgForm) {
    console.log(form.value);
    this.courseservice.postCourse(form.value).subscribe((res) => {
      this.resetForm(form);
      this.courseservice.refreshList();
    });
  }
}
