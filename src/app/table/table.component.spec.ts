import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TableComponent } from "./table.component";

import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import {
  NoopAnimationsModule,
  BrowserAnimationsModule,
} from "@angular/platform-browser/animations";
import { OverlayContainer } from "@angular/cdk/overlay";
import { By } from "@angular/platform-browser";

import { CourseService } from "../shared/course.service";
import { Course } from "src/app/shared/course.model";
import { ToastrService } from "ngx-toastr";

import { MatTableModule } from "@angular/material/table";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { of } from "rxjs";
import { FormsModule, ReactiveFormsModule, NgForm } from "@angular/forms";

class MockCourseService {
  formData: Course;

  getCourses() {
    return of([]);
  }

  deleteCourse(id: number) {
    return of([]);
  }

  refreshList() {
    return of([]);
  }
}

const courseInfo = {
  id: 1,
  description: "String",
  creator: "String",
  skill: "hhj",
  prerequisite: "String",
  lastupdated: "String",
};
class MockMatDialog {
  open() {
    return {
      afterClosed: () => of([]),
    };
  }
}
class MockToastrService {
  error() {}
  warning() {}
  success() {}
  info() {}
}

fdescribe("TableComponent", () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: CourseService, useClass: MockCourseService },
        {
          provide: ToastrService,
          useClass: MockToastrService,
        },
        {
          provide: MatDialog,
          useClass: MockMatDialog,
        },
      ],
    }).compileComponents();

    dialog = TestBed.get(MatDialog);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(" applyFilter check ", () => {
    expect(component.applyfilter("SomeString"));
  });

  it("DeleteRecord check", () => {
    expect(component.deleteRecord(1));
  });

  it("test populateForm", () => {
    component.populateForm(courseInfo);
  });

  it("test postCourseForm", () => {
    component.postCourseForm();
  });
});
