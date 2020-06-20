import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { MatSort } from "@angular/material/sort";
import { HttpClient } from "@angular/common/http";
import { DataSource } from "@angular/cdk/table";
import { templateJitUrl } from "@angular/compiler";
import { map } from "rxjs/operators";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { TemplateRef } from "@angular/core";
import { CourseService } from "../shared/course.service";
import { NgForm } from "@angular/forms";

import { Course } from "src/app/shared/course.model";

import { ToastrService } from "ngx-toastr";
import { TableFormComponent } from "../table-form/table-form.component";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  constructor(
    private toastr: ToastrService,

    public courseservice: CourseService,
    private dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    "id",
    "creator",
    "description",
    "prerequisite",
    "skill",
    "lastupdated",
    "deleteRecord",
  ];
  dataSource = new MatTableDataSource();
  checkData: any;

  ngOnInit(): void {
    this.courseservice.getCourses().subscribe((res) => {
      this.checkData = res;
      this.dataSource.data = this.checkData;
    });
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyfilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  deleteRecord(id: number) {
    if (confirm("Are you sure you want to delete the existing record ")) {
      this.courseservice.deleteCourse(id).subscribe((res) => {
        this.courseservice.refreshList();
        this.courseservice.getCourses().subscribe((res) => {
          this.checkData = res;
          this.dataSource.data = this.checkData;
          this.toastr.warning("Deleted Successfully", "Course");
        });
      });
    }
  }

  populateForm(course: Course) {
    this.dialog.open(TableFormComponent, {
      height: "700px",
      width: "700px",
      autoFocus: true,
    });
    alert("Form has been populated with fields do required changes and submit");
    this.courseservice.formData = Object.assign({}, course);
  }

  postCourseForm() {
    this.courseservice.formData = {
      id: null,
      description: "",
      creator: "",
      skill: "",
      prerequisite: "",
      lastupdated: null,
    };

    this.dialog.open(TableFormComponent, {
      height: "700px",
      width: "700px",
      autoFocus: true,
    });
  }
}
