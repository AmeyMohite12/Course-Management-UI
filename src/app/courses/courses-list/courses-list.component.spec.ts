import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CoursesListComponent } from "./courses-list.component";
import { CourseService } from "../../shared/course.service";

import { ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { Course } from "src/app/shared/course.model";
class MockCourseService {
  refreshList() {}
  deleteCourse(id: number) {
    return of([]);
  }
  formData: any;
}
const CourseInfo = {
  id: 1,
  description: "h",
  creator: "String",
  skill: "String",
  prerequisite: "String",
  lastupdated: "String",
};
class MockToastrService {
  info() {}
  success() {}
  warning() {}
}
fdescribe("CoursesListComponent", () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
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
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Call populate function ", () => {
    expect(component.populateForm(CourseInfo));
  });
  it("Call deleteFunction ", () => {
    expect(component.deleteRecord(1));
  });
});
