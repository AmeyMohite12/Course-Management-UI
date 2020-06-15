import { Component, OnInit } from "@angular/core";
import { TrainerService } from "../../shared/trainer.service";
import { Trainer } from "src/app/shared/trainer.model";
import { ToastrService } from "ngx-toastr";

import { MatDialog } from "@angular/material/dialog";
import { ViewTrainerComponent } from "../view-trainer/view-trainer.component";
import { Course } from "src/app/shared/course.model";

@Component({
  selector: "app-trainer-list",
  templateUrl: "./trainer-list.component.html",
  styleUrls: ["./trainer-list.component.css"],
})
export class TrainerListComponent implements OnInit {
  searchTerm: any;

  config: any;

  isLoaded: boolean;

  constructor(
    public trainerservice: TrainerService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  rowData: Trainer[];
  ngOnInit(): void {
    this.isLoaded = false;
    this.trainerservice.refreshList().then(() => {
      this.rowData = this.trainerservice.list;
      this.isLoaded = true;
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.trainerservice.list.length,
      };
    });
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }

  populateForm(trainer: Trainer) {
    console.log(trainer);
    this.trainerservice.formData = Object.assign({}, trainer);
  }

  deleteRecord(id: number) {
    if (confirm("Are you sure you want to delete the record ")) {
      this.trainerservice.deleteCourse(id).subscribe((res) => {
        this.toastr.warning("Deleted Successfully", "Course Updation");
        this.trainerservice.refreshList();
      });
    }
  }

  getCourses(id: number) {
    this.trainerservice.getTrainerCourse(id).subscribe((res) => {
      console.log(res);
      this.trainerservice.course = res as Course[];
      this.trainerservice.currentTrainer = id;

      this.dialog.open(ViewTrainerComponent, {
        height: "900px",
        width: "900px",
        autoFocus: false,
      });
    });
  }
}
