import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TrainerListComponent } from "./trainer-list.component";
import { ToastrService } from "ngx-toastr";

import { TrainerService } from "../../shared/trainer.service";
import { Trainer } from "src/app/shared/trainer.model";
import { of } from "rxjs";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { resolve } from "dns";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Course } from "src/app/shared/course.model";
const Trainerobj = {
  id: 1,
  name: "string",
  type: "string",
  gender: "string",
  age: 1,
};

class MockTrainerService {
  list: number[];
  formData: Trainer;
  currentTrainer: number;
  course: Course[];
  deleteCourse(id: number) {
    return of([]);
  }

  refreshList() {
    return new Promise((resolve) => {
      resolve({});
    });
  }
  getTrainerCourse(id: number) {
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

class MockToastrService {
  warning() {}
  error() {}
}

fdescribe("TrainerListComponent", () => {
  let component: TrainerListComponent;
  let fixture: ComponentFixture<TrainerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerListComponent],
      providers: [
        { provide: TrainerService, useClass: MockTrainerService },
        { provide: ToastrService, useClass: MockToastrService },
      ],
      imports: [MatDialogModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("check Populate function", () => {
    expect(component.populateForm(Trainerobj));
  });

  it("check Delete Record ", () => {
    expect(component.deleteRecord(1));
  });

  it("check getCourses ", () => {
    expect(component.getCourses(1));
  });
});
