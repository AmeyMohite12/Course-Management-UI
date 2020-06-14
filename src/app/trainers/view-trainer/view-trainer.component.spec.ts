import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewTrainerComponent } from "./view-trainer.component";

import { TrainerService } from "../../shared/trainer.service";

import { CourseService } from "../../shared/course.service";
import { ToastrService } from "ngx-toastr";
import { FormControl, Validators } from "@angular/forms";
import { ReactiveFormsModule, FormsModule, NgForm } from "@angular/forms";

import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { Course } from "src/app/shared/course.model";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { of } from "rxjs";
import { IfStmt } from "@angular/compiler";

class MockCourseService {
  getCourses() {
    return of([
      {
        id: 1,
        description: "h",
        creator: "String",
        skill: "String",
        prerequisite: "String",
        lastupdated: "String",
      },
    ]);
  }
}

const CourseInfo = {
  id: 1,
  description: "h",
  creator: "String",
  skill: "String",
  prerequisite: "String",
  lastupdated: "String",
};

class MOckTrainerService {
  course: Course[] = [
    {
      id: 1,
      description: "String",
      creator: "String",
      skill: "String",
      prerequisite: "String",
      lastupdated: "String",
    },
  ];

  assignCourse() {
    return of(null);
  }
  unAssignCourse() {
    return of([]);
  }
}
class MockToastrService {
  info() {}
  success() {}
  warning() {}
  error() {}
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

class MockMatDialogRef {
  close() {}
}

fdescribe("ViewTrainerComponent", () => {
  let component: ViewTrainerComponent;
  let fixture: ComponentFixture<ViewTrainerComponent>;
  let trainerservice: TrainerService;
  let courseservice: CourseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTrainerComponent],
      imports: [MatDialogModule, MatAutocompleteModule],
      providers: [
        { provide: CourseService, useClass: MockCourseService },
        { provide: TrainerService, useClass: MOckTrainerService },
        { provide: ToastrService, useClass: MockToastrService },
        { provide: MatDialogRef, useClass: MockMatDialogRef },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    trainerservice = TestBed.inject(TrainerService);
    courseservice = TestBed.inject(CourseService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("check Display function", () => {
    expect(component.displayFn(CourseInfo));
  });

  it("check Display with null ", () => {
    expect(component.displayFn(null));
  });

  it("check Assign Course function", () => {
    expect(component.assignCourse(testForm));
  });

  it("check unAssign course function ", () => {
    expect(component.unAssignCourse(1));
  });

  it("check Assign Course function with non-null return", () => {
    spyOn(trainerservice, "assignCourse").and.callFake(() => {
      return of([{ someval: 1 }]);
    });
    component.assignCourse(1);
  });

  it("check closing of dialog box", () => {
    expect(component.close());
  });

  it("check getCourses not null return", () => {
    spyOn(courseservice, "getCourses").and.callFake(() => {
      return of([CourseInfo]);
    });
    component.ngOnInit();
  });
});
