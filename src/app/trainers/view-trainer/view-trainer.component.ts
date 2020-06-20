import { Component, OnInit } from "@angular/core";

import { TrainerService } from "../../shared/trainer.service";

import { CourseService } from "../../shared/course.service";
import { ToastrService } from "ngx-toastr";
import { FormControl, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { Course } from "../../shared/course.model";

@Component({
  selector: "app-view-trainer",
  templateUrl: "./view-trainer.component.html",
  styleUrls: ["./view-trainer.component.css"],
})
export class ViewTrainerComponent implements OnInit {
  courseList: Course[];
  filteredOptions: Observable<Course[]>;
  myControl = new FormControl("", Validators.required);

  constructor(
    public trainerservice: TrainerService,
    public dialogref: MatDialogRef<ViewTrainerComponent>,
    private toastr: ToastrService,
    private courserservice: CourseService
  ) {}

  ngOnInit(): void {
    this.courserservice.getCourses().subscribe((res) => {
      this.courseList = res as Course[];
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        map((value) => (typeof value === "string" ? value : value.description)),
        map((name) => (name ? this._filter(name) : this.courseList.slice()))
      );
    });
  }

  displayFn(course: Course): String {
    return course && course.description ? course.description : "";
  }

  private _filter(name: string): Course[] {
    const filterValue = name.toLowerCase();
    return this.courseList.filter(
      (option) => option.description.toLowerCase().indexOf(filterValue) === 0
    );
  }

  assignCourse(form: any) {
    this.trainerservice
      .assignCourse(this.myControl.value.id)
      .subscribe((res: any) => {
        if (res != null) {
          if (res.courseid === -1) {
            this.toastr.error("Course has already been assigned", "Trainer");
          } else
            this.toastr.warning("Trainer Assigned Successfully", "Trainer");
        } else {
          this.toastr.error("Please Enter a valid course-id", "Trainer");
        }
        this.dialogref.close();
      });
  }

  unAssignCourse(id: number) {
    this.trainerservice.unAssignCourse(id).subscribe((res) => {
      this.toastr.success("Course unassigned Successfully", "Trainer");
      this.dialogref.close();
    });
  }

  close() {
    this.dialogref.close();
  }
}
