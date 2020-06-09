import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TableFormComponent } from "./table-form.component";
import { of } from "rxjs";
import { Course } from "../shared/course.model";
import { MatDialogRef } from "@angular/material/dialog";
import { CourseService } from "../shared/course.service";
import { NgForm, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

class MockCourseService {
  formData: Course = {
    id: 1,
    description: "String",
    creator: "String",
    skill: "hhj",
    prerequisite: "String",
    lastupdated: "String",
  };

  updateCourse(formData: Course) {
    return of(["some"]);
  }

  postCourse() {
    return of(["some"]);
  }

  getCourses() {
    return of(["some"]);
  }

  deleteCourse(id: number) {
    return of(["some"]);
  }

  refreshList() {
    return of(["some"]);
  }
}

const form = <NgForm>{
  value: {
    id: 1,
    description: "String",
    creator: "String",
    skill: "hhj",
    prerequisite: "String",
    lastupdated: "String",
  },
  resetForm: () => {},
};

const form_1 = <NgForm>{
  value: {
    id: null,
    description: "String",
    creator: "String",
    skill: "hhj",
    prerequisite: "String",
    lastupdated: "String",
  },
  resetForm: () => {},
};

class MockToastrService {
  error() {}
  warning() {}
  success() {}
  info() {}
}

class MockDialogRef {
  close() {}
}

fdescribe("TableFormComponent", () => {
  let component: TableFormComponent;
  let fixture: ComponentFixture<TableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableFormComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: CourseService, useClass: MockCourseService },
        {
          provide: ToastrService,
          useClass: MockToastrService,
        },
        { provide: MatDialogRef, useClass: MockDialogRef },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should call onSubmit  with non null id", () => {
    expect(component.onSubmit(form));
  });

  it("should call onSubmit with null id", () => {
    expect(component.onSubmit(form_1));
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
