import { Component, OnInit } from "@angular/core";
import { TrainerService } from "../../shared/trainer.service";
import { Trainer } from "src/app/shared/trainer.model";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-trainer-list",
  templateUrl: "./trainer-list.component.html",
  styleUrls: ["./trainer-list.component.css"],
})
export class TrainerListComponent implements OnInit {
  constructor(
    public trainerservice: TrainerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.trainerservice.refreshList();
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
}
