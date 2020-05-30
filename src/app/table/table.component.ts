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

import { TemplateRef } from "@angular/core";
import { CourseService } from "../shared/course.service";
import { NgForm } from "@angular/forms";

import { Course } from "src/app/shared/course.model";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  constructor(private http: HttpClient, public courseservice: CourseService) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ["id", "creator", "description", "deleteRecord"];
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
    };
  }

  ngAfterViewInit() {
    console.log(this.dataSource.data, "In after");
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyfilter(filterValue: string) {
    console.log("in here");
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  deleteRecord(id: number) {
    this.courseservice.deleteCourse(id).subscribe((res) => {
      this.courseservice.refreshList();
      this.courseservice.getCourses().subscribe((res) => {
        this.checkData = res;
        this.dataSource.data = this.checkData;
      });
    });
  }

  updateRecord(form: NgForm) {
    this.courseservice.updateCourse(form.value).subscribe((res) => {
      this.resetForm(form);
      this.courseservice.refreshList();
      this.courseservice.getCourses().subscribe((res) => {
        this.checkData = res;
        this.dataSource.data = this.checkData;
      });
    });
  }
  insertRecord(form: NgForm) {
    console.log(form.value);
    this.courseservice.postCourse(form.value).subscribe((res) => {
      this.resetForm(form);
      this.courseservice.refreshList();
      this.courseservice.getCourses().subscribe((res) => {
        this.checkData = res;
        this.dataSource.data = this.checkData;
      });
    });
  }

  onSubmit(form: NgForm) {
    if (form.value.id == null) {
      this.insertRecord(form);
    } else {
      console.log("In update", form.value.id);
      this.updateRecord(form);
    }
  }

  populateForm(course: Course) {
    console.log(course);
    this.courseservice.formData = Object.assign({}, course);
  }
}
