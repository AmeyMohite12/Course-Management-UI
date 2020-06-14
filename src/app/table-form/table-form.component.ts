import { Component, OnInit } from "@angular/core";

import { CourseService } from "../shared/course.service";
import { NgForm } from "@angular/forms";

import { Course } from "src/app/shared/course.model";

import { ToastrService } from "ngx-toastr";

import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-table-form",
  templateUrl: "./table-form.component.html",
  styleUrls: ["./table-form.component.css"],
})
export class TableFormComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    public dialogref: MatDialogRef<TableFormComponent>,
    public courseservice: CourseService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.value.id == null) {
      this.insertRecord(form);
    } else {
      console.log("In update", form.value.id);
      this.updateRecord(form);
    }
  }
  updateRecord(form: NgForm) {
    if (confirm("Are you sure you want to update the existing record ")) {
      this.courseservice.updateCourse(form.value).subscribe((res) => {
        this.courseservice.getCourses().subscribe((res) => {
          this.toastr.info("Updated Successfully", "Course");
          this.courseservice.refreshList();

          this.dialogref.close();
        });
      });
    }
  }

  onClose() {
    this.dialogref.close();
  }

  insertRecord(form: NgForm) {
    console.log(form.value);
    if (confirm("Are you sure you want to insert the record ")) {
      this.courseservice.postCourse(form.value).subscribe((res) => {
        this.courseservice.getCourses().subscribe((res) => {
          this.toastr.success("Inserted Successfully", "Course");
          this.courseservice.refreshList();
          this.dialogref.close();
        });
      });
    }
  }
}
