import { Component, OnInit } from "@angular/core";
import { MaterialService } from "../shared/material.service";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-material-version",
  templateUrl: "./material-version.component.html",
  styleUrls: ["./material-version.component.css"],
})
export class MaterialVersionComponent implements OnInit {
  constructor(
    public materialservice: MaterialService,
    public dialogref: MatDialogRef<MaterialVersionComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.materialservice.currentList, " is here");
  }

  downloadFileVersion(url: string) {
    this.materialservice.downloadFileVersion(url);
  }
}
