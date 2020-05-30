import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../shared/course.service";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  constructor(
    public courseservice: CourseService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.courseservice.formData = {
      id: null,
      description: "",
      creator: "",
      skill: "",
      prerequisite: "",
      lastupdated: null,
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
    if (confirm("Are you sure you want to update the existing record ")) {
      this.courseservice.updateCourse(form.value).subscribe((res) => {
        this.toastr.info("Updated Successfully", "Course Updation");
        this.resetForm(form);
        this.courseservice.refreshList();
      });
    }
  }

  insertRecord(form: NgForm) {
    console.log(form.value);
    if (confirm("Are you sure you want to insert the record ")) {
      this.courseservice.postCourse(form.value).subscribe((res) => {
        this.toastr.success("Inserted Successfully", "Course Insertion");
        this.resetForm(form);
        this.courseservice.refreshList();
      });
    }
  }
}
