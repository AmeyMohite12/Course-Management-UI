import { Component, OnInit } from "@angular/core";
import { MaterialService } from "../shared/material.service";
@Component({
  selector: "app-material-list",
  templateUrl: "./material-list.component.html",
  styleUrls: ["./material-list.component.css"],
})
export class MaterialListComponent implements OnInit {
  constructor(public materialservice: MaterialService) {}
  flg: boolean;
  ngOnInit(): void {
    this.materialservice.getMaterial();
  }

  getVersion(id: number) {
    this.flg = false;
    this.materialservice.getVersion(id).then(() => {
      this.flg = true;
    });
  }
}
