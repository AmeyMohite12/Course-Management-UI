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
    //this.materialservice.getMaterial();
    this.materialservice.getResponseData();
  }

  getVersion(id: number) {
    this.flg = false;
    this.materialservice.getVersion(id).then(() => {
      this.flg = true;
      const dialogconfig = new MatDialogConfig();
      dialogconfig.autoFocus = true;
      dialogconfig.width = "100%";
      dialogconfig.height = "100%";
      this.dialog.open(MaterialVersionComponent, dialogconfig);
    });
  }
  postMaterial() {
    this.materialservice.currentId = null;
    const dialogconfig = new MatDialogConfig();

    this.dialog.open(MaterialFormComponent, {
      height: "700px",
      width: "700px",
      autoFocus: true,
    });
  }

  updateFile(id: number) {
    this.materialservice.currentId = id;

    this.dialog.open(MaterialFormComponent, {
      height: "700px",
      width: "700px",
      autoFocus: true,
    });
  }

  downloadfile(url: string) {
    this.materialservice.downloadFile(url);
  }
}
