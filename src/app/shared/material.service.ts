import { Injectable } from "@angular/core";
import { Material } from "../shared/material.model";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class MaterialService {
  myMaterial: Material;
  listMaterial: Material[];

  currentList: any[];

  constructor(private http: HttpClient) {}

  getVersion(id: number) {
    return this.http
      .get("http://localhost:8080/material/get/" + id)
      .toPromise()
      .then((res) => {
        this.currentList = res as any[];
      });
  }

  getMaterial() {
    return this.http
      .get("http://localhost:8080/material/get/")
      .toPromise()
      .then((res) => {
        this.listMaterial = res as Material[];
      });
  }
}
