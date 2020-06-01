import { Component, OnInit } from "@angular/core";
import { MaterialService } from "../shared/material.service";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { MaterialFormComponent } from "../material-form/material-form.component";
import { MaterialVersionComponent } from "../material-version/material-version.component";
@Component({
  selector: "app-material-list",
  templateUrl: "./material-list.component.html",
  styleUrls: ["./material-list.component.css"],
})
export class MaterialListComponent implements OnInit {
  constructor(
    public materialservice: MaterialService,
    private dialog: MatDialog
  ) {}
  flg: boolean;
  ngOnInit(): void {
    this.materialservice.getMaterial();
  }

  getVersion(id: number) {
    this.flg = false;
    this.materialservice.getVersion(id).then(() => {
      this.flg = true;
      const dialogconfig = new MatDialogConfig();
      dialogconfig.autoFocus = true;
      dialogconfig.width = "80%";
      dialogconfig.height = "80%";
      this.dialog.open(MaterialVersionComponent, dialogconfig);
    });
  }
  postMaterial() {
    const dialogconfig = new MatDialogConfig();
    dialogconfig.autoFocus = true;
    dialogconfig.width = "50%";
    dialogconfig.height = "50%";
    this.dialog.open(MaterialFormComponent, dialogconfig);
  }
}
