import { Component, OnInit } from "@angular/core";

import { MaterialService } from "../shared/material.service";

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

    this.materialservice.responseForm = {
      creator: "yep",
      description: "nope",
      file: null,
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

  submitForm(form: any) {
    console.log(form.value.file);
    console.log(form.value.description);
    this.materialservice.postForm(form);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.materialservice.responseForm.file = event.target.files[0];
    }
  }
}
