import { Component, OnInit } from "@angular/core";

import { MaterialService } from "../shared/material.service";

import { MatDialogRef } from "@angular/material/dialog";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-material-form",
  templateUrl: "./material-form.component.html",
  styleUrls: ["./material-form.component.css"],
})
export class MaterialFormComponent implements OnInit {
  constructor(
    public materialservice: MaterialService,
    public dialogref: MatDialogRef<MaterialFormComponent>,
    private toastr: ToastrService
  ) {}
  progress: number = 0;

  ngOnInit(): void {
    this.resetForm(null);
  }

  resetForm(form: any) {
    console.log("Here");
    if (form != null) {
      form.resetForm();
      return;
    }

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

  onClose() {
    this.resetForm(null);
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
              this.dialogref.close();
              this.materialservice.getResponseData();

              this.toastr.info("Updated Successfully", "Assignment");
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
            this.toastr.success("Posted Successfully", "Assignment");
            this.materialservice.getResponseData();

            this.dialogref.close();
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
