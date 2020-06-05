import { Component, OnInit } from "@angular/core";

import { TrainerService } from "../../shared/trainer.service";
import { ToastrService } from "ngx-toastr";
import { FormControl } from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-view-trainer",
  templateUrl: "./view-trainer.component.html",
  styleUrls: ["./view-trainer.component.css"],
})
export class ViewTrainerComponent implements OnInit {
  constructor(
    public trainerservice: TrainerService,
    public dialogref: MatDialogRef<ViewTrainerComponent>,
    private toastr: ToastrService
  ) {}

  myControl = new FormControl();
  options: any[] = [
    { name: "hi" },
    { name: "hi" },
    { name: "hi" },
    { name: "hi" },
    { name: "hi" },
    { name: "hi" },
    { name: "hi" },
    { name: "hi" },
  ];
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  assignCourse(form: any) {
    this.trainerservice.assignCourse(form).subscribe((res) => {
      if (res != null) {
        this.toastr.warning("Trainer Assigned Successfully", "Trainer");
      } else {
        this.toastr.error("Please Enter a valid course-id", "Trainer");
      }
      this.dialogref.close();
    });
  }

  unAssignCourse(id: number) {
    this.trainerservice.unAssignCourse(id).subscribe((res) => {
      console.log(id);
      this.toastr.success("Course unassigned Successfully", "Trainer");
      this.dialogref.close();
    });
  }

  recordMe() {
    console.log("hello");
    console.log(this.myControl);
  }
}
