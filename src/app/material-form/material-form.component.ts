import { Component, OnInit } from "@angular/core";

import { MaterialService } from "../shared/material.service";
import { ThrowStmt } from "@angular/compiler";

import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-material-form",
  templateUrl: "./material-form.component.html",
  styleUrls: ["./material-form.component.css"],
})
export class MaterialFormComponent implements OnInit {
  constructor(
    public materialservice: MaterialService,
    public dialogref: MatDialogRef<MaterialFormComponent>
  ) {}

  ngOnInit(): void {
    this.resetForm(null);
  }

  resetForm(form) {
    console.log("Here");
    if (form != null) {
      form.resetForm();
      return;
    }
    this.materialservice.myMaterial = {
      id: null,
      lastupdated: null,
      creator: "",
      name: "",
    };
  }

  onSubmit(form: any) {
    console.log(form.value.name);
    console.log("I am in submission");
    this.materialservice.postMaterial().subscribe((res) => {
      this.materialservice.getMaterial();
      this.resetForm(form);
      this.onClose();
    });
  }

  onClose() {
    this.dialogref.close();
  }
  closeBox() {
    this.dialogref.close();
  }
}
