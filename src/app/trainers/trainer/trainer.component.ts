import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { TrainerService } from "../../shared/trainer.service";
@Component({
  selector: "app-trainer",
  templateUrl: "./trainer.component.html",
  styleUrls: ["./trainer.component.css"],
})
export class TrainerComponent implements OnInit {
  constructor(
    public trainerservice: TrainerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.trainerservice.formData = {
      id: null,
      name: "",
      type: "",
      gender: "",
      age: null,
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
    if (confirm("Are you sure you want to update the existing record ")) {
      this.trainerservice.updateCourse(form.value).subscribe((res) => {
        this.toastr.info("Updated Successfully", "Course Updation");
        this.resetForm(form);
        this.trainerservice.refreshList();
      });
    }
  }

  insertRecord(form: NgForm) {
    console.log(form.value);
    if (confirm("Are you sure you want to insert the record ")) {
      this.trainerservice.postCourse(form.value).subscribe((res) => {
        this.toastr.success("Inserted Successfully", "Course Insertion");
        this.resetForm(form);
        this.trainerservice.refreshList();
      });
    }
  }
}
