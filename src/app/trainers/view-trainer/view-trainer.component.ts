import { Component, OnInit } from "@angular/core";

import { TrainerService } from "../../shared/trainer.service";
import { ToastrService } from "ngx-toastr";

import { MatDialogRef } from "@angular/material/dialog";

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

  ngOnInit(): void {}

  assignCourse(form: any) {
    this.trainerservice.assignCourse(form).subscribe((res) => {
      this.toastr.warning("Trainer Assigned Successfully", "Trainer");

      this.dialogref.close();
    });
  }
}
