import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { MatSort } from "@angular/material/sort";
import { HttpClient } from "@angular/common/http";
import { DataSource } from "@angular/cdk/table";
import { templateJitUrl } from "@angular/compiler";
import { map } from "rxjs/operators";
import { GetRequestService } from "../services/get-request.service";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
];

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private getservice: GetRequestService
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ["id", "username", "password"];
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource(ELEMENT_DATA);

  checkData: any;

  ngOnInit(): void {
    this.getservice.getData("abc").subscribe((res) => {
      this.checkData = res;
      this.dataSource.data = this.checkData;
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyfilter(filterValue: string) {
    console.log("in here");
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  clickme() {
    console.log(this.dataSource1);
  }
}
