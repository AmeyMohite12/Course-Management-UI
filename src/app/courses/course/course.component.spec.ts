import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CourseComponent } from "./course.component";

import { CourseService } from "../../shared/course.service";

import { ToastrService } from "ngx-toastr";
import { ReactiveFormsModule, FormsModule, NgForm } from "@angular/forms";

import { of } from "rxjs";
import { Course } from "src/app/shared/course.model";

const CourseInfo = {
  id: 1,
  description: "h",
  creator: "String",
  skill: "String",
  prerequisite: "String",
  lastupdated: "String",
};

class MockCourseService {
  updateCourse(form: Course) {
    return of([]);
  }

  postCourse(form: Course) {
    return of([]);
  }
  refreshList() {}
}

class MockToastrService {
  info() {}
  success() {}
}
const testForm = <NgForm>{
  resetForm: () => null,

  value: {
    id: 1,
    description: "h",
    creator: "String",
    skill: "String",
    prerequisite: "String",
    lastupdated: "String",
  },
};

const testFormNull = <NgForm>{
  resetForm: () => null,

  value: {
    id: null,
    description: "h",
    creator: "String",
    skill: "String",
    prerequisite: "String",
    lastupdated: null,
  },
};
fdescribe("CourseComponent", () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: CourseService, useClass: MockCourseService },
        {
          provide: ToastrService,
          useClass: MockToastrService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create resetForm If path", () => {
    expect(component.resetForm(testForm));
  });

  it("call onSubmit() with non-null value", () => {
    component.onSubmit(testForm);
  });

  it("call onSubmit() with null value", () => {
    component.onSubmit(testFormNull);
  });
});
