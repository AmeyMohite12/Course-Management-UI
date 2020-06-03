import { Component, OnInit } from "@angular/core";

import { MaterialService } from "../shared/material.service";

import { MatDialogRef } from "@angular/material/dialog";
import { HttpEvent, HttpEventType } from "@angular/common/http";

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
  progress: number = 0;

  ngOnInit(): void {
    this.resetForm(null);
  }

  resetForm(form) {
    console.log("Here");
    if (form != null) {
      form.resetForm();
      return;
    }
    // this.materialservice.myMaterial = {
    //   id: null,
    //   lastupdated: null,
    //   creator: "",
    //   name: "",
    // };

    this.materialservice.responseForm = {
      creator: "",
      description: "",
      file: null,
    };
    console.log(
      "In form data loading of materialservice ",
      this.materialservice.responseForm
    );
  }

  // onSubmit(form: any) {
  //   console.log(form.value.name);
  //   console.log("I am in submission");
  //   this.materialservice.postMaterial().subscribe((res) => {
  //     this.materialservice.getMaterial();
  //     this.resetForm(form);
  //     this.onClose();
  //   });
  // }

  onClose() {
    this.dialogref.close();
  }
  closeBox() {
    this.dialogref.close();
  }

  submitForm(form: any) {
    if (this.materialservice.currentId != null) {
      /// update operation
      this.materialservice.updateFile().subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log("Request has been made!");
            break;
          case HttpEventType.ResponseHeader:
            console.log("Response header has been received!");
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log("User successfully created!", event.body);
            setTimeout(() => {
              this.progress = 0;
            }, 1500);
        }
      });
      return;
    }

    this.materialservice.postForm(form).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log("Request has been made!");
          break;
        case HttpEventType.ResponseHeader:
          console.log("Response header has been received!");
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round((event.loaded / event.total) * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log("User successfully created!", event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
      }
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.materialservice.responseForm.file = event.target.files[0];
    }
  }
}
